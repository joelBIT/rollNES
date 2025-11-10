import type { Review } from "./types/types";

export const URL_CONTROLLERS_PAGE = "/controllers";
export const URL_GAME_PAGE = "/game";
export const URL_GAMES_PAGE = "/games";
export const URL_HOME = "/";
export const URL_LOGIN_PAGE = "/login";
export const URL_NOT_FOUND_PAGE = "*";
export const URL_REGISTER_PAGE = "/register";

/**
 * Calculates the average rating of the supplied reviews.
 */
export function getAverageRating(reviews: Review[]): number {
    if (reviews?.length === 0) {
        return 0;
    }

    let rating = 0.0;

    for (let i = 0; i < reviews?.length; i++) {
        rating += reviews[i]?.rating;
    }

    return rating / reviews?.length;
}