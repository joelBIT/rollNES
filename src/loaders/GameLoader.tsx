import { data, type LoaderFunctionArgs } from "react-router";
import type { Game } from "../types/types";
import { getGameByIdRequest } from "../requests";

/**
 * Retrieve game from backend.
 */
export const GameLoader = async ({params}: LoaderFunctionArgs): Promise<Game> => {
    const id = params.id as string;

    try {
        const game = await getGameByIdRequest(parseInt(id));
        if (game) {
            for (let i = 0; i < game.reviews?.length; i++) {
                const date = new Date(game.reviews[i].date);
                game.reviews[i].date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getUTCFullYear();
            }

            return game;
        }

        return game;
    } catch (error) {
        console.log(error);
        throw data(`Error retrieving game with id ${id}`, { status: 500 });
    }
};