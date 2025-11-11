import { supabase } from "../components";
import type { Game } from "../types/types";

/**
 * Retrieve games from backend.
 */
export const LandingLoader = async (): Promise<Game[]> => {
    try {
        const { data } = await supabase.from("games").select().in("id", [172, 967, 848]);

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
    

    return [];
};