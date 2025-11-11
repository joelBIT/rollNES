import { useContext } from "react";
import { FavouriteGamesContext, type FavouriteGamesContextProvider } from "../contexts/FavouriteGamesContext";

export function useFavourites(): FavouriteGamesContextProvider {
    const context = useContext<FavouriteGamesContextProvider>(FavouriteGamesContext);

    if (!context) {
        throw new Error("useFavourites must be used within a FavouriteGamesProvider");
    }

    return context;
}