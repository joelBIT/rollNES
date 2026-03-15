import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";

import "./PopularGames.css";

/**
 * One of the most popular games shown in the Landing page.
 */
export function PopularGames({games}: {games: Game[]}): ReactElement {
    const [selectedCover, setSelectedCover] = useState<string>(games[0].cover);

    return (
        <section className="popular-games">
            <section className="popular-games__content">
                <section className="popular-games__links">
                    <h2 className="popular-games__heading"> Most Played </h2>

                    <NavLink 
                        to={URL_GAMES_PAGE + "/" + games[0].id} 
                        className={games[0].cover === selectedCover ? "popular-game-link selected-game" : "popular-game-link"} 
                        onMouseOver={() => setSelectedCover(games[0].cover)}
                    > 
                        {games[0].title} 
                    </NavLink>

                    <NavLink 
                        to={URL_GAMES_PAGE + "/" + games[1].id} 
                        className={games[1].cover === selectedCover ? "popular-game-link selected-game" : "popular-game-link"} 
                        onMouseOver={() => setSelectedCover(games[1].cover)}
                    > 
                        {games[1].title} 
                    </NavLink>

                    <NavLink 
                        to={URL_GAMES_PAGE + "/" + games[2].id} 
                        className={games[2].cover === selectedCover ? "popular-game-link selected-game" : "popular-game-link"} 
                        onMouseOver={() => setSelectedCover(games[2].cover)}
                    > 
                        {games[2].title} 
                    </NavLink>

                    <NavLink 
                        to={URL_GAMES_PAGE + "/" + games[3].id} 
                        className={games[3].cover === selectedCover ? "popular-game-link selected-game" : "popular-game-link"} 
                        onMouseOver={() => setSelectedCover(games[3].cover)}
                    > 
                        {games[3].title} 
                    </NavLink> 
                </section>

                <figure className="popular-games__figure">
                    <img src={COVER_URL + selectedCover} alt="Game cover" />
                </figure>
            </section>
        </section>
    );
}