import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { FavouriteGamesProvider } from '../contexts/FavouriteGamesContext';
import { GamesProvider } from '../contexts/GamesContext';
import { GameControllerProvider } from '../contexts/GameControllerContext';
import { UserProvider } from '../contexts/UserContext';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';

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