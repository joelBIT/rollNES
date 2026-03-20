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
                        <img src="/games.svg" alt="Game list icon" className="gameList-image" title="Game List" />
                        <h3 className="navbar__list-title">Games</h3>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}