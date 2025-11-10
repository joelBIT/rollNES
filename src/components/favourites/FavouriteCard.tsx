import { type ReactElement } from "react";
import { NavLink } from "react-router";
import type { Game } from "../../types/types";
import { URL_GAMES_PAGE } from "../../utils";

import "./FavouriteCard.css";

/**
 * A favourite game. A FavouriteCard represents a game in the FavouriteMenu.
 */
export function FavouriteCard({game, close}: {game: Game, close: () => void}): ReactElement {
    const COVER_URL = import.meta.env.VITE_COVER_URL;

    function removeGame(id: number): void {
        console.log(id);
    }

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
    
                <h2 className="favourite-card__button" onClick={() => removeGame(game.id)}> Remove </h2>
            </section>
        </section>
    );
}