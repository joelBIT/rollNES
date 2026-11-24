import type { ButtonId, Controllers, GameController, PlayerNumber } from "../types/types";
import { CONTROLLERS_KEY, isLocalStorageAvailable } from "../utils";

export const PLAYERS: PlayerNumber[] = [1, 2];
export const BUTTON_IDS: ButtonId[] = ["a", "b", "select", "start", "up", "down", "left", "right"];

export const BUTTON_LABELS: Record<ButtonId, string> = {
    a: "A", b: "B", select: "Select", start: "Start", up: "Up", down: "Down", left: "Left", right: "Right"
};

export const gamepad1: GameController = {      // Default controller 1 settings
    a: "KeyZ", b: "KeyX", start: "KeyS", select: "KeyA",
    up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight"
};

export const gamepad2: GameController = {      // Default controller 2 settings
    a: "KeyG", b: "KeyF", start: "KeyT", select: "KeyR",
    up: "KeyU", down: "KeyJ", left: "KeyH", right: "KeyK"
};

/** The emulator's own names for the buttons. Player 2's buttons get a "2" suffix. This is the only place that suffix exists. */
export const EMULATOR_BUTTON_NAMES: Record<ButtonId, string> = {
    a: "A", b: "B", select: "Select", start: "Start",
    up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight"
};
export const EMULATOR_BUTTON_ORDER: ButtonId[] = ["a", "b", "down", "left", "right", "select", "start", "up"];




export function loadControllers(): Controllers {
    let stored: { player1?: unknown, player2?: unknown } | null = null;

    if (isLocalStorageAvailable()) {
        try {
            stored = JSON.parse(localStorage.getItem(CONTROLLERS_KEY) ?? "null");
        } catch {
            stored = null;      // Corrupted data: use the defaults
        }
    }

    return { 1: normalize(stored?.player1, gamepad1), 2: normalize(stored?.player2, gamepad2) };
}

/**
 * Builds a controller from stored data, falling back to the defaults for anything missing or invalid.
 * Also reads the old storage format, where each button was stored as { name, value }.
 */
function normalize(stored: unknown, defaults: GameController): GameController {
    const controller: GameController = { ...defaults };

    if (typeof stored !== "object" || stored === null) {
        return controller;
    }

    for (const id of BUTTON_IDS) {
        const entry: unknown = (stored as Record<string, unknown>)[id];
        const code: unknown = typeof entry === "string" ? entry : (entry as { value?: unknown } | null)?.value;

        if (typeof code === "string" && code.length > 0) {
            controller[id] = code;
        }
    }

    return controller;
}