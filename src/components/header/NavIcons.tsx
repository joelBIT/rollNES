import { useState, type ReactElement } from "react";
import { NavLink, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser.tsx";
import { useFavourites } from "../../hooks/useFavourites.tsx";
import { URL_DASHBOARD_PAGE, URL_LOGIN_PAGE, URL_REGISTER_PAGE } from "../../utils.ts";
import { FavouriteMenu } from "../index.ts";

import "./NavIcons.css";

/**
 * Is the part of the Header navbar that have icons (search, account, favourites).
 */
export function NavIcons({toggleShowDropdown, isDropdownShowing}: {toggleShowDropdown: () => void, isDropdownShowing: boolean}): ReactElement {
    const [ showAccountMenu, setShowAccountMenu ] = useState<boolean>(false);
    const [ showFavourites, setShowFavourites ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useUser();
    const { favourites } = useFavourites();

    /**
     * Closes all overlays when clicking on a link and being redirected to a new page.
     */
    function closeAllOverlays(): void {
        setShowFavourites(false);
        setShowAccountMenu(false);
        if (isDropdownShowing) {
            toggleShowDropdown();
        }
    }

    return (
        <section id="nav-icons">
            <nav id="icons-navbar">
                <ul id="icons-navbar__list">
                    <li 
                        className={`icons-navbar__list-element ${isDropdownShowing ? "showing-dropdown" : ""}`} 
                        title="Search games" 
                        onClick={() => toggleShowDropdown()}
                    >
                        <span className="material-symbols-outlined"> search </span>
                    </li>

                    {
                        isAuthenticated ?
                            <li
                                className="icons-navbar__list-element"
                                onClick={() => navigate(URL_DASHBOARD_PAGE)}
                                title="Dashboard"
                            >
                                <span className="material-symbols-outlined"> dashboard </span>
                            </li>
                            :
                            <li
                                className={`icons-navbar__list-element ${showAccountMenu ? "showing-account" : ""}`}
                                onClick={() => setShowAccountMenu(!showAccountMenu)}
                                title="Account"
                            >
                                <span className="material-symbols-outlined"> person </span>
                            </li>
                    }

                    <li 
                        className="icons-navbar__list-element" 
                        onClick={() => setShowFavourites(!showFavourites)}
                        title="Favourite games"
                    >
                        <span className="material-symbols-outlined"> 
                            favorite
                            { 
                                favourites.length > 0 ? <span className="favourites-indicator" aria-label={`${favourites.length} favourite games`}></span> : <></> 
                            }
                        </span>
                    </li>
                </ul>
            </nav>

            <section id="my-account-menu" className={showAccountMenu ? "show-my-account-menu" : "hide-my-account-menu"}>
                <section id="account-actions">
                    <NavLink id="loginLink" className="retro-button" to={URL_LOGIN_PAGE} onClick={closeAllOverlays}>
                        Sign In
                    </NavLink>

                    <NavLink id="registerLink" className="retro-button" to={URL_REGISTER_PAGE} onClick={closeAllOverlays}>
                        Register
                    </NavLink>
                </section>

                <h1 id="my-account-menu__heading"> RollNES account benefits </h1>

                <ul id="my-account-menu__list">
                    <li> Personalized settings and services </li>
                    <li> Store controller configurations </li>
                    <li> Track your reviews </li>
                    <li> Create and view a wishlist </li>
                </ul>
            </section>

            <FavouriteMenu show={showFavourites} close={() => setShowFavourites(false)} closeOverlays={closeAllOverlays} />
        </section>
    )
}