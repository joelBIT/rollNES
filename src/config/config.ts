import type { GameController } from "../types/types";

/**
 *          |**********************************|
 *          | Default Controller Configuration |
 *          |**********************************|
 */

export const gamepad1: GameController = {       // Default controller 1 settings
    a: { button: 'A', value: 'KeyZ' },
    b: { button: 'B', value: 'KeyX' },
    start: { button: "Start", value: "KeyS" },
    select: { button: 'Select', value: 'KeyA' },
    up: { button: 'ArrowUp', value: 'ArrowUp' },
    down: { button: 'ArrowDown', value: 'ArrowDown' },
    left: { button: 'ArrowLeft', value: 'ArrowLeft' },
    right: { button: 'ArrowRight', value: 'ArrowRight' }
}

export const gamepad2: GameController = {       // Default controller 2 settings
    a: { button: 'A2', value: 'KeyG' },
    b: { button: 'B2', value: 'KeyF' },
    start: { button: 'Start2', value: 'KeyT' },
    select: { button: 'Select2', value: 'KeyR' },
    up: { button: 'ArrowUp2', value: 'KeyU' },
    down: { button: 'ArrowDown2', value: 'KeyJ' },
    left: { button: 'ArrowLeft2', value: 'KeyH' },
    right: { button: 'ArrowRight2', value: 'KeyK' }
}