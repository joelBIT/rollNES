import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type Game } from "../types/types";
import { getAllGamesRequest } from "../requests";

export interface GamesContextProvider {
    games: Game[];
}

export const GamesContext = createContext<GamesContextProvider>({} as GamesContextProvider);

export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        loadGames();     
    }, []);

    /**
     * Retrieve games from backend.
     */
    async function loadGames(): Promise<void> {
        const result = await getAllGamesRequest();
        setGames(result);
    }

    function sortGames(games: Game[]): Game[] {
        return games.sort((a, b) => a.title.localeCompare(b.title));
    }

    return (
        <GamesContext.Provider value={{ games }}>
            { children }
        </GamesContext.Provider>
    );
}