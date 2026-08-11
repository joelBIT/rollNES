import type { GameController } from "../types/types";

/**
 *          |**********************************|
 *          | Default Controller Configuration |
 *          |**********************************|
 */

export const gamepad1: GameController = {       // Default controller 1 settings
    a: { name: 'A', value: 'KeyZ' },
    b: { name: 'B', value: 'KeyX' },
    start: { name: "Start", value: "KeyS" },
    select: { name: 'Select', value: 'KeyA' },
    up: { name: 'ArrowUp', value: 'ArrowUp' },
    down: { name: 'ArrowDown', value: 'ArrowDown' },
    left: { name: 'ArrowLeft', value: 'ArrowLeft' },
    right: { name: 'ArrowRight', value: 'ArrowRight' }
}

/**
 * Each button has a name and a value.
 */
export const gamepad2: GameController = {       // Default controller 2 settings
    a: { name: 'A2', value: 'KeyG' },
    b: { name: 'B2', value: 'KeyF' },
    start: { name: 'Start2', value: 'KeyT' },
    select: { name: 'Select2', value: 'KeyR' },
    up: { name: 'ArrowUp2', value: 'KeyU' },
    down: { name: 'ArrowDown2', value: 'KeyJ' },
    left: { name: 'ArrowLeft2', value: 'KeyH' },
    right: { name: 'ArrowRight2', value: 'KeyK' }
}