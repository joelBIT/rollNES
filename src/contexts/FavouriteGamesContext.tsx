import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type Game } from "../types/types";
import { isLocalStorageAvailable } from "../utils";

export interface FavouriteGamesContextProvider {
    favourites: Game[];
    isFavourite: (game_id: number) => boolean;
    addFavourite: (game: Game) => void;
    removeFavouriteById: (id: number) => void;
}

export const FavouriteGamesContext = createContext<FavouriteGamesContextProvider>({} as FavouriteGamesContextProvider);

export function FavouriteGamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [favourites, setFavourites] = useState<Game[]>([]);
    const STORAGE_KEY = 'favouriteGames';

    useEffect(() => {
        loadFavouriteGames();     
    }, []);

    /**
     * Load favourite games from localstorage if localstorage is available.
     */
    async function loadFavouriteGames(): Promise<void> {
        if (isLocalStorageAvailable()) {
            if (localStorage.getItem(STORAGE_KEY)) {
                const games = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                setFavourites(games);
            } else {
                localStorage.setItem(STORAGE_KEY, '[]');
            }
        }
    }

    async function addFavourite(game: Game): Promise<void> {
        const games = sortFavourites([...favourites, game]);
        setFavourites(games);

        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
        }
    }

    function sortFavourites(favourites: Game[]): Game[] {
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    async function removeFavouriteById(id: number): Promise<void> {
        const games = favourites.filter((favourite: { id: number; }) => favourite.id !== id);
        setFavourites(games);

        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
        }
    }

    function isFavourite(game_id: number): boolean {
        return favourites.filter(game => game.id === game_id).length > 0;
    }

    return (
        <FavouriteGamesContext.Provider value={{ favourites, isFavourite, addFavourite, removeFavouriteById }}>
            { children }
        </FavouriteGamesContext.Provider>
    );
}