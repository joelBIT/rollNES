import { useCallback, useEffect, useRef, type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import { isMobileDevice } from "../../utils";

import "./Emulator.css";

/**
 * The Emulator should be run on the App if using a mobile device.
 */
export function Emulator({gameId}: {gameId: number}): ReactElement {
    const { getControllersConfiguration, player1 } = useControllers();
    const isMobile = isMobileDevice();
    const screenRef = useRef<HTMLDivElement>(null);
    const workerRef = useRef<Worker | null>(null);

    /**
     * Downloads the ROM and sends it to the worker. Used on load and by the "Reload" button.
     */
    const loadRom = useCallback(async (signal?: AbortSignal): Promise<void> => {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/roms/${gameId}.nes?download`;
        try {
            const response = await fetch(url, { signal });
            if (!response.ok) {
                throw new Error(`Could not load ROM (HTTP ${response.status})`);
            }

            const rom = new Uint8Array(await response.arrayBuffer());       // Reads the whole body, however large the ROM is
            workerRef.current?.postMessage({ event: 'readFile', data: rom }, [rom.buffer]);
        } catch (error) {
            if ((error as Error).name !== "AbortError") {
                console.log(error);
            }
        }
    }, [gameId]);

    /**
     * Sets up the worker, canvas, audio and key listeners, and tears everything down again on cleanup. The canvas is created here
     * (and not in JSX) because transferControlToOffscreen() can only be called once per canvas element. A fresh canvas is needed
     * every time the effect runs, for example with React StrictMode in development or when the game changes.
     */
    useEffect(() => {
        const screen = screenRef.current;
        if (isMobile || !screen) {
            return;
        }

        let cancelled = false;
        const abortController = new AbortController();
        let audioNode: AudioWorkletNode | null = null;

        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 256;
        canvas.height = 240;
        screen.appendChild(canvas);

        const audioContext = new AudioContext();
        let worker: Worker | null = null;

        try {
            worker = new Worker('/emulator.js', { type: "module" });
            workerRef.current = worker;

            const offscreen = canvas.transferControlToOffscreen();
            worker.postMessage({ canvas: offscreen }, [offscreen]);
        } catch (error) {
            console.log(error);
        }

        async function initSound(): Promise<void> {
            try {
                await audioContext.audioWorklet.addModule('/apu-worklet.js', { credentials: "omit" });
                if (cancelled || !worker) {
                    return;
                }

                audioNode = new AudioWorkletNode(audioContext, "apu-worklet");
                audioNode.connect(audioContext.destination);
                worker.onmessage = (message) => audioNode?.port.postMessage(message.data);   // Send address and data to APU
            } catch (error) {
                console.log(error);
            }
        }

        function onKeyUp(event: KeyboardEvent): void {
            worker?.postMessage({ event: 'keyup', value: event.code });
        }

        function onKeyDown(event: KeyboardEvent): void {
            worker?.postMessage({ event: 'keydown', value: event.code });

            if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
                event.preventDefault();
            }
        }

        initSound();
        document.addEventListener("keyup", onKeyUp, true);
        document.addEventListener("keydown", onKeyDown, true);

        worker?.postMessage({ event: 'configuration', data: getControllersConfiguration() });
        loadRom(abortController.signal);

        return () => {
            cancelled = true;
            abortController.abort();
            document.removeEventListener("keyup", onKeyUp, true);        // Same capture flag as in addEventListener, otherwise nothing is removed
            document.removeEventListener("keydown", onKeyDown, true);

            if (worker) {
                worker.onmessage = null;
                worker.terminate();
            }
            workerRef.current = null;

            audioNode?.disconnect();
            audioContext.close().catch(() => {});
            canvas.remove();
        };
        // getControllersConfiguration is deliberately left out: it changes identity on every render, and the configuration is only sent when a game starts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId, isMobile, loadRom]);

    if (isMobile) {         // Early return is safe here because all hooks have already been called
        return (
            <section id="emulator">
                <h2 className="mobile-app-text"> You should use RollNES on the App if you are using a mobile device. </h2> 
            </section>
        );
    }

    return (
        <section id="emulator">
            <section id="reload-emulator">
                <h3 className="reload-emulator__text"> Press reload if the game does not start </h3>
                <button className="retro-button" onClick={() => loadRom()}> Reload </button>

                <section id="player1-controller">
                    <h3 className="player1-controller__title"> Player 1 </h3>
                    <h3 className="player1-controller__text"> <b>Up:</b> {player1.up.value} </h3>
                    <h3 className="player1-controller__text"> <b>Down:</b> {player1.down.value} </h3>
                    <h3 className="player1-controller__text"> <b>Left:</b> {player1.left.value} </h3>
                    <h3 className="player1-controller__text"> <b>Right:</b> {player1.right.value} </h3>
                    <h3 className="player1-controller__text"> <b>Select:</b> {player1.select.value} </h3>
                    <h3 className="player1-controller__text"> <b>Start:</b> {player1.start.value} </h3>
                    <h3 className="player1-controller__text"> <b>A:</b> {player1.a.value} </h3>
                    <h3 className="player1-controller__text"> <b>B:</b> {player1.b.value} </h3>
                </section>
            </section>

            <div className="nes-screen-frame">
                <div className="screen" ref={screenRef}></div>
            </div>
        </section>
    )
}