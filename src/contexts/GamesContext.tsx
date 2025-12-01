import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type AppliedFilter, type Filter, type Game } from "../types/types";
import { getAllGamesRequest } from "../requests";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    appliedFilters: AppliedFilter[];
    addFilter: (type: Filter, value: string) => void;
    removeFilter: (type: Filter, value: string) => void;
    matchesFilter: (type: Filter, value: string) => number;
    applyGameFilters: () => void;
    allFilterValues: (filter: Filter) => string[];
    loadGames: () => void;
}

export const GamesContext = createContext<GamesContextProvider>({} as GamesContextProvider);

/**
 * Applies chosen filters to the list of all playable games. The first selected filter type is marked because all other filter values should
 * be updated with how many games that matches the first selected filter type and the other filter 
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);         // All playable games available to the application
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve all playable games from the backend.
     */
    async function loadGames(): Promise<void> {
        const result = await getAllGamesRequest();
        setGames(result);
        setFilteredGames(result);
    }

    /**
     * Enables appyling selected filters whenever desired in the application.
     */
    function applyGameFilters(): void {
        if (appliedFilters.length) {
            applyFilters(appliedFilters);
        }
    }

    /**
     * Apply selected filters on games. If no filters are chosen, return all games.
     * Filters within the same type are mutually inclusive. Filters are mutually exclusive between types.
     */
    function applyFilters(filters: AppliedFilter[]): void {
        if (filters.length === 0) {
            setFilteredGames([...games]);
            return;
        }

        let result = [] as Game[];
        for (let i = 0; i < filters.length; i++) {          // Add all games that match any filter
            if (filters[i].type === "players") {
                result = result.concat(games.filter(game => game[filters[i].type] === parseInt(filters[i].value)));
                continue;
            }
            result = result.concat(games.filter(game => game[filters[i].type] === filters[i].value));
        }

        result = Array.from(new Set(result));       // Remove duplicate games
        const filteredGames = [] as Game[];

        for (let i = 0; i < result.length; i++) {
            if (included(result[i], filters, "category") && included(result[i], filters, "players")
                    && included(result[i], filters, "publisher") && included(result[i], filters, "developer")) {
                filteredGames.push(result[i]);      // Add game that matches all applied filter types (mutually exclusive between filter types)
            }
        }

        setFilteredGames([...filteredGames]);
    }

    /**
     * Return true if filter is applied to supplied game. Also return true if length of filters is 0 because all games should be shown in GamesPage
     * then (due to no filter being applied).
     */
    function included(game: Game, filters: AppliedFilter[], type: Filter): boolean {
        const values = filters.filter(filter => filter.type === type).map(filter => filter.value);
        if (values.length === 0) {      // No filter of this type is applied
            return true;
        }
        return values.includes(game[type].toString());
    }

    /**
     * Remove specific filter when a user deactivates corresponding filter option. 
     */
    function removeFilter(type: Filter, value: string): void {
        const updatedFilters = appliedFilters.filter(filter => filter.type !== type || (filter.type === type && filter.value !== value));
        applyFilters(updatedFilters);
        setAppliedFilters((_oldValues) => [...updatedFilters]);
    }

    /**
     * Add specific filter when a user clicks on corresponding filter option. 
     */
    function addFilter(type: Filter, value: string): void {        
        applyFilters([...appliedFilters, {type, value}]);
        setAppliedFilters((_oldValues) => [..._oldValues, {type, value}]);
    }

    /**
     * Returns a sorted list containing all unique filter values.
     */
    function allFilterValues(filter: Filter): string[] {
        switch(filter) {
            case "players":
                return Array.from(new Set(games.filter(game => included(game, appliedFilters, filter)).map(game => game.players))).sort((a, b) => a - b).map(player => player.toString());
            default:
                return Array.from(new Set(games.filter(game => included(game, appliedFilters, filter)).map(game => game[filter]))).sort((a, b) => a.localeCompare(b));
        }
    }

    /**
     * Returns number of games matching supplied filter among the filtered games.
     */
    function matchesFilter(type: Filter, value: string): number {
        if (type === "players") {
            return filteredGames.filter(game => game[type] === parseInt(value)).length;
        }

        return filteredGames.filter(game => game[type] === value).length;
    }
    
    return (
        <GamesContext.Provider value={{ games, filteredGames, appliedFilters, allFilterValues, addFilter, removeFilter, matchesFilter, loadGames, applyGameFilters }}>
            { children }
        </GamesContext.Provider>
    );
}