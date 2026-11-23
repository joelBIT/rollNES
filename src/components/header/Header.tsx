import { useEffect, useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import { Carousel } from "./Carousel";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";
import { NavIcons } from "./NavIcons";
import { SearchDropdown } from "./SearchDropdown";
import { getGamesByIdsRequest } from "../../requests";
import type { Game } from "../../types/types";
import { URL_HOME } from "../../utils";
import { TOP_GAME_IDS } from "../../config/games";

import "./Header.css";

export function Header(): ReactElement {
    const [ showSearchDropdown, setShowSearchDropdown ] = useState<boolean>(false);
    const [ topGames, setTopGames] = useState<Game[]>([]);

    useEffect(() => {
        let cancelled = false;

        getGamesByIdsRequest(TOP_GAME_IDS)
            .then(games => { if (!cancelled) setTopGames(games); })
            .catch(error => console.log(error));

        return () => { cancelled = true; };
    }, []);
    
    return (
        <header>
            <Carousel />
            
            <section id="header-nav">
                <NavBar />

                <NavLink to={URL_HOME} id="rollnes-logo">
                    <Logo />
                </NavLink>
                
                <NavIcons toggleShowDropdown={() => setShowSearchDropdown(!showSearchDropdown)} isDropdownShowing={showSearchDropdown} />
            </section>

            <SearchDropdown 
                show={showSearchDropdown} 
                toggleShowDropdown={() => setShowSearchDropdown(!showSearchDropdown)} 
                topGames={topGames}
            />
        </header>
    );
}