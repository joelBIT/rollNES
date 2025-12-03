import { type ReactElement } from "react";
import { NavLink } from "react-router";
import {URL_GAMES_PAGE} from "../../utils";

import "./NavBar.css";

export function NavBar(): ReactElement {

    return (
        <nav id="navbar">
            <ul className="navbar__list">
                <li className="navbar__list-element">
                    <NavLink to={URL_GAMES_PAGE} title="List games">
                        <span className="material-symbols-outlined" title="Game list"> list_alt </span>
                        <h3 className="navbar__list-title">Games</h3>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}