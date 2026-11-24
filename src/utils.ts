import type { AppliedFilter, FacetFilter, Filter, Game, RetroUser } from "./types/types";

export { COVER_URL } from "./config/env";

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

export const DEFAULT_GAMES_SHOWING = 10;
export const MIN_SEARCH_LENGTH = 3;
export const DEBOUNCE_MS = 250;

/**
 * Calculates the average rating of the supplied reviews.
 */
export function getAverageRating(reviews: { rating: number | null }[] | undefined): number {
    const ratings = (reviews ?? []).map(review => review.rating).filter((rating): rating is number => rating !== null);

    if (ratings.length === 0) {
        return 0;
    }

    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
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

/**
 * Formats a date as, e.g., "March 5, 2025". Accepts a Date or a date string from the backend. Invalid input gives "".
 */
export function convertDateToString(value: string | Date): string {
    const date = typeof value === "string" ? parseDate(value) : value;

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return `${getMonthText(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Parses a date from the backend. A date-only string ("2025-03-05") is a calendar date, so it is created as local
 * midnight of that day. (new Date("2025-03-05") would be UTC midnight, which is the previous evening west of UTC.)
 * Full timestamps are parsed as usual.
 */
function parseDate(value: string): Date {
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (dateOnly) {
        return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    }

    return new Date(value);
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

export function isSameUser(a: RetroUser | null, b: RetroUser | null): boolean {
    return a?.id === b?.id && a?.email === b?.email && a?.first_name === b?.first_name && a?.last_name === b?.last_name;
}

/**
 * Shortens the text to at most maxLength characters (before the ellipsis), cutting at a word boundary when there is a
 * reasonable one. Text that already fits is returned unchanged, without an ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }

    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    const shortened = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut;      // Avoid cutting a word in half

    return shortened.trimEnd() + "...";
}

/**
 * Returns the count followed by the word, in plural unless the count is exactly 1. Example: "1 review", "0 reviews", "5 reviews".
 */
export function pluralize(count: number, word: string): string {
    return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export const FACET_FILTERS: FacetFilter[] = ["category", "players", "publisher", "developer"];

/**
 * Applies the filters to the games. Filters within the same type are mutually inclusive (any value matches). Filters are mutually
 * exclusive between types (a game must match every type that has a filter). A 'title' filter with several words requires the title
 * to include all words. With no filters, all games are returned.
 *
 * @param ignore    Filters of this type are left out. Used to count the values of a type without its own selections hiding them.
 */
export function filterGames(games: Game[], filters: AppliedFilter[], ignore?: Filter): Game[] {
    const active: AppliedFilter[] = ignore ? filters.filter((filter: AppliedFilter) => filter.type !== ignore) : filters;

    if (active.length === 0) {
        return games;
    }

    const titleFilter: AppliedFilter | undefined = active.find((filter: AppliedFilter) => filter.type === "title");
    const titleWords: string[] = titleFilter ? titleFilter.value.split(" ").map((word: string) => word.trim().toLowerCase()).filter(Boolean) : [];

    return games.filter((game: Game) =>
        FACET_FILTERS.every((type: FacetFilter) => {
            const values: string[] = active.filter((filter: AppliedFilter) => filter.type === type).map((filter: AppliedFilter) => filter.value);
            return values.length === 0 || values.includes(String(game[type]));      // No filter of this type applied, or the game matches one of them
        })
        && titleWords.every((word: string) => game.title.toLowerCase().includes(word))
    );
}