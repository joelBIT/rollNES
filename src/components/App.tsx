import { type ReactElement } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

export function App(): ReactElement {
    return (
        <>
            <Outlet />
            <ScrollRestoration />
        </>
    )
}