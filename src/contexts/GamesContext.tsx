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
        const result: Game[] = await getAllGamesRequest();
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

        let result: Game[] = [];
        for (let i = 0; i < filters.length; i++) {          // Add all games that match any filter
            if (filters[i].type === "players") {
                result = result.concat(games.filter((game: Game) => game[filters[i].type] === parseInt(filters[i].value)));
                continue;
            }

            if (filters[i].type === "title") {
                const titleWords: string[] = filters[i].value.split(" ");
                for (let i = 0; i < titleWords.length; i++) {       // If search string consists of several words, title must include all words
                    const word: string = titleWords[i].trim();
                    result = result.concat(games.filter((game: Game) => game.title.toLowerCase().includes(word.toLowerCase())));
                }
                continue;
            }

            result = result.concat(games.filter((game: Game) => game[filters[i].type] === filters[i].value));
        }

        result = Array.from(new Set(result));       // Remove duplicate games
        const filteredGames: Game[] = [];

        for (let i = 0; i < result.length; i++) {
            if (included(result[i], filters, "category") && included(result[i], filters, "players")
                    && included(result[i], filters, "publisher") && included(result[i], filters, "developer")
                        && includesSearchWord(result[i], filters)) {
                filteredGames.push(result[i]);      // Add game that matches all applied filter types (mutually exclusive between filter types)
            }
        }

        setFilteredGames([...filteredGames]);
    }

    /**
     * Returns true if filter is applied to supplied game. Also return true if length of filters is 0 because all games should be shown in GamesPage
     * then (due to no filter being applied).
     */
    function included(game: Game, filters: AppliedFilter[], type: Filter): boolean {
        const values: string[] = filters.filter((filter: AppliedFilter) => filter.type === type).map((filter: AppliedFilter) => filter.value);
        if (values.length === 0) {      // No filter of this type is applied
            return true;
        }
        return values.includes(game[type].toString());
    }

    /**
     * Returns true if filter is not applied or if the filter is applied and the game title contains
     * the filter value (which in this case is the search word).
     */
    function includesSearchWord(game: Game, filters: AppliedFilter[]): boolean {
        const filter: AppliedFilter | undefined = filters.find((filter: AppliedFilter) => filter.type === "title");
        if (!filter) {
            return true;        // Return true if no "title" filter is applied
        }

        const titleWords: string[] = filter.value.split(" ");
        for (let i = 0; i < titleWords.length; i++) {       // If search string consists of several words, title must include all words
            const word: string = titleWords[i].trim();
            const included: boolean = game.title.toLowerCase().includes(word.toLowerCase());
            if (!included) {
                return false;
            }
        }

        return true;
    }

    /**
     * Remove specific filter when a user deactivates corresponding filter option. 
     */
    function removeFilter(type: Filter, value: string): void {
        const updatedFilters: AppliedFilter[] = appliedFilters.filter((filter: AppliedFilter) => filter.type !== type || (filter.type === type && filter.value !== value));
        applyFilters(updatedFilters);
        setAppliedFilters((_oldValues: AppliedFilter[]) => [...updatedFilters]);
    }

    /**
     * Add specific filter when a user clicks on corresponding filter option. 
     * Only one 'title' filter is allowed. If one such filter is already applied, replace it with the new title.
     */
    function addFilter(type: Filter, value: string): void {
        let filters: AppliedFilter[] = appliedFilters;
        if (type === "title") {
            filters = filters.filter((filter: AppliedFilter) => filter.type !== "title");        // Remove any existing 'title' filter, should only be one allowed
        }

        applyFilters([...filters, {type, value}]);
        setAppliedFilters((_oldValues: AppliedFilter[]) => [...filters, {type, value}]);
    }

    /**
     * Returns a sorted list containing all unique filter values.
     */
    function allFilterValues(filter: Filter): string[] {
        switch(filter) {
            case "players":
                return Array.from(new Set(games
                    .filter((game: Game) => included(game, appliedFilters, filter))
                    .map((game: Game) => game.players)))
                    .sort((a: number, b: number) => a - b)
                    .map((player: number) => player.toString());
            default:
                return Array.from(new Set(games
                    .filter((game: Game) => included(game, appliedFilters, filter))
                    .map((game: Game) => game[filter])))
                    .sort((a: string, b: string) => a.localeCompare(b));
        }
    }

    /**
     * Returns number of games matching supplied filter among the filtered games.
     */
    function matchesFilter(type: Filter, value: string): number {
        if (type === "players") {
            return filteredGames.filter((game: Game) => game[type] === parseInt(value)).length;
        }

        return filteredGames.filter((game: Game) => game[type] === value).length;
    }
    
    return (
        <GamesContext.Provider value={{ games, filteredGames, appliedFilters, allFilterValues, addFilter, removeFilter, matchesFilter, loadGames, applyGameFilters }}>
            { children }
        </GamesContext.Provider>
    );
}