import { createContext, type ReactNode, useEffect, useState } from "react";
import type { JWT, User } from "../types/types";
import { isAuthenticatedRequest, loginRequest, logoutRequest, registrationRequest } from "../requests";
export interface UserContextProvider {
    user: User | null;
    token: JWT | null;
    authenticated: boolean;
    authChecked: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, firstName: string, lastName: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProvider>({} as UserContextProvider);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<JWT | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [authChecked, setAuthChecked] = useState<boolean>(false);

    useEffect(() => {
        isAuthenticated();
    }, [])

    async function isAuthenticated() {
        try {
            const authenticated = await isAuthenticatedRequest();
            setAuthenticated(authenticated);
        } catch (error) {
            console.log(error);
            setAuthenticated(false);
            setUser(null);
        } finally {
            setAuthChecked(true);
        }
    }

    async function login(email: string, password: string) {
        try {
            await loginRequest({email, password});
            setUser({email, password});
        } catch (error) {
            console.log(error);
            throw new Error("Login attempt failed.");
        }
    }

    async function register(email: string, password: string, firstName: string, lastName: string) {
        try {
            await registrationRequest({email, password, firstName, lastName});
            setUser({email, password});
        } catch (error) {
            console.log(error);
            throw new Error("Registration failed.");
        }
    }

    async function logout() {
        try {
            await logoutRequest();
            setToken(null);
            setUser(null);
        } catch (error) {
            console.log(error);
            throw new Error("Logout failed.");
        }
    }

    return (
        <UserContext.Provider value={{ user, token, authenticated, authChecked, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}