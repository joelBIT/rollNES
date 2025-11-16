import { getGamesByIdsRequest } from "../requests";
import type { Game } from "../types/types";

/**
 * Retrieve most played games from backend.
 */
export const LandingLoader = async (): Promise<Game[]> => {
    try {
        return await getGamesByIdsRequest([172, 816, 739, 289]);
    } catch (error) {
        console.log(error);
    }
    
    return [];
};