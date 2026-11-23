import { useContext } from "react";
import { GamesContext, type GamesContextProvider } from "../contexts/GamesContext";

export function useGames(): GamesContextProvider {
    const context = useContext<GamesContextProvider | undefined>(GamesContext);

    if (!context) {
        throw new Error("useGames must be used within a GamesProvider");
    }

    return context;
}