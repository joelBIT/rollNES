import { supabase } from "./components";
import type { AuthenticationRequest, CreateReview, Game, RegisterRequest, Review } from "./types/types";

const GAMES_TABLE = "games";
const NEWSLETTER_TABLE = "newsletter";
const REVIEW_TABLE = "reviews";





/*****************
 * AUTHORIZATION *
 *****************/

/**
 * Send a POST request to the registration endpoint.
 */
export async function registrationRequest(body: RegisterRequest): Promise<void> {
    try {
        const { error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password
        });

        if (error) {
            throw error;
        }
    } catch (error) {
        throw error;
    }
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
        const { data } = await supabase.from("games").select(`
            id,
            title,
            publisher,
            developer,
            category,
            players,
            cover,
            release_date,
            description,
            reviews (
                game_id,
                reviewer_name,
                date,
                heading,
                rating,
                review,
                reviewer_id
            )
        `).eq("rom", true).order("title");    // Only retrieve games that are playable

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }

    return [];
}

/**
 * Send a GET request and retrieve a specific game by ID.
 */
export async function getGameByIdRequest(id: number): Promise<Game> {
    try {
        const { data } = await supabase.from("games").select(`
            id,
            title,
            publisher,
            developer,
            category,
            players,
            cover,
            release_date,
            description,
            reviews (
                game_id,
                reviewer_name,
                date,
                heading,
                rating,
                review,
                reviewer_id
            )
        `).eq("rom", true).eq("id", id).single();

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }

    throw new Error(`Could not find game with id ${id}`);
}

/**
 * Send a GET request and retrieve games with supplied IDs.
 */
export async function getGamesByIdsRequest(ids: number[]): Promise<Game[]> {
    try {
        const { data } = await supabase.from("games").select().in("id", ids);

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }

    return [];
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






/***********
 * REVIEWS *
 ***********/

/**
 * Send a POST request to create a review for the game with the supplied game ID.
 */
export async function createReviewRequest(review: CreateReview): Promise<void> {
    const { error } = await supabase.from(REVIEW_TABLE).insert(review);
    if (error) {
        console.log(error);
        throw new Error(`Failed to create review`);
    }
}

/**
 * Send a GET request to retrieve all reviews for the game with the supplied game ID.
 */
export async function getReviewsByGameIdRequest(id: number): Promise<Review[]> {
    const { data, error } = await supabase.from(REVIEW_TABLE).select().eq("game_id", id);
    if (error) {
        console.log(error);
        throw new Error(`Failed to create review`);
    }

    return data;
}