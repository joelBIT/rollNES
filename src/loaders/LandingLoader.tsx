import { supabase } from "../components";
import type { Game } from "../types/types";

/**
 * Retrieve games from backend.
 */
export const LandingLoader = async (): Promise<Game[]> => {
    try {
        const { data } = await supabase.from("games").select().in("id", [172, 816, 107, 289]);

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
    

    return [];
};