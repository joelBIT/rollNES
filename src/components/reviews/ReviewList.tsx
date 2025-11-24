import { useEffect, useState, type ReactElement } from "react";
import type { Review } from "../../types/types";
import { getAverageRating } from "../../utils";
import { Rating, ReviewCard } from "..";

import "./ReviewList.css";

/**
 * Creates a list of reviews, where it is possible to sort the list by 'name' or 'date'.
 */
export function ReviewList({reviews}: {reviews: Review[]}): ReactElement {
    const [sortedReviews, setSortedReviews] = useState<Review[]>([...reviews]);

    useEffect(() => {
        setSortedReviews([...reviews]);
    }, [reviews])

    /**
     * Sort reviews according to selected option.
     */
    function sortReviews(sort: string): void {
        const reviewsToSort = [...sortedReviews];

        if (sort === "name") {
            const sorted = reviewsToSort.sort((a, b) => a.reviewer_name.localeCompare(b.reviewer_name));
            setSortedReviews([...sorted]);
        } else if (sort === "date") {
            const sorted = reviewsToSort.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1);
            setSortedReviews([...sorted]);
        } else if (sort === "oldest") {
            const sorted = reviewsToSort.sort((a, b) => (Date.parse(a.date) < Date.parse(b.date)) ? -1 : 1);
            setSortedReviews([...sorted]);
        }
    }

    return (
        <section id="reviews-list">
            <h2 id="reviews-list__heading"> Reviews </h2>

            <section id="reviews-content">
                
                <section id="reviews-rating"> 
                    <Rating rating={getAverageRating(sortedReviews)} />
                    <p className="reviews-border"></p>
                    <p>Based on {sortedReviews.length} reviews</p> 
                </section>

                {
                    sortedReviews.length > 0 ? 
                    <>
                        <section id="reviews-sort">
                            <label id="reviews-sort-label" htmlFor="reviews-sort-select"> Sort by: </label> 
                            <select id="reviews-sort-select" name="reviews-sort-select" onChange={e => sortReviews(e.target.value)}>
                                <optgroup className="reviews-sort-select__options">
                                    <option value="oldest" defaultChecked> Oldest </option>
                                    <option value="name"> Name </option>
                                    <option value="date"> Newest </option>
                                </optgroup>
                            </select>
                        </section>
                        
                        <section id="reviews">
                            {
                                sortedReviews.map((review, i) => <ReviewCard key={i} review={review} />)
                            }
                        </section>
                    </>
                        
                    : <></>
                }
                
            </section>
        </section>
    )
}