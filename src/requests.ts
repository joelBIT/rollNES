import { supabase } from "./components";
import type { AuthenticationRequest, Game, RegisterRequest } from "./types/types";

const GAMES_TABLE = "games";
const NEWSLETTER_TABLE = "newsletter";





/*****************
 * AUTHORIZATION *
 *****************/

/**
 * Send a POST request to the registration endpoint.
 */
export async function register(body: RegisterRequest): Promise<void> {
    console.log(body);
}

/**
 * Send a POST request to the login endpoint.
 */
export async function login(body: AuthenticationRequest): Promise<void> {
    console.log(body);
}






/**************
 * FAVOURITES *
 **************/

/**
 * Send a GET request and retrieve all favourite games for a specific user.
 */
export async function getAllFavouritesRequest(user_id: number): Promise<Game[]> {
    console.log(user_id);

    return [];
}

/**
 * Send a DELETE request and delete the favourite game matching the supplied ID, if any.
 */
export async function deleteFavouriteByIdRequest(id: number): Promise<void> {
    console.log(id);
}

/**
 * Send a POST request and add the supplied game as a favourite.
 */
export async function createFavouriteRequest(game: Game): Promise<void> {
    console.log(game);
}








/*********
 * GAMES *
 *********/


/**
 * Send a GET request and retrieve all playable games.
 */
export async function getAllGamesRequest(): Promise<Game[]> {

    try {
        const { data } = await supabase.from("games").select().eq("rom", true).order("title");    // Only retrieve games that are playable

        if (data) {
            const games = [];

            for (let i = 0; i < data?.length; i++) {
                games.push(data[i]);
                data[i].reviews = [];
            }

            return games;
        }
    } catch (error) {
        console.log(error);
    }

    return [];
}

/**
 * Send a GET request and retrieve the game matching the supplied ID, if any.
 */
export async function getFavouriteByIdRequest(id: number): Promise<Game> {
    console.log(id);

    return {} as Game;
}







/**********
 * SEARCH *
 **********/

/**
 * Retrieve at most three games that have the supplied word in its title.
 */
export async function getThreeMatchingGamesRequest(word: string): Promise<Game[]> {
    try {
        const { data } = await supabase.from(GAMES_TABLE).select().eq("rom", true).ilike("title", `%${word}%`).limit(3);
        if (data && data?.length > 0) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }

    return [];
}






/**************
 * NEWSLETTER *
 **************/

/**
 * Function for subsribing to the newsletter.
 */
export async function subscribeToNewsletterRequest(email: string): Promise<void> {
    const { error } = await supabase.from(NEWSLETTER_TABLE).insert({ email });
    if (error) {
        console.log(error);

        if (error.code == '23505' && error.details.includes("email")) {
            throw new Error(`The email ${email} has already subscribed`);
        }

        throw new Error(`Failed to subscribe`);
    }
}