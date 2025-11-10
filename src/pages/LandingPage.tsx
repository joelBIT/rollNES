import { useEffect, useState, type ReactElement } from "react";
import { getControllerConfiguration } from '../config/config';
import { ControllerModal } from "../components/ControllerModal";

import "./LandingPage.css";

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const worker = new Worker('./src/emulator.js',{ type: "module" });

export default function LandingPage(): ReactElement {
  const [ openModal, setOpenModal ] = useState<boolean>(false);
    let nesWorkletNode: Promise<void> | AudioWorkletNode;
    let audioContext: AudioContext;
    let userInteraction: boolean = false;

    /**
     * The control of the canvas is transferred to the NES worker thread when the page has been loaded. As a result, the
     * worker thread takes care of the graphical processing and the player can interact with the interface without noticing
     * too much lag. The Audio Context and Audio Source are also initialized when the page has loaded.
     */
    useEffect(() => {
        if (audioContext) {
            return;     // transferControlToOffscreen() has already executed (can only run once)
        }

        try {
            const canvas = (document.getElementById("canvas") as HTMLCanvasElement)?.transferControlToOffscreen();
            worker.postMessage({ canvas: canvas }, [canvas]);
        } catch (error) {
            console.log(error);
        }
      
        audioContext = new AudioContext();
        nesWorkletNode = audioContext.audioWorklet.addModule('./src/apu-worklet.js', { credentials: "omit" }).then(() => {
            nesWorkletNode = new AudioWorkletNode(audioContext, "apu-worklet");
            nesWorkletNode.connect(audioContext.destination);
            const source = audioContext.createBufferSource();
            source.buffer = audioContext.createBuffer(2, audioContext.sampleRate, audioContext.sampleRate);
            worker.onmessage = function(message) {
                if (nesWorkletNode instanceof AudioWorkletNode) {
                    nesWorkletNode.port.postMessage(message.data);   // Send address and data to APU
                } else {
                    console.log('Failed to post message on AudioWorkletNode');
                }
              
            };
        }).catch(error => console.log(error));

        document.addEventListener("keyup", keyUpEventLogger, true);
        document.addEventListener("keydown", keyDownEventLogger, true);
        loadGame();

        return () => {
            document.removeEventListener("keyup", keyUpEventLogger);
            document.removeEventListener("keydown", keyDownEventLogger);
        };
    }, []);

    /**
     * Loads a game from query parameter 'id' if available.
     */
    async function loadGame(): Promise<void> {
        if (gameId) {
            worker.postMessage({ event: 'configuration', data: getControllerConfiguration() });
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
     * Start game and enable sound when user clicks on the start button.
     */
    async function startGame(): Promise<void> {
        await getRom();
        if (navigator.userActivation.isActive && !userInteraction) {    // A user needs to interact with the page before the audio context can be resumed
            userInteraction = true;
            audioContext.resume();
        }
    }

    /**
     * |*************************|
     * | Handle controller input |
     * |*************************|
     */
    const keyUpEventLogger = function(event: any) {
        worker.postMessage({event: 'keyup', value: event.code});

        if (navigator.userActivation.isActive && !userInteraction) {    // A user needs to interact with the page before the audio context can be resumed
            userInteraction = true;
            audioContext.resume();
        }
    };

    const keyDownEventLogger = function(event: any) {
        worker.postMessage({event: 'keydown', value: event.code});

        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.preventDefault();
        }
    };

    return (
        <main id="landingPage">
            <button className='retro-button' onClick={startGame}> Start Game </button>
            <canvas id="canvas" width="256" height="240"></canvas>
            <button className='retro-button' onClick={() => setOpenModal(true)}> Controller Configuration </button>

            { 
                openModal ? <ControllerModal text="Customize controllers" close={() => setOpenModal(false)} /> : <></>
            }
        </main>
    )
}