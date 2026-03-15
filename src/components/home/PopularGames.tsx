import type { ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";

import "./PopularGames.css";

/**
 * One of the most popular games shown in the Landing page.
 */
export function PopularGames({games}: {games: Game[]}): ReactElement {
    return (
        <section className="popular-game-card">
            <section>
                {games.length}
            </section>

            <NavLink to={URL_GAMES_PAGE + "/" + games[0].id} className="popular-game-image"> GO </NavLink> 

            <img src={COVER_URL + games[0].cover} alt="Game cover" />
        </section>
    );
}