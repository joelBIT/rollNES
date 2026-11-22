import type { AppliedFilter, Filter, Game, RetroUser, Review } from "./types/types";

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
export const STORAGE_KEY = 'favouriteGames';

export const DEFAULT_GAMES_SHOWING = 10;
export const MIN_SEARCH_LENGTH = 3;
export const DEBOUNCE_MS = 250;

/**
 * Calculates the average rating of the supplied reviews.
 */
export function getAverageRating(reviews: Review[]): number {
    if (!reviews?.length) {
        return 0;
    }

    let rating: number = 0.0;

    for (let i = 0; i < reviews.length; i++) {
        rating += reviews[i].rating;
    }

    return rating / reviews.length;
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
 * @returns     true if the RollNES site is (probably) accessed on a mobile device. False otherwise.
 */
export function isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;

    if (/Mobi|Android/i.test(userAgent)) {
        return true;
    } else if (/Tablet|iPad/i.test(userAgent)) {
        return true;
    }

    return false;
}

export function convertDateToString(date: Date) {
    return `${getMonthText(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Converts the supplied month (number) into the corresponding month as a text representation.
 */
export function getMonthText(month: number): string {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "";
    }
}

/**
 * Read the ids of the favourite games from localstorage. Corrupted data gives an empty list (and is overwritten on the next
 * save). Entries from the old format, where whole games were stored, are converted to ids.
 */
export function readStoredIds(): number[] {
    if (!isLocalStorageAvailable()) {
        return [];
    }

    try {
        const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

        if (Array.isArray(stored)) {
            const ids = stored
                .map(item => typeof item === "number" ? item : (item as Game | null)?.id)
                .filter((id): id is number => Number.isInteger(id));

            return Array.from(new Set(ids));        // No duplicates
        }
    } catch (error) {
        console.log(error);
    }

    return [];
}

export function isSameUser(a: RetroUser | null, b: RetroUser | null): boolean {
    return a?.id === b?.id && a?.email === b?.email && a?.first_name === b?.first_name && a?.last_name === b?.last_name;
}

const PROPERTY_FILTERS: Exclude<Filter, "title">[] = ["category", "players", "publisher", "developer"];

/**
 * Applies the filters to the games. Filters within the same type are mutually inclusive (any value matches). Filters are mutually
 * exclusive between types (a game must match every type that has a filter). A 'title' filter with several words requires the title
 * to include all words. With no filters, all games are returned.
 */
export function filterGames(games: Game[], filters: AppliedFilter[]): Game[] {
    if (filters.length === 0) {
        return games;
    }

    const titleFilter: AppliedFilter | undefined = filters.find((filter: AppliedFilter) => filter.type === "title");
    const titleWords: string[] = titleFilter ? titleFilter.value.split(" ").map((word: string) => word.trim().toLowerCase()).filter(Boolean) : [];

    return games.filter((game: Game) =>
        PROPERTY_FILTERS.every((type: Exclude<Filter, "title">) => {
            const values: string[] = filters.filter((filter: AppliedFilter) => filter.type === type).map((filter: AppliedFilter) => filter.value);
            return values.length === 0 || values.includes(String(game[type]));      // No filter of this type applied, or the game matches one of them
        })
        && titleWords.every((word: string) => game.title.toLowerCase().includes(word))
    );
}