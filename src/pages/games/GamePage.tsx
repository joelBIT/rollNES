import { useEffect, useState, type ReactElement } from "react";
import { useLoaderData } from "react-router";
import { useFavourites } from "../../hooks/useFavourites";
import { Cartridge, ControllerTab, Emulator, Rating, ReviewList, Tabs, Tag } from "../../components";
import { convertDateToString, COVER_URL, getAverageRating } from "../../utils";
import type { Game, Review } from "../../types/types";

import "./GamePage.css";

/**
 * Page for a game. Shows information about the game as well as reviews. There are two tabs ("Details", "Play") a user can click on.
 * The "Details" tab shows information about the game. The "Play" tab starts the game in the ROllNES emulator. Reviews are only
 * shown in the "Details" tab.
 */
export default function GamePage(): ReactElement {
    const game = useLoaderData() as Game;
    const tabTitles = ["Details", "Play", "Controller"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const [reviews, setReviews] = useState<Review[]>(game.reviews);
    const { addFavourite, isFavourite, removeFavouriteById } = useFavourites();
    const favourite = isFavourite(game.id);

    useEffect(() => {
        setActive(tabTitles[0]);                    // Always show "Details" tab as default when viewing a new game
    }, [game.id])

    /**
     * Update current list of reviews when a new review has been created.
     */
    async function updateReviews(updatedReviews: Review[]): Promise<void> {
        setReviews([...updatedReviews]);
        setActive(tabTitles[0]); 
    }

    return (
        <main id="gamePage">
            <Tabs titles={tabTitles} active={active} setActive={setActive} />

            {
                active === tabTitles[1] ? 
                    <Emulator gameId={game.id} />
                    :
                active === tabTitles[2] ? 
                    <ControllerTab /> 
                    :
                <>
                    <section id="game-top">
                        <section id="game-details">
                            <div className="header-stripe"></div>
                            <Cartridge coverUrl={COVER_URL + game?.cover} />

                            <section className="game-details-content">
                                <div>
                                    <p className="kicker">NES · ACTION-ADVENTURE</p>
                                    <h1 className="game-title">{game.title} </h1>
                                    <p className="game-information__creators">
                                        Published by {game.publisher}, developed by {game.developer}.
                                    </p>
                                </div>

                                <section className="score-row">
                                    <section className="review-section">
                                        <div className="score-badge">
                                            <span className="num">{getAverageRating(reviews)}</span>
                                            <span className="denom">/ 5</span>
                                        </div>

                                        <div>
                                            <Rating rating={getAverageRating(reviews)} />
                                            <p className="review-count">Based on {reviews?.length} player review{reviews?.length > 1 || reviews?.length === 0 ? "s" : ""}</p>
                                        </div>
                                    </section>

                                    <article 
                                        className="game-favourite-icon" 
                                        title="Add as favourite"
                                        onClick={favourite ? () => removeFavouriteById(game.id) : () => addFavourite(game)}
                                    >
                                        {favourite ? <h2>&#x2764;&#xfe0f;</h2> : <span className="material-symbols-outlined"> favorite </span>}
                                    </article>  
                                </section>

                                <section className="tags">
                                    <Tag text={game.players > 1 ? `${game.players} players` : game.players + " player"} />
                                    <Tag text={convertDateToString(new Date(game.release_date))} />
                                </section>
                            </section>
                        </section>

                        <p id="game-information__description">
                            {game.description}
                        </p>
                        
                    </section>

                    <section id="game-bottom">
                        <ReviewList game={game} setReviews={updateReviews} />
                    </section>
                </>
            }
        </main>
    );
}