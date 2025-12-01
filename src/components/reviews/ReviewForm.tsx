import { useActionState, useEffect, useState, type ReactElement } from "react";
import { useUser } from "../../hooks/useUser";
import { useGames } from "../../hooks/useGames";
import { Rating } from "..";
import { createReviewRequest } from "../../requests";

import "./ReviewForm.css";

/**
 * Form used to create reviews for a game with the supplied gameId.
 */
export function ReviewForm({gameId, updateReviews}: {gameId: number, updateReviews?: () => void}): ReactElement {
    const [ state, formAction ] = useActionState(createReview, null);
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const { user } = useUser();
    const { loadGames } = useGames();
    const [name, setName] = useState<string>((user?.first_name ?? "") + " " + (user?.last_name ?? ""));
    const [title, setTitle] = useState<string>('');
    const [review, setReview] = useState<string>('');

    useEffect(() => {
        resetForm();
    }, [gameId])

    async function createReview(): Promise<void> {
        if (rating === 0) {
            setIsError(true);
            setMessage('You must choose a rating');
            return;
        }

        const newReview = {
            reviewer_name: name,
            heading: title,
            review, 
            rating, 
            game_id: gameId
        }
        
        try {
            await createReviewRequest(newReview);
            resetForm();
            setMessage('Review added');
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            setIsError(true);
            setMessage('Could not create review');
            return;
        }
        
        if (updateReviews) {
            updateReviews();        // Inform parent to update list of reviews with a new review
            console.log(state);
        }

        loadGames();        // Retrieve games from backend to get the most recent version of the games
    }

    function resetForm(): void {
        setIsError(false);
        setRating(0);
        setTitle('');
        setReview('');
        setName((user?.first_name ?? "") + " " + (user?.last_name ?? ""));
        setIsShowing(false);
    }

    function toggleForm(): void {
        if (isShowing) {
            resetForm();
            setMessage('');
            setName((user?.first_name ?? "") + " " + (user?.last_name ?? ""));
        }
        setIsShowing(!isShowing);
    }
    
    return (
        <>
            <button className="retro-button add-review-button" onClick={toggleForm}>
                {
                    isShowing ? 
                        <h2 className="add-review-button-text"> Close Form </h2>
                        :
                        <>
                            <span className="material-symbols-outlined">rate_review</span>
                            <h2 className="add-review-button-text"> Write a Review </h2>
                        </>
                }
            </button>
        
            <form action={formAction} className={isShowing ? "reviewForm review-dropdown" : "reviewForm"}>
                <section className="information-input">
                    <label className="input-label" htmlFor="name">
                        Name
                    </label>

                    <input 
                        id="name"
                        name="name"
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="input-field"
                        autoComplete="off" 
                        required
                    />
                </section>

                <article id="rating-title-section">
                    <section className="information-input rating-input">
                        <span className="input-label">
                            Rating
                        </span>

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
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            className="input-field"
                            autoComplete="off"
                            required
                        />
                    </section>
                </article>

                <section className="information-input">
                    <label className="input-label" htmlFor="review">
                        Review
                    </label>

                    <textarea 
                        id="review" 
                        name="review" 
                        className="input-field"
                        value={review}
                        onChange={e => setReview(e.target.value)} 
                        required 
                    />
                </section>

                <button id="submitButton" className="sendButton">
                    <span> Submit </span>
                </button>
            </form>

            {
                message ? <h2 className={isError ? "message-failure" : "message-success"}> { message }</h2> : <></>
            }
        </>
    );
}