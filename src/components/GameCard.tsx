import { type ReactElement } from "react";
import { NavLink } from "react-router";
import { useFavourites } from "../hooks/useFavourites";
import type { Game } from "../types/types";
import { COVER_URL, getAverageRating, URL_GAME_PAGE } from "../utils";
import { Rating } from ".";

import "./GameCard.css";

export function GameCard({game}: { game: Game}): ReactElement {
    const { addFavourite } = useFavourites();


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
                    {game.description.substring(0, 300)}{game.description.length > 300 ? "..." : ""} 
                </h2>
            </section>
            
            <section className="game-details">
                <section className="game-details__reviews">
                    <Rating rating={getAverageRating(game.reviews)} />
                    <p> {game.reviews?.length} review{game.reviews?.length > 1 || game.reviews?.length === 0 ? "s" : ""} </p>
                </section>

                <button className="retro-button" onClick={() => addFavourite(game)}>
                    Add Favourite
                </button>
            </section>
        </section>
    );
}