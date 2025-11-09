import type { Button } from "../types/types";

/**
 *          |**************************|
 *          | Controller Configuration |
 *          |**************************|
 */

const gamepad: Button[] = [
    {button: 'Start', value: 'KeyS'},
    {button: 'Select', value: 'KeyA'},
    {button: 'A', value: 'KeyZ'},
    {button: 'B', value: 'KeyX'},
    {button: 'ArrowDown', value: 'ArrowDown'},
    {button: 'ArrowLeft', value: 'ArrowLeft'},
    {button: 'ArrowRight', value: 'ArrowRight'},
    {button: 'ArrowUp', value: 'ArrowUp'}
]

/**
 * Creates an array containing the controller configuration for player 1 and player 2. The default configuration is used if
 * no configuration is found in local storage.
 */
export function getControllerConfiguration(): Button[] {
    const controllerConfiguration = [] as Button[];

    for (const key of gamepad) {
        if (localStorage.getItem(key.button)) {
            controllerConfiguration.push( { button: key.button, value: localStorage.getItem(key.button) ?? key.value } );
        } else {
            controllerConfiguration.push( { button: key.button, value: key.value } );
        }
    }

    return controllerConfiguration;
}