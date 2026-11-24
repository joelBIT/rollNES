import { createContext, type ReactElement, type ReactNode, useEffect, useMemo, useState } from "react";
import { type Game } from "../types/types";
import { isLocalStorageAvailable, readStoredIds, STORAGE_KEY } from "../utils";
import { getGamesByIdsRequest } from "../requests";
import { reportError } from "../errors";

export interface FavouriteGamesContextProvider {
    favourites: Game[];
    isFavourite: (game_id: number) => boolean;
    addFavourite: (game: Game) => void;
    removeFavouriteById: (id: number) => void;
}

export const FavouriteGamesContext = createContext<FavouriteGamesContextProvider | undefined>(undefined);

export function FavouriteGamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [initialIds] = useState<number[]>(readStoredIds);
    const [ids, setIds] = useState<number[]>(initialIds);                           // Source of truth, persisted
    const [loadedGames, setLoadedGames] = useState<Record<number, Game>>({});       // Games fetched from the backend or added by the user

    useEffect(() => {       // Fetch the stored favourites once
        if (initialIds.length === 0) {
            return;
        }

        let cancelled = false;

        getGamesByIdsRequest(initialIds).then(games => {
            if (cancelled || games.length === 0) {      // An empty result may be a failed request, so nothing is removed then
                return;
            }

            setLoadedGames(current => ({ ...Object.fromEntries(games.map(game => [game.id, game])), ...current }));

            const found = new Set(games.map(game => game.id));
            setIds(current => current.filter(id => found.has(id) || !initialIds.includes(id)));     // Forget stored games that no longer exist
        }).catch(reportError);

        return () => {
            cancelled = true;
        };
    }, [initialIds]);

    useEffect(() => {       // Persist whenever the favourites change
        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        }
    }, [ids]);

    const favourites: Game[] = useMemo(
        () => ids
            .map(id => loadedGames[id])
            .filter((game): game is Game => game !== undefined)         // Games still being fetched are skipped
            .sort((a, b) => a.title.localeCompare(b.title)),
        [ids, loadedGames]
    );

    function addFavourite(game: Game): void {
        setLoadedGames(current => ({ ...current, [game.id]: game }));
        setIds(current => current.includes(game.id) ? current : [...current, game.id]);
    }

    function removeFavouriteById(id: number): void {
        setIds(current => current.filter(favouriteId => favouriteId !== id));
    }

    function isFavourite(game_id: number): boolean {
        return ids.includes(game_id);
    }

    return (
        <FavouriteGamesContext.Provider value={{ favourites, isFavourite, addFavourite, removeFavouriteById }}>
            { children }
        </FavouriteGamesContext.Provider>
    );
}