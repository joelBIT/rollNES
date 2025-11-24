import { useActionState, type ReactElement } from "react";

import "./ReviewForm.css";

export function ReviewForm(): ReactElement {
    const [ state, formAction ] = useActionState(() => console.log("sent"),  null);

    console.log(state);
    
    return (
        <form id="reviewForm" action={formAction}>
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

            <section className="information-input">
                <label className="input-label" htmlFor="rating">
                    Rating
                </label>

                <input 
                    id="rating"
                    name="rating"
                    type="text"
                    className={`input-field`}
                    autoComplete="none" 
                />
            </section>

             <section className="information-input">
                <label className="input-label" htmlFor="title">
                    Title
                </label>

                <input 
                    id="title"
                    name="title"
                    type="text"
                    className={`input-field`}
                    autoComplete="none" 
                />
            </section>

            <section className="information-input">
                <label className="input-label" htmlFor="review">
                    Review
                </label>

                    <textarea id="review" name="review" className={`input-field`} required />
            </section>

            <button id="submitButton" className="submitButton" type="submit">
                <span className="submitButton__text"> Submit </span>
            </button>
        </form>
    );
}