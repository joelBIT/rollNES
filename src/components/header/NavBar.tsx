import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import {URL_GAMES_PAGE} from "../../utils";
import { ControllerModal } from "..";

import "./NavBar.css";

export function NavBar(): ReactElement {
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    return (
        <>
            <nav id="navbar">
                <ul className="navbar__list">
                    <li className="navbar__list-element">
                        <NavLink to={URL_GAMES_PAGE} title="List games">
                            <span className="material-symbols-outlined" title="Game list"> list_alt </span>
                            <h3 className="navbar__list-title">Games</h3>
                        </NavLink>
                    </li>

                    <li className="navbar__list-element" onClick={() => setOpenModal(true)} title="Configure game controllers">
                        <span className="material-symbols-outlined" title="Game controllers"> videogame_asset </span>
                        <h3 className="navbar__list-title">Config</h3>
                    </li>
                </ul>
            </nav>

            { 
                openModal ? <ControllerModal text="Customize controllers" close={() => setOpenModal(false)} /> : <></>
            }
        </>
    );
}