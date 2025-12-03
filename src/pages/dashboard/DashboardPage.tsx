import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { URL_LOGIN_PAGE } from "../../utils";
import { ProfileForm, ReviewCard, Tabs } from "../../components";
import type { Review } from "../../types/types";
import { getReviewsByUserIdRequest } from "../../requests";

import "./DashboardPage.css";

/**
 * Dashboard for logged in user.
 */
export default function DashboardPage(): ReactElement {
    const tabTitles = ["Profile", "Reviews"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const navigate = useNavigate();
    const { user, logout } = useUser();

    async function getReviews(): Promise<void> {
        if (user) {
            const userReviews = await getReviewsByUserIdRequest(user.id);
            setReviews(userReviews);
        }
    }

    function signOut(): void {
        logout();
        navigate(URL_LOGIN_PAGE);
    }

    if (active === "Reviews") {
        getReviews();

        return (
            <main id="dashboardPage">
                <Tabs titles={tabTitles} active={active} setActive={setActive} />
                
                {
                    reviews.map((review, i) => <ReviewCard key={i} review={review} />)
                }
            </main>
        );
    }

    return (
        <main id="dashboardPage">
            <Tabs titles={tabTitles} active={active} setActive={setActive} />
            
            <ProfileForm />
            <button className="retro-button logout-button" onClick={signOut}> 
                <span className="material-symbols-outlined">logout</span>
                <h2 className="logout-button-text"> Logout </h2>
            </button>
        </main>
    )
}