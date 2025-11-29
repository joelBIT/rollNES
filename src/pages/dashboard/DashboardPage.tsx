import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { URL_LOGIN_PAGE } from "../../utils";
import { ProfileForm, Tabs } from "../../components";

import "./DashboardPage.css";

/**
 * Dashboard for logged in user.
 */
export default function DashboardPage(): ReactElement {
    const tabTitles = ["Profile", "Reviews", "Settings", "Wishlist"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const navigate = useNavigate();
    const { logout } = useUser();

    function signOut(): void {
        logout();
        navigate(URL_LOGIN_PAGE);
    }

    if (active === "Reviews") {
        return (
            <main id="dashboardPage">
                <Tabs titles={tabTitles} setActive={setActive} />
                <h2 className="dashboard-title"> Reviews </h2>
            </main>
        );
    }

    if (active === "Settings") {
        return (
            <main id="dashboardPage">
                <Tabs titles={tabTitles} setActive={setActive} />
                <h2 className="dashboard-title"> Coming soon </h2>
            </main>
        );
    }

    if (active === "Wishlist") {
        return (
            <main id="dashboardPage">
                <Tabs titles={tabTitles} setActive={setActive} />
                <h2 className="dashboard-title"> Nothing yet </h2>
            </main>
        );
    }

    return (
        <main id="dashboardPage">
            <Tabs titles={tabTitles} setActive={setActive} />
            
            <ProfileForm />
            <button className="retro-button logout-button" onClick={signOut}> 
                <span className="material-symbols-outlined">logout</span>
                <h2 className="logout-button-text"> Logout </h2>
            </button>
        </main>
    )
}