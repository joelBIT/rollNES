import { useEffect, type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";

import "./Emulator.css";

export function Emulator({gameId}: {gameId: number}): ReactElement {
    const { getControllersConfiguration } = useControllers();
    let worker: Worker;
    let nesWorkletNode: Promise<void> | AudioWorkletNode;
    let audioContext: AudioContext;

    /**
     * The control of the canvas is transferred to the NES worker thread when the page has been loaded. As a result, the
     * worker thread takes care of the graphical processing and the player can interact with the interface without noticing
     * too much lag. The Audio Context and Audio Source are also initialized when the page has loaded.
     */
    useEffect(() => {
        try {
            if (!worker) {
                worker = new Worker('/emulator.js',{ type: "module" });
                const canvas = (document.getElementById("canvas") as HTMLCanvasElement)?.transferControlToOffscreen();
                worker.postMessage({ canvas: canvas }, [canvas]);
            }
        } catch (error) {
            console.log(error);
        }

        audioContext = new AudioContext();
        initSound();

        document.addEventListener("keyup", keyUpEventLogger, true);
        document.addEventListener("keydown", keyDownEventLogger, true);
        loadGame();

        return () => {
            document.removeEventListener("keyup", keyUpEventLogger);
            document.removeEventListener("keydown", keyDownEventLogger);
            audioContext.close();
        };
    }, []);

    async function initSound(): Promise<void> {
        await audioContext.audioWorklet.addModule('/apu-worklet.js', { credentials: "omit" });
        if (!(nesWorkletNode instanceof AudioWorkletNode)) {
            try {
                nesWorkletNode = new AudioWorkletNode(audioContext, "apu-worklet");
            } catch (error) {
                console.log(error);
            }
        }

        if (nesWorkletNode && nesWorkletNode instanceof AudioWorkletNode) {
            nesWorkletNode.connect(audioContext.destination);
        }
        
        const source = audioContext.createBufferSource();
        source.buffer = audioContext.createBuffer(2, audioContext.sampleRate, audioContext.sampleRate);
        worker.onmessage = function(message) {
            if (nesWorkletNode instanceof AudioWorkletNode) {
                nesWorkletNode.port.postMessage(message.data);   // Send address and data to APU
            } else {
                console.log('Failed to post message on AudioWorkletNode');
            }
        };
    }

    /**
     * Loads a game from query parameter 'id' if available.
     */
    async function loadGame(): Promise<void> {
        if (gameId) {
            worker.postMessage({ event: 'configuration', data: getControllersConfiguration() });
            await getRom();
        }
    };

    /**
     * Retrieves and loads a ROM based on the 'id' query parameter, if such exists.
     */
    async function getRom(): Promise<void> {
        const url = `https://tnkcekyijuynctkddkwy.supabase.co/storage/v1/object/public/roms//${gameId}.nes?download`;
        try {
            const response = await fetch(url);
            if (response.body) {
                const buffer = new Uint8Array(60000000);
                const reader = response.body.getReader({ mode: "byob" });
                const finished = await reader.read(buffer);
                worker.postMessage({event: 'readFile', data: finished.value});
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * |*************************|
     * | Handle controller input |
     * |*************************|
     */
    function keyUpEventLogger(event: any): void {
        worker.postMessage({event: 'keyup', value: event.code});
    };

    function keyDownEventLogger(event: any): void {
        worker.postMessage({event: 'keydown', value: event.code});

        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.preventDefault();
        }
    };

    return (
        <section id="emulator">
            <section id="reload-emulator">
                <h3 className="reload-emulator__text"> Press reload if the game does not start </h3>
                <button className="retro-button" onClick={() => getRom()}> Reload </button>
            </section>

            <canvas id="canvas" width="256" height="240"></canvas>
        </section>
    )
}