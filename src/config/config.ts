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
    {button: 'ArrowUp', value: 'ArrowUp'},
    {button: 'Start2', value: 'KeyT'},
    {button: 'Select2', value: 'KeyR'},
    {button: 'A2', value: 'KeyG'},
    {button: 'B2', value: 'KeyF'},
    {button: 'ArrowDown2', value: 'KeyJ'},
    {button: 'ArrowLeft2', value: 'KeyH'},
    {button: 'ArrowRight2', value: 'KeyK'},
    {button: 'ArrowUp2', value: 'KeyU'}
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

/**
 * Creates a map containing the controller configuration for player 1 and player 2. The default configuration is used if
 * no configuration is found in local storage.
 */
export function getControllerConfigurationMap(): Map<string, string> {
    const controllerConfiguration = new Map();

    for (const key of gamepad) {
        if (localStorage.getItem(key.button)) {
            controllerConfiguration.set(key.button, localStorage.getItem(key.button) ?? key.value);
        } else {
            controllerConfiguration.set(key.button, key.value);
        }
    }

    return controllerConfiguration;
}