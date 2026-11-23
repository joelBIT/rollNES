import { createContext, type ReactNode, useEffect, useState } from "react";
import { getSessionUserRequest, loginRequest, logoutRequest, registrationRequest, subscribeToAuthChanges, updateProfileInformationRequest } from "../requests";
import type { AuthenticationRequest, RegisterRequest, RetroUser } from "../types/types";
import { isSameUser } from "../utils";

export interface UserContextProvider {
    user: RetroUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;         // True until the initial session has been checked
    login: (body: AuthenticationRequest) => Promise<void>;
    register: (body: RegisterRequest) => Promise<boolean>;      // true if the user is signed in, false if email confirmation is needed first
    logout: () => Promise<void>;
    updateUser: (first_name: string, last_name: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProvider | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<RetroUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated: boolean = user !== null;

    useEffect(() => {
        return subscribeToAuthChanges(nextUser => {
            setUser(previous => isSameUser(previous, nextUser) ? previous : nextUser);      // Token refreshes don't cause needless re-renders
            setIsLoading(false);
        });
    }, []);

    /**
     * Perform login and authenticate user.
     */
    async function login(body: AuthenticationRequest): Promise<void> {
        await loginRequest(body);
        setUser(await getSessionUserRequest());
    }

    /**
     * Perform registration. The user is only authenticated if Supabase returned a session, i.e., when email confirmation is not required.
     * @returns     true if the user is signed in, false if the user must confirm the email address first.
     */
    async function register(body: RegisterRequest): Promise<boolean> {
        const { user: createdUser, hasSession } = await registrationRequest(body);

        if (hasSession) {
            setUser(createdUser);
        }

        return hasSession;
    }

    /**
     * Perform logout and delete session.
     */
    async function logout(): Promise<void> {
        await logoutRequest();
        setUser(null);
    }

    /**
     * Store new profile information for logged in user.
     */
    async function updateUser(first_name: string, last_name: string): Promise<void> {
        await updateProfileInformationRequest(first_name, last_name);
        setUser(previous => previous ? { ...previous, first_name, last_name } : previous);
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, updateUser }}>
            { children }
        </UserContext.Provider>
    );
}