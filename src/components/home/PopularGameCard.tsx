import type { ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";

import "./PopularGameCard.css";

/**
 * One of the most popular games shown in the Landing page.
 */
export function PopularGameCard({game}: {game: Game}): ReactElement {
    return (
        <section className="popular-game-card">
            <NavLink to={URL_GAMES_PAGE + "/" + game.id} className="popular-game-image"> 
                <img src={COVER_URL + game.cover} alt="Game cover" />
            </NavLink>

            <h3 className="popular-game__title"> {game.title} </h3>
            <h3 className="popular-game__players"> {game.players} player{game.players > 1 ? "s" : ""} </h3>
        </section>
    );
}