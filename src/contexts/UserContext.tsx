import { createContext, type ReactNode, useEffect, useState } from "react";
import { getSessionUserRequest, isAuthenticatedRequest, loginRequest, logoutRequest, registrationRequest, updateProfileInformationRequest } from "../requests";
import type { AuthenticationRequest, RegisterRequest, RetroUser } from "../types/types";

export interface UserContextProvider {
    user: RetroUser | undefined;
    isAuthenticated: boolean;
    login: (body: AuthenticationRequest) => void;
    register: (body: RegisterRequest) => void;
    logout: () => void;
    updateUser: (first_name: string, last_name: string) => void;
}

export const UserContext = createContext<UserContextProvider>({} as UserContextProvider);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<RetroUser>();
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
            if (authenticated) {
                const user = await getSessionUserRequest();
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
            const loggedInUser = await getSessionUserRequest();
            setIsAuthenticated(true);
            setUser(loggedInUser);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Perform registration and authenticate user.
     */
    async function register(body: RegisterRequest): Promise<void> {
        try {
            const createdUser = await registrationRequest(body);
            setIsAuthenticated(true);
            setUser(createdUser);
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

    /**
     * Store new profile information for logged in user.
     */
    async function updateUser(first_name: string, last_name: string): Promise<void> {
        try {
            await updateProfileInformationRequest(first_name, last_name);
            const updatedUser: RetroUser = {
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