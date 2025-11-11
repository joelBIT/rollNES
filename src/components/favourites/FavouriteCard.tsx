import { type ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";
import { useFavourites } from "../../hooks/useFavourites";

import "./FavouriteCard.css";

/**
 * A favourite game. A FavouriteCard represents a game in the FavouriteMenu.
 */
export function FavouriteCard({game, close}: {game: Game, close: () => void}): ReactElement {
    const { removeFavouriteById } = useFavourites();

    return (
        <section className="favourite-card">
            <img 
                className="favourite-card__image" 
                src={COVER_URL + game.cover} 
                alt="Game cover" 
            />

            <section className="favourite-card-details">
                <NavLink 
                    to={URL_GAMES_PAGE + "/" + game.id} 
                    className="favourite-card__title" 
                    onClick={() => close()}
                > 
                    {game.title} 
                </NavLink>

                <h3 className="favourite-card__players"> {game.players} player{game.players > 1 ? "s" : ""} </h3>
                <h2 className="favourite-card__button" onClick={() => removeFavouriteById(game.id)}> Remove </h2>
            </section>
        </section>
    );
}