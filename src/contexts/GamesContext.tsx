import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type AppliedFilter, type Filter, type Game } from "../types/types";
import { getAllGamesRequest } from "../requests";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    filters: AppliedFilter[];
    addFilter: (type: Filter, value: string) => void;
    removeFilter: (type: Filter, value: string) => void;
    matchesFilter: (type: Filter, value: string) => number;
    allCategories: () => string[];
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
     * Apply selected filters on games.
     */
    function applyFilters(): void {
        let result = [...games];
        for (let i = 0; i > filters.length; i++) {
            result = result.filter(game => game[filters[i].type] === filters[i].value);
        }

        setFilteredGames(result);
    }

    /**
     * Remove specific filter when a user deactivates corresponding filter option. 
     */
    function removeFilter(type: Filter, value: string): void {
        setFilters((_oldValues) => filters.filter(filter => filter.type !== type && filter.value !== value));
        applyFilters();
    }

    /**
     * Add specific filter when a user clicks on corresponding filter option. 
     */
    function addFilter(type: Filter, value: string): void {
        setFilters([...filters, {type, value}]);
        applyFilters();
    }

    /**
     * Returns a sorted list containing all unique game categories.
     */
    function allCategories(): string[] {
        return Array.from(new Set(games.map(game => game.category))).sort((a, b) => a.localeCompare(b));
    }

    /**
     * Returns number of games matching supplied filter.
     */
    function matchesFilter(type: Filter, value: string): number {
        return games.filter(game => game[type] === value).length;
    }

    return (
        <GamesContext.Provider value={{ games, filteredGames, filters, addFilter, removeFilter, matchesFilter, allCategories }}>
            { children }
        </GamesContext.Provider>
    );
}