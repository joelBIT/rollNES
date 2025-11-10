import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import {URL_GAMES_PAGE} from "../../utils";

import "./NavBar.css";

export function NavBar(): ReactElement {
    const [ showMenu, setShowMenu ] = useState<boolean>(false);

    return (
        <nav id="navbar">
            <ul className={showMenu ? "navbar__list showmenu" : "navbar__list"}>
                <li>
                    <NavLink to={URL_GAMES_PAGE}>
                        <h2 onClick={() => setShowMenu(!showMenu)}> Games </h2>
                    </NavLink>
                </li>
            </ul>

            <div id="hamburger" onClick={() => setShowMenu(!showMenu)}>
                <img src={showMenu ? "/close_icon.svg" : "/hamburger_icon.svg"} alt="Hamburger menu" />
            </div>
        </nav>
    );
}