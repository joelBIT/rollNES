import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { HeaderBanner } from './header/HeaderBanner';

export function App(): ReactElement {
    return (
        <>
            <HeaderBanner />
            <Outlet />
            <ScrollRestoration />
        </>
    )
}