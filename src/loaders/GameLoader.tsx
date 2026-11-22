import { data, type LoaderFunctionArgs } from "react-router";
import type { Game } from "../types/types";
import { getGameByIdRequest } from "../requests";

/**
 * Retrieve game from backend. Responds with 404 if the id is invalid or no playable game 
 * has that id, and 500 if the request fails.
 */
export const GameLoader = async ({params}: LoaderFunctionArgs): Promise<Game> => {
    const id = Number(params.id);

    if (!Number.isInteger(id) || id <= 0) {
        throw data(`Game "${params.id}" was not found`, { status: 404 });
    }

    let game: Game | null;
    try {
        game = await getGameByIdRequest(id);
    } catch (error) {
        console.log(error);
        throw data(`Error retrieving game with id ${id}`, { status: 500 });
    }

    if (!game) {
        throw data(`Game ${id} was not found`, { status: 404 });
    }

    return game;
};