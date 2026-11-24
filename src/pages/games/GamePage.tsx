import { lazy, Suspense, useState, type ReactElement } from "react";
import { useLoaderData } from "react-router";
import { useFavourites } from "../../hooks/useFavourites";
import { Cartridge, ControllerTab, Rating, ReviewList, Tabs, Tag } from "../../components";
import { convertDateToString, COVER_URL, getAverageRating, pluralize } from "../../utils";
import type { Game, Review } from "../../types/types";

import "./GamePage.css";

const Emulator = lazy(() => import("../../components/games/Emulator").then(module => ({ default: module.Emulator })));

/**
 * Page for a game. The key makes React create a fresh GameView for every game, so the active tab and the reviews
 * always start from the loaded game, with no effects needed to reset them.
 */
export default function GamePage(): ReactElement {
    const game = useLoaderData() as Game;
    return <GameView key={game.id} game={game} />;
}

/**
 * Shows information about the game as well as reviews. There are three tabs ("Details", "Play", "Controller") a user can click on.
 * Reviews are only shown in the "Details" tab.
 */
function GameView({game}: {game: Game}): ReactElement {
    const tabTitles = ["Details", "Play", "Controller"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const [reviews, setReviews] = useState<Review[]>(game.reviews);
    const { addFavourite, isFavourite, removeFavouriteById } = useFavourites();
    const favourite = isFavourite(game.id);
    const average = getAverageRating(reviews);

    return (
        <main id="gamePage">
            <Tabs titles={tabTitles} active={active} setActive={setActive} />

            {
                active === tabTitles[1] ? 
                    <Suspense fallback={<p className="loading-text"> Loading emulator... </p>}>
                        <Emulator gameId={game.id} />
                    </Suspense>
                    :
                active === tabTitles[2] ? 
                    <ControllerTab /> 
                    :
                <>
                    <section id="game-top">
                        <section id="game-details">
                            <Cartridge coverUrl={COVER_URL + game?.cover} />

                            <section className="game-details-content">
                                <div>
                                    <p className="kicker">NES · {game.category}</p>
                                    <h1 className="game-title">{game.title} </h1>
                                    <p className="game-information__creators">
                                        Published by {game.publisher}, developed by {game.developer}.
                                    </p>
                                </div>

                                <section className="score-row">
                                    <div className="score-badge">
                                        <span className="num">{reviews.length > 0 ? average.toFixed(1) : "–"}</span>
                                        <span className="denom">/ 5</span>
                                    </div>

                                    <div className="rating-content">
                                        <Rating rating={average} />
                                        <p className="review-count">Based on {pluralize(reviews.length, "player review")}</p>
                                    </div>
                                </section>

                                <section className="bottom-section">
                                    <section className="tags">
                                        <Tag text={game.players > 1 ? `${game.players} players` : game.players + " player"} />
                                        <Tag text={convertDateToString(game.release_date)} />
                                    </section>

                                    <article 
                                        className="game-favourite-icon" 
                                        title="Add as favourite"
                                        onClick={favourite ? () => removeFavouriteById(game.id) : () => addFavourite(game)}
                                    >
                                        {favourite ? <h2>&#x2764;&#xfe0f;</h2> : <span className="material-symbols-outlined"> favorite </span>}
                                    </article> 
                                </section>
                            </section>
                        </section>

                        <section className="game-description">
                            <h2 className="description-heading">DESCRIPTION</h2>
                            <p className="description-text">
                                {game.description}
                            </p>
                        </section>
                        
                    </section>

                    <section id="game-bottom">
                        <ReviewList gameId={game.id} reviews={reviews} setReviews={setReviews} />
                    </section>
                </>
            }
        </main>
    );
}