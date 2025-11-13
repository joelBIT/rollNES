import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type AppliedFilter, type Filter, type Game } from "../types/types";
import { getAllGamesRequest } from "../requests";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    filters: AppliedFilter[];
    addFilter: (type: Filter, value: string) => void;
    removeFilter: (type: Filter, value: string) => void;
}

export const GamesContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Applies chosen filters to the list of all playable games.
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [filters, setFilters] = useState<AppliedFilter[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve games from backend.
     */
    async function loadGames(): Promise<void> {
        const result = await getAllGamesRequest();
        setGames(result);
        setFilteredGames(result);
    }

    /**
     * Remove specific filter when a user deactivates corresponding filter option. 
     */
    function removeFilter(type: Filter, value: string): void {
        setFilters(filters.filter(filter => filter.type !== type && filter.value !== value));
    }

    /**
     * Add specific filter when a user clicks on corresponding filter option. 
     */
    function addFilter(type: Filter, value: string): void {
        setFilters([...filters, {type, value}]);
    }

    return (
        <GamesContext.Provider value={{ games, filteredGames, filters, addFilter, removeFilter }}>
            { children }
        </GamesContext.Provider>
    );
}