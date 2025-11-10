import {useState, type ReactElement} from "react";
import {NavLink} from "react-router";
import {URL_LOGIN_PAGE, URL_REGISTER_PAGE} from "../../utils.ts";

import "./NavIcons.css";

/**
 * Is the part of the Header navbar that have icons (search, account, favourites).
 */
export function NavIcons({toggleShowDropdown, isDropdownShowing}: {toggleShowDropdown: () => void, isDropdownShowing: boolean}): ReactElement {
    const [ showAccountMenu, setShowAccountMenu ] = useState<boolean>(false);
    const [ showFavourites, setShowFavourites ] = useState<boolean>(false);
    const favourites = [];

    /**
     * Closes search dropdown (if open) when navigating to Register or Login pages.
     */
    function closeDropdown() {
        setShowAccountMenu(!showAccountMenu);
        if (isDropdownShowing) {
            toggleShowDropdown();
        }
    }

    return (
        <section id="nav-icons">
            <nav id="icons-navbar">
                <ul id="icons-navbar__list">
                    <li className="icons-navbar__list-element" title="Search product" onClick={() => toggleShowDropdown()}>
                        <span className="material-symbols-outlined"> search </span>
                    </li>

                    <li
                        className="icons-navbar__list-element"
                        onClick={() => setShowAccountMenu(!showAccountMenu)}
                        title="Account"
                    >
                        <span className="material-symbols-outlined"> person </span>
                    </li>

                    <li 
                        className="icons-navbar__list-element" 
                        onClick={() => setShowFavourites(!showFavourites)}
                        title="Favourite games"
                    >
                        <span className="material-symbols-outlined"> 
                            favorite
                            { 
                                favourites?.length > 0 ? <p id="favourite-games"> </p> : <></> 
                            }
                        </span>
                    </li>
                </ul>
            </nav>

            <section id="my-account-menu" className={showAccountMenu ? "show-my-account-menu" : "hide-my-account-menu"}>
                <section id="account-actions">
                    <NavLink id="loginLink" className="retro-button" to={URL_LOGIN_PAGE} onClick={closeDropdown}>
                        Sign In
                    </NavLink>

                    <NavLink id="registerLink" className="retro-button" to={URL_REGISTER_PAGE} onClick={closeDropdown}>
                        Register
                    </NavLink>
                </section>

                <h1 id="my-account-menu__heading"> RollNES account benefits </h1>

                <ul id="my-account-menu__list">
                    <li> Personalized settings and services </li>
                    <li> Store controller configurations </li>
                    <li> Track your favourite games </li>
                    <li> Create and view a wishlist </li>
                </ul>
            </section>

            {/* <FavouriteMenu show={showFavourites} close={() => setShowFavourites(false)} /> */}
        </section>
    )
}