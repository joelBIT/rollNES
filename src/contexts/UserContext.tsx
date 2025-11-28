import { createContext, type ReactNode, useEffect, useState } from "react";
import { isAuthenticatedRequest, loginRequest, logoutRequest, registrationRequest } from "../requests";
import type { AuthenticationRequest, RegisterRequest } from "../types/types";

export interface UserContextProvider {
    isAuthenticated: boolean;
    login: (body: AuthenticationRequest) => void;
    register: (body: RegisterRequest) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProvider>({} as UserContextProvider);

export function UserProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        checkActiveSession();
    }, [])

    /**
     * Check if user has an active session already (i.e., is authenticated).
     */
    async function checkActiveSession(): Promise<void> {
        try {
            const authenticated = await isAuthenticatedRequest();
            setIsAuthenticated(authenticated);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Perform login and authenticate user.
     */
    async function login(body: AuthenticationRequest): Promise<void> {
        try {
            await loginRequest(body);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Perform registration and authenticate user.
     */
    async function register(body: RegisterRequest): Promise<void> {
        try {
            await registrationRequest(body);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Perform logout and delete session.
     */
    async function logout(): Promise<void> {
        try {
            await logoutRequest();
            setIsAuthenticated(false);
        } catch (error) {
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{ isAuthenticated, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}