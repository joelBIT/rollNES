import { useContext } from "react";
import { GameControllerContext, type GameControllerContextProvider } from "../contexts/GameControllerContext";

export function useControllers(): GameControllerContextProvider {
    const context = useContext<GameControllerContextProvider>(GameControllerContext);

    if (!context) {
        throw new Error("useControllers must be used within a GameControllerProvider");
    }

    return context;
}