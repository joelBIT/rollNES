import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { isLocalStorageAvailable } from "../utils";
import type { Button, GameController } from "../types/types";
import { gamepad1, gamepad2 } from "../config/config";

export interface GameControllerContextProvider {
    player1: GameController;
    player2: GameController;
    updateBinding: (button: Button) => void;
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
     */
    function updateBinding(button: Button): void {
        let player = {} as GameController;
        if (button.name.endsWith("2")) {    // player 2
            for (const [key, value] of Object.entries(player2)) {
                if (button.name === value.name) {
                    value.value = button.value;
                }
                player = Object.assign(player, { [key]: value });
            }
            setPlayer2(player);
        } else {
            for (const [key, value] of Object.entries(player1)) {
                if (button.name === value.name && button.value !== value.value) {
                    value.value = button.value;
                }
                player = Object.assign(player, { [key]: value });
            }
            setPlayer1(player);
        }

        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({player1, player2}));
        }
    }

    /**
     * Restore gamepad configuration to default.
     */
    function resetConfiguration(): void {
        if (isLocalStorageAvailable() && localStorage.getItem(STORAGE_KEY)) {
            localStorage.removeItem(STORAGE_KEY);
            setPlayer1(gamepad1);
            setPlayer2(gamepad2);
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

    return (
        <GameControllerContext.Provider value={{ player1, player2, updateBinding, getControllersConfiguration, resetConfiguration }}>
            { children }
        </GameControllerContext.Provider>
    );
}