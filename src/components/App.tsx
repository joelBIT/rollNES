import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { createClient } from "@supabase/supabase-js";
import { FavouriteGamesProvider } from '../contexts/FavouriteGamesContext';
import { Footer, Header, HeaderBanner } from '.';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export function App(): ReactElement {
    return (
        <FavouriteGamesProvider>
            <HeaderBanner />
            <Header />
            <Outlet />
            <ScrollRestoration />
            <Footer />
        </FavouriteGamesProvider>
    )
}