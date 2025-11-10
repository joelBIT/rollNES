




/*****************
 * AUTHORIZATION *
 *****************/

import type { AuthenticationRequest } from "./types/types";


/**
 * Send a POST request to the login endpoint.
 */
export async function login(body: AuthenticationRequest): Promise<void> {
    console.log(body);
}