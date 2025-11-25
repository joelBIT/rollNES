import { useActionState, useState, type ReactElement } from "react";
import { Rating } from "..";

import "./ReviewForm.css";

export function ReviewForm(): ReactElement {
    const [ state, formAction ] = useActionState(createReview,  null);
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);

    function createReview(): void {
        // call supabase
        console.log("SUBMIT");
        setIsShowing(false);
        console.log(state);
    }
    
    return (
        <>
            <button 
                className="retro-button add-review-button"
                onClick={() => setIsShowing(true)} 
                disabled={isShowing}
            >
                <span className="material-symbols-outlined">rate_review</span>
                <h2 className="add-review-button-text"> Write a Review </h2>
            </button>
        
            <form action={formAction} className={isShowing ? "reviewForm dropdown" : "reviewForm"}>
                <article id="name-email-section">
                    <section className="information-input">
                        <label className="input-label" htmlFor="name">
                            Name
                        </label>

                        <input 
                            id="name"
                            name="name"
                            type="text"
                            className={`input-field`}
                            autoComplete="none" 
                        />
                    </section>

                    <section className="information-input">
                        <label className="input-label" htmlFor="email">
                            Email
                        </label>

                        <input 
                            id="email"
                            name="email" 
                            type="email"
                            className={`input-field`}
                            autoComplete="off" 
                            required 
                        />
                    </section>
                </article>

                <article id="rating-title-section">
                    <section className="information-input rating-input">
                        <label className="input-label" htmlFor="rating">
                            Rating
                        </label>

                        <Rating rating={rating} setRating={setRating}/>
                    </section>

                    <section className="information-input">
                        <label className="input-label" htmlFor="title">
                            Title of Review
                        </label>

                        <input 
                            id="title"
                            name="title"
                            type="text"
                            className={`input-field`}
                            autoComplete="none" 
                        />
                    </section>
                </article>

                <section className="information-input">
                    <label className="input-label" htmlFor="review">
                        Review
                    </label>

                        <textarea id="review" name="review"  className={`input-field`} required />
                </section>

                <button id="submitButton" className="sendButton" type="submit">
                    <span> Submit </span>
                </button>
            </form>
        </>
    );
}