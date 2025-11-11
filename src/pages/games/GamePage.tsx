import { useState, type ReactElement } from "react";
import { useLoaderData } from "react-router";
import { getAverageRating } from "../../utils";
import type { Game, Review } from "../../types/types";
import { Rating, ReviewCard } from "..";

import "./GamePage.css";

export default function GamePage(): ReactElement {
    const game = useLoaderData() as Game;
    const [sortedReviews, setSortedReviews] = useState<Review[]>(game.reviews ?? []);
    const COVER_URL = import.meta.env.VITE_COVER_URL;

    /**
     * Sort reviews according to selected option.
     */
    function sortReviews(sort: string): void {
        const reviewsToSort = [...sortedReviews];
        if (sort === "name") {
            const sorted = reviewsToSort.sort((a, b) => a.reviewer_name.localeCompare(b.reviewer_name));
            setSortedReviews(sorted);
        } else if (sort === "date") {
            const sorted = reviewsToSort.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1);
            setSortedReviews(sorted);
        }
    }

    return (
        <main id="gamePage">
            <section id="game-top">
                <section id="game-images">
                    <img src={COVER_URL + game?.cover} alt="Game cover" />
                </section>

                <section id="game-details">
                    <h2 id="game-information__heading"> {game.title} </h2> 

                    <button className="retro-button">
                        Add to Favourites
                    </button>

                    <section id="game-reviews">

                    </section>

                    <h2 id="game-information__description"> 
                        {game.description} 
                    </h2>
                </section>
            </section>
            
            <section id="game-bottom">
                <section id="game-reviews">
                    <h2 id="game-reviews__heading"> Reviews </h2>

                    <section id="reviews-content">
                        
                        <section id="reviews-rating"> 
                            <Rating rating={getAverageRating(game.reviews)} /> | 
                            <p>Based on {game.reviews?.length} reviews</p> 
                        </section>

                        {
                            game.reviews?.length > 0 ? 
                                <section id="reviews-sort">
                                    <label id="reviews-sort-label" htmlFor="reviews-sort-select"> Sort by: </label> 
                                    <select id="reviews-sort-select" name="reviews-sort-select" onChange={e => sortReviews(e.target.value)}>
                                        <option value="none" defaultChecked> ------ </option>
                                        <option value="name"> Name </option>
                                        <option value="date"> Newest </option>
                                    </select>
                                </section> : <></>
                        }

                        <section id="reviews">
                            {
                                sortedReviews.map((review, i) => <ReviewCard key={i} review={review} />)
                            }
                        </section>
                    </section>
                </section>
            </section>
        </main>
    );
}