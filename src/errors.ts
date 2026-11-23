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
 * The single place errors are logged.
 */
export function reportError(error: unknown): void {
    console.error(error instanceof RequestError && error.original ? error.original : error);
}