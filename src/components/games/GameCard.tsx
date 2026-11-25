import { type ReactElement } from "react";
import { NavLink } from "react-router";
import { useFavourites } from "../../hooks/useFavourites";
import type { Game } from "../../types/types";
import { COVER_URL, getAverageRating, pluralize, truncateText, URL_GAMES_PAGE } from "../../utils";
import { Cartridge } from "./Cartridge";
import { Rating } from "../reviews/Rating";

import "./GameCard.css";

const DESCRIPTION_MAX_LENGTH = 300;

/**
 * Card used in list of games in /games page. Each game that meets the filter criteria is represented by a GameCard.
 */
export function GameCard({game}: { game: Game}): ReactElement {
    const { addFavourite, isFavourite, removeFavouriteById } = useFavourites();
    const favourite: boolean = isFavourite(game.id);

    return (
        <section className="game-card">
            <img src={COVER_URL + game.cover} className="game-card__background" alt="" aria-hidden="true" />

            <section className="game-card__content">
                <section className="game-image">
                    <Cartridge coverUrl={COVER_URL + game.cover} />
                </section>

                <section className="game-information">
                    <NavLink to={URL_GAMES_PAGE + "/" + game.id} className="game-information__link" title="View game"> 
                        <h2 className="game-information__heading"> {game.title} </h2> 
                    </NavLink>
                    
                    <h2 className="game-information__description"> 
                        {truncateText(game.description ?? "", DESCRIPTION_MAX_LENGTH)}
                    </h2>
                </section>
                
                <section className="game-details">
                    <section className="game-details__reviews">
                        <Rating rating={getAverageRating(game.reviews)} />
                        <p> {pluralize(game.reviews?.length ?? 0, "review")} </p>
                    </section>

                    <section className="game-favourite-icon" onClick={favourite ? () => removeFavouriteById(game.id) : () => addFavourite(game)}>
                        {
                            favourite ? 
                                <h2 className="favourite-heart">&#x2764;&#xfe0f;</h2> 
                                : 
                                <span className="material-symbols-outlined favourite-heart"> favorite </span>
                        }
                    </section>
                </section>
            </section>
        </section>
    );
}