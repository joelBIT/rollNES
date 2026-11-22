import type { User } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import type { AuthenticationRequest, CreateReview, Game, RegisterRequest, RegistrationResult, RetroUser, Review } from "./types/types";

const GAMES_TABLE = "games";
const NEWSLETTER_TABLE = "newsletter";
const REVIEW_TABLE = "reviews";
const PROFILES_TABLE = "profiles";

const GAME_WITH_REVIEWS = `
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
`;

/**
 * Log the error and throw a new one with a message that is safe to show to the user.
 */
function throwIfError(error: unknown, message: string): void {
    if (error) {
        console.log(error);
        throw new Error(message);
    }
}

function toRetroUser(user: User): RetroUser {
    return {
        id: user.id,
        email: user.email ?? "",
        first_name: user.user_metadata?.first_name ?? "",
        last_name: user.user_metadata?.last_name ?? ""
    };
}




/*****************
 * AUTHORIZATION *
 *****************/

/**
 * Send a POST request to the registration endpoint.
 */
export async function registrationRequest(body: RegisterRequest): Promise<RegistrationResult> {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
                data: {
                    first_name: body.firstName,
                    last_name: body.lastName,
                },
            },
        });

        if (error) {
            console.log(error);
            throw new Error('Registration failed');
        }

        return {
            user: { id: data.user?.id ?? "", email: body.email, first_name: body.firstName, last_name: body.lastName },
            hasSession: data.session !== null
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Send a POST request to the login endpoint.
 */
export async function loginRequest(body: AuthenticationRequest): Promise<void> {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password
        });

        if (error) {
            console.log(error);
            throw new Error('Login failed');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Send a request to delete the user session.
 */
export async function logoutRequest(): Promise<void> {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Check if a user has an active session.
 */
export async function isAuthenticatedRequest(): Promise<boolean> {
    try {
        const { data } = await supabase.auth.getSession();
        if (data && data.session?.user && data.session?.user.aud === "authenticated") {
            return true;
        }
    } catch (error) {
        console.log(error);
    }

    return false;
}







/*********
 * GAMES *
 *********/

/**
 * Send a GET request and retrieve all playable games. Throws if the request fails.
 */
export async function getAllGamesRequest(): Promise<Game[]> {
    const { data, error } = await supabase.from(GAMES_TABLE).select(GAME_WITH_REVIEWS).eq("rom", true).order("title");
    throwIfError(error, "Failed to fetch games");

    return data ?? [];
}

/**
 * Send a GET request and retrieve a specific playable game by ID. Returns null if there is no such game, and throws if the request fails.
 */
export async function getGameByIdRequest(id: number): Promise<Game | null> {
    const { data, error } = await supabase.from(GAMES_TABLE).select(GAME_WITH_REVIEWS).eq("rom", true).eq("id", id).maybeSingle();
    throwIfError(error, `Failed to fetch game with id ${id}`);

    return data;
}

/**
 * Send a GET request and retrieve the playable games with the supplied IDs. Throws if the request fails.
 */
export async function getGamesByIdsRequest(ids: number[]): Promise<Game[]> {
    if (ids.length === 0) {
        return [];
    }

    const { data, error } = await supabase.from(GAMES_TABLE).select().eq("rom", true).in("id", ids);
    throwIfError(error, "Failed to fetch games");

    return data ?? [];
}






/**********
 * SEARCH *
 **********/

/**
 * Retrieve at most three playable games that have the supplied word in its title. Throws if the request fails.
 */
export async function getThreeMatchingGamesRequest(word: string): Promise<Game[]> {
    const { data, error } = await supabase.from(GAMES_TABLE).select().eq("rom", true).ilike("title", `%${word}%`).limit(3);
    throwIfError(error, "Failed to search games");

    return data ?? [];
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
    if (await isAuthenticatedRequest()) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user.id) {
            review.reviewer_id = data.session?.user.id;     // Users that are logged in store their ID with the review
        }
    }

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
        throw new Error(`Failed to fetch reviews`);
    }

    return data;
}

/**
 * Send a GET request to retrieve all reviews for the supplied user ID.
 */
export async function getReviewsByUserIdRequest(id: string): Promise<Review[]> {
    const { data, error } = await supabase.from(REVIEW_TABLE).select().eq("reviewer_id", id);
    if (error) {
        console.log(error);
        throw new Error(`Failed to fetch reviews`);
    }

    return data;
}








/*********
 * USERS *
 *********/

/**
 * Retrieve the session user.
 */
export async function getSessionUserRequest(): Promise<RetroUser> {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
        return toRetroUser(data.session.user);
    }

    throw new Error('Could not find user');
}

export async function updateProfileInformationRequest(first_name: string, last_name: string): Promise<void> {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
        const { error } = await supabase.from(PROFILES_TABLE).update({ last_name, first_name }).eq('id', data.session.user.id);
        throwIfError(error, "Failed to update profile");
    }

    const { error } = await supabase.auth.updateUser({ data: { first_name, last_name } });     // Updates the session user also
    throwIfError(error, "Failed to update profile");
}

/**
 * Get notified whenever the authentication state changes: at startup, login, logout (also in another tab),
 * token refresh and profile updates. The callback gets the signed in user, or null if there is none.
 * @returns     a function that stops the subscription
 */
export function subscribeToAuthChanges(callback: (user: RetroUser | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(session?.user && session.user.aud === "authenticated" ? toRetroUser(session.user) : null);
    });

    return () => data.subscription.unsubscribe();
}