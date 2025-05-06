'use client';

import { useEffect, type ChangeEvent, type ReactElement } from 'react';

import './App.css';

const worker = new Worker('../emulator/emulator.js',{ type: "module" });

export default function App(): ReactElement {

    let nesWorkletNode: Promise<void> | AudioWorkletNode;
    let audioContext: BaseAudioContext;
    let userInteraction = false;

    /**
     * The control of the canvas is transferred to the NES worker thread when the page has been loaded. As a result, the
     * worker thread takes care of the graphical processing and the player can interact with the interface without noticing
     * too much lag. The Audio Context and Audio Source are also initialized when the page has loaded.
     */
    useEffect(() => {
      try {
        const canvas = (document.getElementById("canvas") as HTMLCanvasElement)?.transferControlToOffscreen();
        worker.postMessage({ canvas: canvas }, [canvas]);
      } catch (error) {
        console.log(error);
      }
      
    
      audioContext = new AudioContext();
      nesWorkletNode = audioContext.audioWorklet.addModule('../emulator/apu-worklet.js', { credentials: "omit" }).then(() => {
        nesWorkletNode = new AudioWorkletNode(audioContext, "apu-worklet");
        nesWorkletNode.connect(audioContext.destination);
        const source = audioContext.createBufferSource();
        source.buffer = audioContext.createBuffer(2, audioContext.sampleRate, audioContext.sampleRate);
        worker.onmessage = function(message) {
          //nesWorkletNode.port.postMessage(message.data);   // Send address and data to APU
        };
      }).catch(error => console.log(error));
    }, []);

    return (
        <main id="app">
            <h2 className='app-title'> RollNES </h2>
            <canvas id="canvas" width="256" height="240"></canvas>
            <input id="nesfile" type="file" accept=".nes" onChange={loadFile}/>
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
 * |**************|
 * | Read NES ROM |
 * |**************|
 */
// function readFile(event) {
//   try {
//     worker.postMessage({event: 'readFile', data: event.target.result});
//     audioContext.resume();
//   } catch (e) {
//     console.log(e);
//   }
// }

function loadFile(event: ChangeEvent<HTMLInputElement>) {
    console.log(event);
}

/**
 * Performs check if file is NES ROM. If controller configuration is stored in local storage it is sent to the emulator.
 * Otherwise a default configuration is used. Then the input file is read.
 */
// document.getElementById("nesfile").addEventListener('change', input => {
//   if (!input.target.files.length) {
//     alert('No file');
//     return;
//   }

//   if (input.target.files[0].type !== 'application/x-nes-rom') {
//     document.getElementById("nesfile").value = '';
//     alert('File is not a NES ROM');
//     return;
//   }

//   const controllerConfiguration = setControllerConfiguration();
//   worker.postMessage({ event: 'configuration', data: controllerConfiguration });


// });

/**
 * |**************************|
 * | Controller Configuration |
 * |**************************|
 */


/**
 * Creates an array containing the controller configuration for player 1 and player 2.
 */
function setControllerConfiguration(): string[] {
    const controllerConfiguration = [] as string[];

  // for (const key of keys) {
  //   if (localStorage.getItem(key.id)) {
  //     controllerConfiguration.push( { button: key.id, value: localStorage.getItem(key.id) } );
  //   } else {
  //     controllerConfiguration.push( { button: key.id, value: key.value } );
  //   }
  // }

    return controllerConfiguration;
}
