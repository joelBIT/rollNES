import type { ReactElement } from "react";
import type { Review } from "../../types/types";
import { Rating } from "..";
import { convertDateToString } from "../../utils";

import "./ReviewCard.css";

/**
 * TODO: Add profile image to Review so that the img element uses the profile image if user is logged in when creating the review, or
 * use the default profile image if the review is created by someone who is not signed in.
 */
export function ReviewCard({review}: {review: Review}): ReactElement {

    return (
        <section className="review-card">
            <section className="review-top">
                <img src="/github.svg" alt="Profile image" className="profile-image" />

                <section className="reviewer">
                    <h2 className="review-name"> {review.reviewer_name} </h2>
                    <h2 className="review-date"> Reviewed {convertDateToString(new Date(review.date))} </h2>
                    { review.reviewer_id ? <h3 className="review-verified"> Verified User </h3> : <></>}
                </section>

                <Rating rating={review.rating} />
            </section>
            
            <section className="review-content">
                <h2 className="review-heading">{review.heading} </h2>
                <h2 className="review-text">{review.review} </h2>
            </section>
        </section>
    );
}