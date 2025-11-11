import { supabase } from "../components";
import type { Game } from "../types/types";

/**
 * Retrieve games from backend.
 */
export const GamesLoader = async (): Promise<Game[]> => {
    const { data } = await supabase.from("games").select().limit(10).order("title");

    if (data) {
        const games = [];
        for (let i = 0; i < data?.length; i++) {
            games.push(data[i]);

            const reviews = await supabase.from("reviews").select().eq("game_id", data[i].id);
            data[i].reviews = reviews.data ? reviews.data: [];
        }

        return games;
    }

    return [];
};