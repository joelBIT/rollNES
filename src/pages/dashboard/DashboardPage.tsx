import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { URL_LOGIN_PAGE } from "../../utils";
import { ProfileForm, ReviewCard, Tabs } from "../../components";
import type { Review } from "../../types/types";
import { getReviewsByUserIdRequest } from "../../requests";
import { reportError } from "../../errors";

import "./DashboardPage.css";

/**
 * Dashboard for logged in user.
 */
export default function DashboardPage(): ReactElement {
    const tabTitles = ["Profile", "Reviews"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading, logout } = useUser();

    useEffect(() => {
        if (active !== "Reviews" || !user) {
            return;
        }

        let cancelled = false;      // Ignore the result if the user switches tab or unmounts before the request finishes
        setLoading(true);
        setError("");

        getReviewsByUserIdRequest(user.id)
            .then(result => { if (!cancelled) setReviews(result); })
            .catch(() => { if (!cancelled) setError("Could not load reviews"); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [active, user?.id]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(URL_LOGIN_PAGE, { replace: true });        // Signed out here, in another tab, or the session expired
        }
    }, [isLoading, isAuthenticated, navigate]);

    async function signOut(): Promise<void> {
        try {
            await logout();         // The effect above redirects to the login page once the user is signed out
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <main id="dashboardPage">
            <Tabs titles={tabTitles} active={active} setActive={setActive} />

            {
                active === "Reviews" ? (
                    <>
                        {loading && <p> Loading reviews... </p>}
                        {error && <h2 className="message-failure"> {error} </h2>}
                        {!loading && !error && reviews.length === 0 && <p> You haven't written any reviews yet. </p>}
                        {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                    </>
                ) : (
                    <>
                        <ProfileForm />
                        <button className="retro-button logout-button" onClick={signOut}>
                            <span className="material-symbols-outlined">logout</span>
                            <h2 className="logout-button-text"> Logout </h2>
                        </button>
                    </>
                )
            }
        </main>
    )
}