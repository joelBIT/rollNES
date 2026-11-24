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
                <div 
                    className="profile-image profile-initials" 
                    style={{ backgroundColor: `hsl(${getHue(review.reviewer_name)} 45% 35%)` }}
                    aria-hidden="true"
                >
                    {getInitials(review.reviewer_name)}
                </div>

                <section className="reviewer">
                    <h2 className="review-name"> {review.reviewer_name} </h2>
                    <h2 className="review-date"> Reviewed {convertDateToString(review.date)} </h2>
                    { review.reviewer_id ? <h3 className="review-verified"> Member </h3> : <></>}
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

/**
 * The avatar for the moment. TODO: Add avatar possibility in account and show it here if an avatar is uploaded.
 */
function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return "?";
    }

    const first = Array.from(words[0])[0];
    const last = words.length > 1 ? Array.from(words[words.length - 1])[0] : "";
    return (first + last).toUpperCase();
}

/**
 * Generate different background colors for different user initials.
 */
function getHue(name: string): number {
    let hash = 0;
    for (const character of name) {
        hash = (hash * 31 + character.charCodeAt(0)) % 360;
    }
    return hash;
}