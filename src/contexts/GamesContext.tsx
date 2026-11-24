import { createContext, type ReactElement, type ReactNode, useEffect, useMemo, useState } from "react";
import { type AppliedFilter, type Filter, type Game } from "../types/types";
import { getAllGamesRequest } from "../requests";
import { filterGames } from "../utils";
import { reportError } from "../errors";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    appliedFilters: AppliedFilter[];
    addFilter: (type: Filter, value: string) => void;
    removeFilter: (type: Filter, value: string) => void;
    matchesFilter: (type: Filter, value: string) => number;
    allFilterValues: (filter: Filter) => string[];
    loadGames: () => void;
}

export const GamesContext = createContext<GamesContextProvider | undefined>(undefined);

/**
 * Applies chosen filters to the list of all playable games. The first selected filter type is marked because all other filter values should
 * be updated with how many games that matches the first selected filter type and the other filter 
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);         // All playable games available to the application
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
    const filteredGames: Game[] = useMemo(() => filterGames(games, appliedFilters), [games, appliedFilters]);

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve all playable games from the backend.
     */
    async function loadGames(): Promise<void> {
        try {
            setGames(await getAllGamesRequest());
        } catch (error) {
            reportError(error);         // Keep whatever games are already loaded
        }
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
     * Remove specific filter when a user deactivates corresponding filter option. 
     */
    function removeFilter(type: Filter, value: string): void {
        setAppliedFilters((current: AppliedFilter[]) => current.filter((filter: AppliedFilter) => !(filter.type === type && filter.value === value)));
    }

    /**
     * Add specific filter when a user clicks on corresponding filter option. 
     * Only one 'title' filter is allowed. If one such filter is already applied, replace it with the new title.
     */
    function addFilter(type: Filter, value: string): void {
        setAppliedFilters((current: AppliedFilter[]) => {
            const others: AppliedFilter[] = type === "title" ? current.filter((filter: AppliedFilter) => filter.type !== "title") : current;
            const alreadyApplied: boolean = others.some((filter: AppliedFilter) => filter.type === type && filter.value === value);

            return alreadyApplied ? others : [...others, { type, value }];
        });
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
        <GamesContext.Provider value={{ games, filteredGames, appliedFilters, allFilterValues, addFilter, removeFilter, matchesFilter, loadGames }}>
            { children }
        </GamesContext.Provider>
    );
}