import type { GameController, Review } from "./types/types";

export const URL_COMPANY_PAGE = "/company";
export const URL_CONTACT_PAGE = "/contact";
export const URL_DASHBOARD_PAGE = "/dashboard";
export const URL_GAMES_PAGE = "/games";
export const URL_HELP_CENTER_PAGE = "/help";
export const URL_HOME = "/";
export const URL_LOGIN_PAGE = "/login";
export const URL_NOT_FOUND_PAGE = "*";
export const URL_PRIVACY_PAGE = "/privacy";
export const URL_REGISTER_PAGE = "/register";
export const URL_RIGHTS_PAGE = "/rights";
export const URL_TEAM_PAGE = "/team";
export const URL_TERMS_PAGE = "/terms";
export const URL_VISION_PAGE = "/vision";

export const COVER_URL = import.meta.env.VITE_COVER_URL;

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

/**
 * Test if localstorage is available. Favourite games are added to localstorage if true. If false,
 * the FavouriteGamesContext stores favourite games temporarily.
 * 
 * @returns true if localstorage is available, false otherwise
 */
export function isLocalStorageAvailable() {
    try {
        const key = 'testingLocalStorage';
        localStorage.setItem(key, 'add');
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Extract player1 controller configuration from formData object.
 */
export function extractPlayer1Configuration(formData: FormData): GameController {
    const player1: GameController = {
        a: { button: 'A', value: formData.get('A') as string },
        b: { button: 'B', value: formData.get('B') as string },
        start: { button: "Start", value: formData.get('Start') as string },
        select: { button: 'Select', value: formData.get('Select') as string },
        up: { button: 'ArrowUp', value: formData.get('ArrowUp') as string },
        down: { button: 'ArrowDown', value: formData.get('ArrowDown') as string },
        left: { button: 'ArrowLeft', value: formData.get('ArrowLeft') as string },
        right: { button: 'ArrowRight', value: formData.get('ArrowRight') as string }
    }

    return player1;
}

/**
 * Extract player2 controller configuration from formData object.
 */
export function extractPlayer2Configuration(formData: FormData): GameController {
    const player2: GameController = {
        a: { button: 'A2', value: formData.get('A2') as string },
        b: { button: 'B2', value: formData.get('B2') as string },
        start: { button: 'Start2', value: formData.get('Start2') as string },
        select: { button: 'Select2', value: formData.get('Select2') as string },
        up: { button: 'ArrowUp2', value: formData.get('ArrowUp2') as string },
        down: { button: 'ArrowDown2', value: formData.get('ArrowDown2') as string },
        left: { button: 'ArrowLeft2', value: formData.get('ArrowLeft2') as string },
        right: { button: 'ArrowRight2', value: formData.get('ArrowRight2') as string }
    }

    return player2;
}