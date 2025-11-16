import { type ReactElement } from "react";
import { NavLink } from "react-router";
import { useFavourites } from "../../hooks/useFavourites";
import type { Game } from "../../types/types";
import { COVER_URL, getAverageRating, URL_GAME_PAGE } from "../../utils";
import { Rating } from "..";

import "./GameCard.css";

/**
 * Card used in list of games in /games page. Each game that meets the filter criteria is represented by a GameCard.
 */
export function GameCard({game}: { game: Game}): ReactElement {
    const { addFavourite, isFavourite, removeFavouriteById } = useFavourites();
    const favourite = isFavourite(game.id);

    return (
        <section className="game-card">
            <section className="game-image">
                <img src={COVER_URL + game.cover} alt="Game cover" />
            </section>

            <section className="game-information">
                <NavLink to={URL_GAME_PAGE + "/" + game.id} className="game-information__link"> 
                    <h2 className="game-information__heading"> {game.title} </h2> 
                </NavLink>
                
                <h2 className="game-information__description"> 
                    {game.description.substring(0, 300)}{game.description.length > 250 ? "..." : ""} 
                </h2>
            </section>
            
            <section className="game-details">
                <section className="game-details__reviews">
                    <Rating rating={getAverageRating(game.reviews)} />
                    <p> {game.reviews?.length} review{game.reviews?.length > 1 || game.reviews?.length === 0 ? "s" : ""} </p>
                </section>

                <section className="game-favourite-icon" onClick={favourite ? () => removeFavouriteById(game.id) : () => addFavourite(game)}>
                    {favourite ? <h2>&#x2764;&#xfe0f;</h2> : <h2>&#9825;</h2>}
                </section>
            </section>
        </section>
    );
}