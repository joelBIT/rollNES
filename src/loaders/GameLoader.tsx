import type { LoaderFunctionArgs } from "react-router";
import { supabase } from "../components";
import type { Game } from "../types/types";

/**
 * Retrieve game from backend.
 */
export const GameLoader = async ({params}: LoaderFunctionArgs): Promise<Game> => {
    const id = params.id;

    const { data } = await supabase.from("games").select().eq("id", id).single();

    if (data) {
        const game = data;

        const reviews = await supabase.from("reviews").select().eq("game_id", id);
        game.reviews = reviews.data ? reviews.data: [];

        for (let i = 0; i < game.reviews.length; i++) {
            const date = new Date(game.reviews[i].created_at);
            game.reviews[i].date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getUTCFullYear();
        }

        return game;
    }

    return data;
};