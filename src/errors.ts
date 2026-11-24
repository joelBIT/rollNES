/**
 * An error from a backend request. The message is written for users. The original error is kept for debugging.
 */
export class RequestError extends Error {
    readonly original: unknown;

    constructor(message: string, original?: unknown) {
        super(message);
        this.name = "RequestError";
        this.original = original;
    }
}

/**
 * The text to show a user. Only messages from RequestError are shown. Anything else gets the fallback.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof RequestError ? error.message : fallback;
}

/**
 * The single place errors are logged. For a RequestError, both the user-facing message and the original
 * (for example the Supabase error with its code and details) are logged.
 */
export function reportError(error: unknown): void {
    if (error instanceof RequestError) {
        console.error(error.message, ...(error.original ? [error.original] : []));
        return;
    }

    console.error(error);
}