import type { ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { URL_GAME_PAGE } from "../../utils";

import "./PopularGameCard.css";

/**
 * One of the most popular games shown in the Landing page.
 */
export function PopularGameCard({game}: {game: Game}): ReactElement {
    return (
        <section className="top-game-card">
            <NavLink to={URL_GAME_PAGE + "/" + game.id} className="top-game-image" onClick={() => close()}> 
                <img src={game.cover} alt="Game cover" />
            </NavLink>

            <h3 className="top-game__title"> {game.title} </h3>
            <h3 className="top-game__players"> {game.players} players </h3>
        </section>
    );
}