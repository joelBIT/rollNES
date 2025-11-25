import { useEffect, useState, type ReactElement } from "react";
import { useLoaderData } from "react-router";
import { Emulator, Rating, ReviewList, Tabs } from "../../components";
import { COVER_URL, getAverageRating } from "../../utils";
import type { Game } from "../../types/types";
import { useFavourites } from "../../hooks/useFavourites";

import "./GamePage.css";

/**
 * Page for a game. Shows information about the game as well as reviews. There are two tabs ("Details", "Play") a user can click on.
 * The "Details" tab shows information about the game. The "Play" tab starts the game in the ROllNES emulator. Reviews are only
 * shown in the "Details" tab.
 */
export default function GamePage(): ReactElement {
    const game = useLoaderData() as Game;
    const tabTitles = ["Details", "Play"];
    const [active, setActive] = useState<string>(tabTitles[0]);
    const { addFavourite, isFavourite, removeFavouriteById } = useFavourites();
    const favourite = isFavourite(game.id);

    useEffect(() => {
        setActive(tabTitles[0]);                    // Always show "Details" tab as default when viewing a new game
    }, [game.id])

    return (
        <main id="gamePage">
            <Tabs titles={tabTitles} setActive={setActive} />

            {
                active === tabTitles[0] ? 
                    <>
                        <section id="game-top">
                            <section id="game-images">
                                <img src={COVER_URL + game?.cover} alt="Game cover" />
                            </section>

                            <section id="game-details">
                                <h2 id="game-information__heading"> {game.title} </h2> 

                                <section className="reviews-and-favourite-button">
                                    <article className="game-favourite-icon" onClick={favourite ? () => removeFavouriteById(game.id) : () => addFavourite(game)}>
                                        {favourite ? <h2>&#x2764;&#xfe0f;</h2> : <h2>&#9825;</h2>}
                                    </article>

                                    <section className="game-reviews-summary">
                                        <Rating rating={getAverageRating(game.reviews)} />
                                        <p> {game.reviews?.length} review{game.reviews?.length > 1 || game.reviews?.length === 0 ? "s" : ""} </p>
                                    </section>
                                </section>

                                <h2 id="game-information__description"> 
                                    {game.description} 
                                </h2>
                            </section>
                        </section>

                        <section id="game-bottom">
                            <ReviewList game={game} />
                        </section>
                    </>
                : 
                    <Emulator gameId={game.id} />
            }
        </main>
    );
}