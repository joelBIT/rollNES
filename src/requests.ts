import type { AuthenticationRequest, RegisterRequest } from "./types/types";




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