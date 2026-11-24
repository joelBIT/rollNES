import type { Game } from "../types/types";

/**
 * Everything the app keeps in localStorage. Add a key here (name -> stored type) and the helpers below are typed for it.
 */
interface StorageSchema {
    favourites: number[];                   // Ids of the favourite games
    controllers: StoredControllers;         // Key bindings per controller
}

/** The real keys in the browser. These strings must never change, or existing users lose their data. */
const KEYS: Record<keyof StorageSchema, string> = {
    favourites: "favouriteGames",
    controllers: "controllers",
};

/** What is stored for the controllers. The buttons are checked in gamepads.ts, which knows the valid button ids. */
interface StoredControllers {
    player1?: unknown;
    player2?: unknown;
}

function isStoredControllers(value: unknown): value is StoredControllers {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Checks each stored value. Returns the cleaned value, or null when the data is unusable. */
const PARSERS: { [K in keyof StorageSchema]: (raw: unknown) => StorageSchema[K] | null } = {
    favourites: parseFavouriteIds,
    controllers: (raw) => isStoredControllers(raw) ? raw : null,
};

/** Reads ids, also from the old format where whole games were stored. Duplicates are removed. */
function parseFavouriteIds(raw: unknown): number[] | null {
    if (!Array.isArray(raw)) {
        return null;
    }

    const ids = raw
        .map(item => typeof item === "number" ? item : (item as Game | null)?.id)
        .filter((id): id is number => Number.isInteger(id));

    return Array.from(new Set(ids));
}

let available: boolean | undefined;         // Result of the probe. Availability doesn't change during a session.

/**
 * Tells whether localStorage can be used. The probe (a test write) runs only on the first call. Blocked storage is expected
 * (private mode, cookies disabled), so nothing is logged. Without storage, the app keeps its data in memory.
 */
export function isStorageAvailable(): boolean {
    if (available !== undefined) {
        return available;
    }

    try {
        const key = "testingLocalStorage";
        localStorage.setItem(key, "add");
        localStorage.removeItem(key);
        available = true;
    } catch {
        available = false;
    }

    return available;
}

/**
 * Reads and validates a stored value.
 *
 * @returns the value, or null when storage is unavailable, nothing is stored, or the data is corrupted (which is logged).
 */
export function readItem<K extends keyof StorageSchema>(name: K): StorageSchema[K] | null {
    if (!isStorageAvailable()) {
        return null;
    }

    try {
        const text = localStorage.getItem(KEYS[name]);
        return text === null ? null : PARSERS[name](JSON.parse(text));
    } catch (error) {
        reportError(error);
        return null;
    }
}

/**
 * Stores a value.
 *
 * @returns true if it was saved. False when storage is unavailable (not logged) or the write failed, e.g. a full quota (logged).
 */
export function writeItem<K extends keyof StorageSchema>(name: K, value: StorageSchema[K]): boolean {
    if (!isStorageAvailable()) {
        return false;
    }

    try {
        localStorage.setItem(KEYS[name], JSON.stringify(value));
        return true;
    } catch (error) {
        reportError(error);
        return false;
    }
}

export function removeItem(name: keyof StorageSchema): void {
    if (!isStorageAvailable()) {
        return;
    }

    try {
        localStorage.removeItem(KEYS[name]);
    } catch (error) {
        reportError(error);
    }
}

/** Ids of the favourite games, or an empty list. Corrupted data is overwritten on the next save. */
export function readStoredIds(): number[] {
    return readItem("favourites") ?? [];
}