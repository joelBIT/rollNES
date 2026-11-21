import { createContext, type ReactNode, useEffect, useState } from "react";
import { getSessionUserRequest, isAuthenticatedRequest, loginRequest, logoutRequest, registrationRequest, updateProfileInformationRequest } from "../requests";
import type { AuthenticationRequest, RegisterRequest, RetroUser } from "../types/types";

export interface UserContextProvider {
    user: RetroUser | null;
    isAuthenticated: boolean;
    login: (body: AuthenticationRequest) => Promise<void>;
    register: (body: RegisterRequest) => Promise<boolean>;      // true if the user is signed in, false if email confirmation is needed first
    logout: () => Promise<void>;
    updateUser: (first_name: string, last_name: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProvider>({} as UserContextProvider);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<RetroUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        checkActiveSession();
    }, [])

    /**
     * Check if user has an active session already (i.e., is authenticated).
     */
    async function checkActiveSession(): Promise<void> {
        try {
            const authenticated: boolean = await isAuthenticatedRequest();
            setIsAuthenticated(authenticated);
            if (authenticated) {
                const user: RetroUser = await getSessionUserRequest();
                setUser(user);
            }
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
            const loggedInUser: RetroUser = await getSessionUserRequest();
            setIsAuthenticated(true);
            setUser(loggedInUser);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Perform registration of a new user.
     * @returns true if the user is signed in, false if email confirmation is needed first.
     */
    async function register(body: RegisterRequest): Promise<boolean> {
        const { user: createdUser, hasSession } = await registrationRequest(body);

        if (hasSession) {
            setIsAuthenticated(true);
            setUser(createdUser);
        }

        return hasSession;
    }

    /**
     * Perform logout and delete session.
     */
    async function logout(): Promise<void> {
        try {
            await logoutRequest();
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Store new profile information for logged in user.
     */
    async function updateUser(first_name: string, last_name: string): Promise<void> {
        try {
            await updateProfileInformationRequest(first_name, last_name);
            const updatedUser: RetroUser = {
                id: user?.id ?? "",
                email: user?.email as string,
                first_name,
                last_name
            }
            setUser(updatedUser);
        } catch (error) {
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
            { children }
        </UserContext.Provider>
    );
}