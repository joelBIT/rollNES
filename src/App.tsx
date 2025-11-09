import { useEffect, type ReactElement } from 'react';
import type { Button } from './types/types';
import { keys } from './config/config';

import './App.css';

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const worker = new Worker('./src/emulator.js',{ type: "module" });

export default function App(): ReactElement {
    let nesWorkletNode: Promise<void> | AudioWorkletNode;
    let audioContext: AudioContext;
    //let userInteraction = false;

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

      loadGame();
    }, []);

    /**
     * Loads a game from query parameter 'id' if available.
     */
    async function loadGame() {
        if (gameId) {
            const controllerConfiguration = setControllerConfiguration();
            worker.postMessage({ event: 'configuration', data: controllerConfiguration });
            await getRom();
        }
    };

    /**
     * Retrieves and loads a ROM based on the 'id' query parameter, if such exists.
     */
    async function getRom() {
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

    return (
        <main id="app">
            <h2 className='app-title'> RollNES </h2>
            <canvas id="canvas" width="256" height="240"></canvas>
        </main>
    )
}

/**
 * |*************************|
 * | Handle controller input |
 * |*************************|
 */
// const keyUpEventLogger = function(event) {
//   worker.postMessage({event: 'keyup', value: event.code});

//   if (navigator.userActivation.isActive && !userInteraction) {    // A user needs to interact with the page before the audio context can be resumed
//     userInteraction = true;
//     audioContext.resume();
//   }
// };

// const keyDownEventLogger = function(event) {
//   worker.postMessage({event: 'keydown', value: event.code});

//   if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
//     event.preventDefault();
//   }
// };

// window.addEventListener("keyup", keyUpEventLogger);
// window.addEventListener("keydown", keyDownEventLogger);


/**
 * |**************************|
 * | Controller Configuration |
 * |**************************|
 */

/**
 * const keys = document.getElementsByClassName('key');
for (const key of keys) {
  key.addEventListener('focus', removeInputCharacter);
  key.addEventListener('focusout', addDefaultValueIfEmpty);
  key.addEventListener('keydown', setKeyCode);
  key.addEventListener('keyup', setDefaultValueIfKeyCodeMissing);
}
 */


/**
 * Creates an array containing the controller configuration for player 1 and player 2.
 */
function setControllerConfiguration(): Button[] {
    const controllerConfiguration = [] as Button[];

    for (const key of keys) {
      if (localStorage.getItem(key.button)) {
        controllerConfiguration.push( { button: key.button, value: localStorage.getItem(key.button) ?? key.value } );
      } else {
        controllerConfiguration.push( { button: key.button, value: key.value } );
      }
    }

    return controllerConfiguration;
}
