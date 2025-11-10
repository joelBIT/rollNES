import { type ReactElement } from 'react';
import { Outlet } from 'react-router';

export function App(): ReactElement {
    return (
        <Outlet />
    )
}