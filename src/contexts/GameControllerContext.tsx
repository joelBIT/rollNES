import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { isLocalStorageAvailable } from "../utils";

export interface GameControllerContextProvider {
    player1: string[];
    player2: string[];
}

export const GameControllerContext = createContext<GameControllerContextProvider>({} as GameControllerContextProvider);

export function GameControllerProvider({ children }: { children: ReactNode }): ReactElement {
    const [player1, setPlayer1] = useState<string[]>([]);
    const [player2, setPlayer2] = useState<string[]>([]);
    const STORAGE_KEY = 'gameController';

    useEffect(() => {
        loadSavedControllers();     
    }, []);

    /**
     * Load stored controller settings from localstorage if localstorage is available.
     */
    async function loadSavedControllers(): Promise<void> {
        if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                const controllers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                setPlayer1(controllers.player1);
                setPlayer2(controllers.player2);
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }

    return (
        <GameControllerContext.Provider value={{ player1, player2 }}>
            { children }
        </GameControllerContext.Provider>
    );
}