import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";

import "./PopularGames.css";

/**
 * One of the most popular games shown in the Landing page.
 */
export function PopularGames({games}: {games: Game[]}): ReactElement {
    const [selectedCover, setSelectedCover] = useState<string>(games[0].cover ?? "");

    return (
        <section className="popular-games">
            <section className="popular-games__content">
                <section className="popular-games__links">
                    <h2 className="popular-games__heading"> Most Played </h2>

                    {
                        games.map((game: Game) => 
                            <NavLink 
                                to={URL_GAMES_PAGE + "/" + game.id} 
                                className={game.cover === selectedCover ? "popular-game-link selected-game" : "popular-game-link"} 
                                onMouseOver={() => setSelectedCover(game.cover)}
                            > 
                                {game.title} 
                            </NavLink>
                        )
                    }
                </section>

                <figure className="popular-games__figure">
                    <img src={COVER_URL + selectedCover} alt="Game cover" />
                </figure>
            </section>
        </section>
    );
}