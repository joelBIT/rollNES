import type { AuthenticationRequest, Game, RegisterRequest } from "./types/types";




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
 * Send a GET request and retrieve all games.
 */
export async function getAllGamesRequest(): Promise<Game[]> {
    console.log('retrieve all games');

    return [];
}

/**
 * Send a GET request and retrieve the game matching the supplied ID, if any.
 */
export async function getFavouriteByIdRequest(id: number): Promise<Game> {
    console.log(id);

    return {} as Game;
}
