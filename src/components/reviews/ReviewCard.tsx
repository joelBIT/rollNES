import type { ReactElement } from "react";
import type { Review } from "../../types/types";
import { Rating } from "..";

import "./ReviewCard.css";

export function ReviewCard({review}: {review: Review}): ReactElement {

    function convertDate(date: string): string {
        return new Date(date).toDateString();
    }

    return (
        <section className="review-card">
            <section className="reviewer">
                <h2 className="review-name"> {review.reviewer_name} </h2>
                <h2 className="review-date"> {convertDate(review.date)} </h2>
                { review.reviewer_id ? <h3 className="review-verified"> Verified User </h3> : <></>}
            </section>
            
            <section className="review-content">
                <Rating rating={review.rating} />

                <h2 className="review-heading"> {review.heading} </h2>
                <h2 className="review-text"> {review.review} </h2>
            </section>
        </section>
    );
}