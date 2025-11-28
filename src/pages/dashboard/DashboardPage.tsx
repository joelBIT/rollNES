import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { URL_LOGIN_PAGE } from "../../utils";

import "./DashboardPage.css";

/**
 * Dashboard for logged in user.
 */
export default function DashboardPage(): ReactElement {
    const navigate = useNavigate();
    const { logout } = useUser();

    function signOut(): void {
        logout();
        navigate(URL_LOGIN_PAGE);
    }

    return (
        <main id="dashboardPage">
            <h2> Dashboard </h2>
            <button className="retro-button" onClick={signOut}> Logout </button>
        </main>
    )
}