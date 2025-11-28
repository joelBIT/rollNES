import { createContext, useState, type ReactNode } from "react";
import type { JWT, User } from "../types/types";
import { logoutRequest } from "../requests";
export interface UserContextProvider {
    user: User | null;
    token: JWT | null;
    setJWT: (token: JWT) => void;
    setSessionUser: (user: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProvider>({} as UserContextProvider);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<JWT | null>(null);

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

    function setJWT(token: JWT) {
        setToken(token);
    }

    function setSessionUser(user: User) {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ user, token, setJWT, setSessionUser, logout }}>
            { children }
        </UserContext.Provider>
    );
}