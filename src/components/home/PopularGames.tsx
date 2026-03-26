import { type ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { URL_GAMES_PAGE } from "../../utils";

import "./PopularGames.css";

/**
 * Some of the most popular games shown in the Landing page.
 */
export function PopularGames({games}: {games: Game[]}): ReactElement {

    return (
        <section className="popular-games">
            <h2 className="popular-games__heading"> Most Played </h2>

            <section className="popular-games__grid">
                {
                    games.map((game: Game, index: number) => 
                        <NavLink 
                            key={game.id}
                            to={URL_GAMES_PAGE + "/" + game.id} 
                            className={`popular-game game-${index}`}
                            title={game.title}
                        > 
                            <h3 className="popular-game__title">{game.title}</h3>
                        </NavLink>
                    )
                }
            </section>
        </section>
    );
}