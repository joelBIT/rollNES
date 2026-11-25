import { useMemo, useState, type ReactElement } from "react";
import type { Review, SortOrder } from "../../types/types";
import { getAverageRating, pluralize } from "../../utils";
import { Rating } from "./Rating";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { getReviewsByGameIdRequest } from "../../requests";
import { reportError } from "../../errors";

import "./ReviewList.css";

/**
 * Creates a list of reviews for the supplied game, where it is possible to sort the list by 'name' or date.
 * The optional setReviews function is used to send the updated list of reviews to the parent.
 */
export function ReviewList({gameId, reviews, setReviews}: {gameId: number, reviews: Review[], setReviews: (reviews: Review[]) => void}): ReactElement {
    const [sortOrder, setSortOrder] = useState<SortOrder>("oldest");
    const sortedReviews = useMemo(() => sortReviews(reviews, sortOrder), [reviews, sortOrder]);

    /**
     * Sort reviews according to selected option.
     */
    function sortReviews(reviews: Review[], order: SortOrder): Review[] {
        const sorted = [...reviews];

        switch (order) {
            case "name":
                return sorted.sort((a, b) => a.reviewer_name.localeCompare(b.reviewer_name));
            case "newest":
                return sorted.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
            default:
                return sorted.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        }
    }

    /**
     * Retrieve the current reviews after a new review has been created.
     */
    async function refreshReviews(): Promise<void> {
        try {
            setReviews(await getReviewsByGameIdRequest(gameId));
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <section id="reviews-list">
            <h2 id="reviews-list__heading"> Reviews </h2>

            <section id="reviews-content">
                <section id="reviews-rating"> 
                    <Rating rating={getAverageRating(sortedReviews)} />
                    <p className="reviews-border"></p>
                    <p className="rating-text">Based on {pluralize(reviews.length, "review")}</p>
                </section>

                <ReviewForm gameId={gameId} updateReviews={refreshReviews} />

                {
                    reviews.length > 0 ? 
                    <>
                        <section id="reviews-sort">
                            <label id="reviews-sort-label" htmlFor="reviews-sort-select"> Sort by </label> 
                            <select 
                                id="reviews-sort-select" 
                                name="reviews-sort-select" 
                                value={sortOrder} 
                                onChange={e => setSortOrder(e.target.value as SortOrder)}
                            >
                                <optgroup className="reviews-sort-select__options">
                                    <option value="oldest"> Oldest </option>
                                    <option value="name"> Name </option>
                                    <option value="newest"> Newest </option>
                                </optgroup>
                            </select>
                        </section>
                        
                        <section id="reviews">
                            {
                                sortedReviews.map((review: Review) => <ReviewCard key={review.id} review={review} />)
                            }
                        </section>
                    </>
                    : <></>
                }
                
            </section>
        </section>
    )
}