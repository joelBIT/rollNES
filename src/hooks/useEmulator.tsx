import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useControllers } from "./useControllers";

const ROM_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/roms`;

/**
 * Runs the RollNES emulator for the supplied game. Creates the canvas, worker, audio and key listeners, and tears everything
 * down again when the game changes, the hook is disabled or the component unmounts.
 *
 * @param gameId    The game to load.
 * @param enabled   Set to false to skip everything (for example on mobile devices). Hooks can't be called conditionally.
 * @returns         screenRef: attach to the element that should contain the canvas. reload: fetch the ROM again.
 *                  error: a message if the emulator or the ROM could not be loaded.
 */
export function useEmulator(gameId: number, enabled: boolean = true): {
    screenRef: RefObject<HTMLDivElement | null>,
    reload: () => void,
    error: string | null
} {
    const { getControllersConfiguration } = useControllers();
    const screenRef = useRef<HTMLDivElement>(null);
    const workerRef = useRef<Worker | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const configurationRef = useRef(getControllersConfiguration);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {       // Always use the latest controller configuration without restarting the emulator when its identity changes
        configurationRef.current = getControllersConfiguration;
    });

    /**
     * Downloads the whole ROM and sends it to the worker. Used on start and by reload.
     */
    const loadRom = useCallback(async (signal?: AbortSignal): Promise<void> => {
        setError(null);

        try {
            const response = await fetch(`${ROM_BASE_URL}/${gameId}.nes?download`, { signal });
            if (!response.ok) {
                throw new Error(`Could not load ROM (HTTP ${response.status})`);
            }

            const rom = new Uint8Array(await response.arrayBuffer());       // The whole body, however large the ROM is
            workerRef.current?.postMessage({ event: 'readFile', data: rom }, [rom.buffer]);
        } catch (loadError) {
            if ((loadError as Error).name === "AbortError") {
                return;
            }

            console.log(loadError);
            setError("Could not load the game. Press reload to try again.");
        }
    }, [gameId]);

    useEffect(() => {
        const screen = screenRef.current;
        if (!enabled || !screen) {
            return;
        }

        let cancelled = false;
        let audioNode: AudioWorkletNode | null = null;
        let worker: Worker | null = null;
        const abortController = new AbortController();

        // The canvas is created here because transferControlToOffscreen() works only once per canvas element
        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 256;
        canvas.height = 240;
        screen.appendChild(canvas);

        try {
            worker = new Worker('/emulator.js', { type: "module" });
            const offscreen = canvas.transferControlToOffscreen();
            worker.postMessage({ canvas: offscreen }, [offscreen]);
        } catch (setupError) {
            console.log(setupError);
            worker?.terminate();
            canvas.remove();
            setError("Your browser cannot run the emulator.");
            return;
        }

        workerRef.current = worker;
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        async function initSound(): Promise<void> {
            try {
                await audioContext.audioWorklet.addModule('/apu-worklet.js', { credentials: "omit" });
                if (cancelled) {
                    return;
                }

                audioNode = new AudioWorkletNode(audioContext, "apu-worklet");
                audioNode.connect(audioContext.destination);
                worker!.onmessage = (message) => audioNode?.port.postMessage(message.data);     // Send address and data to the APU
            } catch (audioError) {
                console.log(audioError);
            }
        }

        function onKeyUp(event: KeyboardEvent): void {
            worker!.postMessage({ event: 'keyup', value: event.code });
        }

        function onKeyDown(event: KeyboardEvent): void {
            if (audioContext.state === "suspended") {
                audioContext.resume();      // Browsers may start audio suspended until the user interacts with the page
            }

            worker!.postMessage({ event: 'keydown', value: event.code });

            if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
                event.preventDefault();
            }
        }

        initSound();
        document.addEventListener("keyup", onKeyUp, true);
        document.addEventListener("keydown", onKeyDown, true);

        worker.postMessage({ event: 'configuration', data: configurationRef.current() });
        loadRom(abortController.signal);

        return () => {
            cancelled = true;
            abortController.abort();
            document.removeEventListener("keyup", onKeyUp, true);       // Same capture flag as when added
            document.removeEventListener("keydown", onKeyDown, true);

            worker!.onmessage = null;
            worker!.terminate();
            workerRef.current = null;

            audioNode?.disconnect();
            audioContext.close().catch(() => {});
            audioContextRef.current = null;

            canvas.remove();
        };
    }, [gameId, enabled, loadRom]);

    return { screenRef, reload: () => { loadRom(); }, error };
}