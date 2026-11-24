import { createContext, type ReactElement, type ReactNode, useEffect, useMemo, useState } from "react";
import { type AppliedFilter, type Filter, type FacetFilter, type Game, type LoadStatus } from "../types/types";
import { getAllGamesRequest } from "../requests";
import { reportError } from "../errors";
import { FACET_FILTERS, filterGames } from "../utils";

export interface GamesContextProvider {
    games: Game[];
    filteredGames: Game[];
    loadStatus: LoadStatus;
    appliedFilters: AppliedFilter[];
    addFilter: (type: Filter, value: string) => void;
    removeFilter: (type: Filter, value: string) => void;
    matchesFilter: (type: FacetFilter, value: string) => number;
    allFilterValues: (filter: FacetFilter) => string[];
    loadGames: () => void;
}

export const GamesContext = createContext<GamesContextProvider | undefined>(undefined);

/**
 * Applies chosen filters to the list of all playable games. For each filter type, the values to offer (and how many games each
 * would give) are counted among the games matching the filters of the OTHER types. A type's own selections are ignored, so ticking
 * one value never hides the other values of that type, and a second value can be added.
 */
export function GamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [games, setGames] = useState<Game[]>([]);         // All playable games available to the application
    const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([]);
    const filteredGames: Game[] = useMemo(() => filterGames(games, appliedFilters), [games, appliedFilters]);

    const facets = useMemo(() => {
        const result = {} as Record<FacetFilter, Map<string, number>>;

        for (const type of FACET_FILTERS) {
            const counts = new Map<string, number>();

            for (const game of filterGames(games, appliedFilters, type)) {
                const value = String(game[type]);
                counts.set(value, (counts.get(value) ?? 0) + 1);
            }

            result[type] = counts;
        }

        return result;
    }, [games, appliedFilters]);

    useEffect(() => {
        loadGames();
    }, []);

    /**
     * Retrieve all playable games from the backend. Status is "loading" only until the first success (or after a retry
     * from the error state). Later refreshes keep showing the current games, and a failed refresh keeps them too.
     */
    async function loadGames(): Promise<void> {
        setLoadStatus(current => current === "error" ? "loading" : current);

        try {
            setGames(await getAllGamesRequest());
            setLoadStatus("ready");
        } catch (error) {
            reportError(error);
            setLoadStatus(current => current === "ready" ? "ready" : "error");
        }
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
     * Returns a sorted list of the values to offer for the filter type. A value that is ticked stays in the list even when the
     * filters of the other types leave it no games, so it can always be unticked.
     */
    function allFilterValues(filter: FacetFilter): string[] {
        const values = new Set<string>(facets[filter].keys());

        for (const applied of appliedFilters) {
            if (applied.type === filter) {
                values.add(applied.value);
            }
        }

        return Array.from(values).sort(filter === "players" ? (a: string, b: string) => Number(a) - Number(b) : (a: string, b: string) => a.localeCompare(b));
    }

    /**
     * Returns how many games the value would give, given the filters of the other types (and the title search).
     */
    function matchesFilter(type: FacetFilter, value: string): number {
        return facets[type].get(value) ?? 0;
    }
    
    return (
        <GamesContext.Provider value={{ games, filteredGames, loadStatus, appliedFilters, allFilterValues, addFilter, removeFilter, matchesFilter, loadGames }}>
            { children }
        </GamesContext.Provider>
    );
}