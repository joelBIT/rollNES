import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { createClient } from "@supabase/supabase-js";
import { FavouriteGamesProvider } from '../contexts/FavouriteGamesContext';
import { Footer, Header } from '.';
import { GamesProvider } from '../contexts/GamesContext';
import { GameControllerProvider } from '../contexts/GameControllerContext';
import { UserProvider } from '../contexts/UserContext';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export function App(): ReactElement {
    return (
        <UserProvider>
            <GameControllerProvider>
                <GamesProvider>
                    <FavouriteGamesProvider>
                        <Header />
                        <Outlet />
                        <ScrollRestoration />
                        <Footer />
                    </FavouriteGamesProvider>
                </GamesProvider>
            </GameControllerProvider>
        </UserProvider>
    )
}