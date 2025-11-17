import { useEffect, useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import { Logo, NavBar, NavIcons, SearchDropdown, supabase } from "..";
import type { Game } from "../../types/types";
import { URL_HOME } from "../../utils";

import "./Header.css";

export function Header(): ReactElement {
    const [ showSearchDropdown, setShowSearchDropdown ] = useState<boolean>(false);
    const [ topGames, setTopGames] = useState<Game[]>([]);

    useEffect(() => {
        getGames();
    }, [])

    async function getGames(): Promise<void> {
        const { data } = await supabase.from("games").select().in("id", [111, 188, 550]);
        
        if (data) {
            const games = [];
            for (let i = 0; i < data?.length; i++) {
                games.push(data[i]);
            }

            setTopGames(games);
        }
    }
    
    return (
        <header>
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