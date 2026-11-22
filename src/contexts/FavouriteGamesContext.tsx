import { createContext, type ReactElement, type ReactNode, useEffect, useState } from "react";
import { type Game } from "../types/types";
import { isLocalStorageAvailable, sortGamesByTitle, STORAGE_KEY } from "../utils";

export interface FavouriteGamesContextProvider {
    favourites: Game[];
    isFavourite: (game_id: number) => boolean;
    addFavourite: (game: Game) => void;
    removeFavouriteById: (id: number) => void;
}

export const FavouriteGamesContext = createContext<FavouriteGamesContextProvider>({} as FavouriteGamesContextProvider);

export function FavouriteGamesProvider({ children }: { children: ReactNode }): ReactElement {
    const [favourites, setFavourites] = useState<Game[]>([]);

    useEffect(() => {       // Persist whenever the favourites change
        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
        }
    }, [favourites]);

    function addFavourite(game: Game): void {
        setFavourites(current => current.some(favourite => favourite.id === game.id) ? current : sortGamesByTitle([...current, game]));
    }

    function removeFavouriteById(id: number): void {
        setFavourites(current => current.filter(favourite => favourite.id !== id));
    }

    function isFavourite(game_id: number): boolean {
        return favourites.some(game => game.id === game_id);
    }

    return (
        <FavouriteGamesContext.Provider value={{ favourites, isFavourite, addFavourite, removeFavouriteById }}>
            { children }
        </FavouriteGamesContext.Provider>
    );
}