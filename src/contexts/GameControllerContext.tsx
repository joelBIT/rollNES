import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { isLocalStorageAvailable } from "../utils";
import type { BindingOwner, Button, GameController } from "../types/types";
import { gamepad1, gamepad2 } from "../config/config";

export interface GameControllerContextProvider {
    player1: GameController;
    player2: GameController;
    updateBinding: (player: 1 | 2, key: keyof GameController, code: string) => void;
    findBindingConflict: (player: 1 | 2, key: keyof GameController, code: string) => BindingOwner | null;
    getControllersConfiguration: () => Button[];
    resetConfiguration: () => void;
}

export const GameControllerContext = createContext<GameControllerContextProvider>({} as GameControllerContextProvider);

export function GameControllerProvider({ children }: { children: ReactNode }): ReactElement {
    const [player1, setPlayer1] = useState<GameController>(gamepad1);
    const [player2, setPlayer2] = useState<GameController>(gamepad2);
    const STORAGE_KEY = 'gameController';

    useEffect(() => {
        loadSavedControllers();
    }, []);

    /**
     * Load stored controller settings from localstorage if localstorage is available.
     */
    function loadSavedControllers(): void {
        if (isLocalStorageAvailable() && localStorage.getItem(STORAGE_KEY)) {
            const controllers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            setPlayer1(controllers?.player1);
            setPlayer2(controllers?.player2);
        }
    }

    /**
     * Store controller configurations in localstorage, if available.
     * State is replaced, never mutated, and the result is stored in localstorage if available.
     */
    function updateBinding(player: 1 | 2, key: keyof GameController, code: string): void {
        if (findBindingConflict(player, key, code)) {
            return;
        }
        const current: GameController = player === 1 ? player1 : player2;
        const updated: GameController = { ...current, [key]: { ...current[key], value: code } };

        const newPlayer1 = player === 1 ? updated : player1;
        const newPlayer2 = player === 2 ? updated : player2;

        setPlayer1(newPlayer1);
        setPlayer2(newPlayer2);

        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ player1: newPlayer1, player2: newPlayer2 }));
        }
    }

    /**
     * Restore gamepad configuration to default.
     */
    function resetConfiguration(): void {
        setPlayer1(gamepad1);
        setPlayer2(gamepad2);

        if (isLocalStorageAvailable()) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    /**
     * Creates an array containing the controller configuration for player 1 and player 2. The default configuration is used if
     * no configuration is found in local storage.
     */
    function getControllersConfiguration(): Button[] {
        const controllerConfiguration: Button[] = [];
        
        controllerConfiguration.push(player1.a);
        controllerConfiguration.push(player1.b);
        controllerConfiguration.push(player1.down);
        controllerConfiguration.push(player1.left);
        controllerConfiguration.push(player1.right);
        controllerConfiguration.push(player1.select);
        controllerConfiguration.push(player1.start);
        controllerConfiguration.push(player1.up);
        controllerConfiguration.push(player2.a);
        controllerConfiguration.push(player2.b);
        controllerConfiguration.push(player2.down);
        controllerConfiguration.push(player2.left);
        controllerConfiguration.push(player2.right);
        controllerConfiguration.push(player2.select);
        controllerConfiguration.push(player2.start);
        controllerConfiguration.push(player2.up);
    
        return controllerConfiguration;
    }

    /**
     * Returns the button (of either player) that already uses the supplied key code, or null if the key is free.
     * The button being edited is ignored, so rebinding a button to the key it already has is not a conflict.
     */
    function findBindingConflict(player: 1 | 2, key: keyof GameController, code: string): BindingOwner | null {
        for (const owner of [1, 2] as const) {
            const controller: GameController = owner === 1 ? player1 : player2;

            for (const buttonKey of Object.keys(controller) as (keyof GameController)[]) {
                if (controller[buttonKey].value === code && !(owner === player && buttonKey === key)) {
                    return { player: owner, key: buttonKey };
                }
            }
        }

        return null;
    }

    return (
        <GameControllerContext.Provider value={{ player1, player2, updateBinding, findBindingConflict, getControllersConfiguration, resetConfiguration }}>
            { children }
        </GameControllerContext.Provider>
    );
}