import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { createClient } from "@supabase/supabase-js";
import { HeaderBanner } from './header/HeaderBanner';
import { Header } from './header/Header';
import { FavouriteGamesProvider } from '../contexts/FavouriteGamesContext';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export function App(): ReactElement {
    return (
        <FavouriteGamesProvider>
            <HeaderBanner />
            <Header />
            <Outlet />
            <ScrollRestoration />
        </FavouriteGamesProvider>
    )
}