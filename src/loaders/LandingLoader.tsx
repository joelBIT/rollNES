import { MOST_PLAYED_GAME_IDS } from "../config/games";
import { getGamesByIdsRequest } from "../requests";
import type { Game } from "../types/types";

/**
 * Retrieve most played games from backend.
 */
export const LandingLoader = async (): Promise<Game[]> => {
    try {
        return await getGamesByIdsRequest(MOST_PLAYED_GAME_IDS);
    } catch (error) {
        console.log(error);
    }
    
    return [];
};