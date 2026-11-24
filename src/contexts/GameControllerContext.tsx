import { createContext, type ReactElement, type ReactNode, useState } from "react";
import { CONTROLLERS_KEY, isLocalStorageAvailable } from "../utils";
import type { BindingOwner, Button, ButtonId, Controllers, GameController, PlayerNumber } from "../types/types";
import { BUTTON_IDS, EMULATOR_BUTTON_NAMES, EMULATOR_BUTTON_ORDER, gamepad1, gamepad2, loadControllers, PLAYERS } from "../config/gamepads";

export interface GameControllerContextProvider {
    player1: GameController;
    player2: GameController;
    updateBinding: (player: PlayerNumber, button: ButtonId, code: string) => void;
    findBindingConflict: (player: PlayerNumber, button: ButtonId, code: string) => BindingOwner | null;
    getControllersConfiguration: () => Button[];
    resetConfiguration: () => void;
}

export const GameControllerContext = createContext<GameControllerContextProvider | undefined>(undefined);

/**
 * Builds a controller from stored data, falling back to the defaults for anything missing or invalid.
 * Also reads the old storage format, where each button was stored as { name, value }.
 */
export function GameControllerProvider({ children }: { children: ReactNode }): ReactElement {
      const [controllers, setControllers] = useState<Controllers>(loadControllers);

    /**
     * Returns the button (of either player) that already uses the supplied key code, or null if the key is free.
     * The button being edited is ignored.
     */
    function findBindingConflict(player: PlayerNumber, button: ButtonId, code: string): BindingOwner | null {
        for (const owner of PLAYERS) {
            for (const id of BUTTON_IDS) {
                if (controllers[owner][id] === code && !(owner === player && id === button)) {
                    return { player: owner, button: id };
                }
            }
        }

        return null;
    }

    /**
     * Change the key bound to one button of one player. State is replaced, never mutated, so the defaults stay untouched.
     */
    function updateBinding(player: PlayerNumber, button: ButtonId, code: string): void {
        if (findBindingConflict(player, button, code)) {
            return;
        }

        const next: Controllers = { ...controllers, [player]: { ...controllers[player], [button]: code } };
        setControllers(next);

        if (isLocalStorageAvailable()) {
            localStorage.setItem(CONTROLLERS_KEY, JSON.stringify({ player1: next[1], player2: next[2] }));
        }
    }

    function resetConfiguration(): void {
        setControllers({ 1: gamepad1, 2: gamepad2 });

        if (isLocalStorageAvailable()) {
            localStorage.removeItem(CONTROLLERS_KEY);
        }
    }

    /**
     * The configuration in the format the emulator expects: one { name, value } entry per button, with player 2's names suffixed by "2".
     */
    function getControllersConfiguration(): Button[] {
        return PLAYERS.flatMap((player: PlayerNumber) =>
            EMULATOR_BUTTON_ORDER.map((id: ButtonId) => ({
                name: EMULATOR_BUTTON_NAMES[id] + (player === 2 ? "2" : ""),
                value: controllers[player][id]
            }))
        );
    }

    return (
        <GameControllerContext.Provider value={{ 
            player1: controllers[1], player2: controllers[2], updateBinding, findBindingConflict, getControllersConfiguration, resetConfiguration 
        }}>
            { children }
        </GameControllerContext.Provider>
    );
}