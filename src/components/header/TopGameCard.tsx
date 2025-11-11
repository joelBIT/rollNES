import type { ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAME_PAGE } from "../../utils";

import "./TopGameCard.css";

/**
 * Card for the most popular games (used in Header dropdown).
 */
export function TopGameCard({game, close}: { game: Game, close: () => void}): ReactElement {

    return (
        <section className="top-game-card">
            <NavLink to={URL_GAME_PAGE + "/" + game.id} className="game-image" onClick={() => close()}> 
                <img src={COVER_URL + game.cover} alt="Game cover" />
            </NavLink>

            <h3 className="top-game__title"> {game.title} </h3>
        </section>
    );
}