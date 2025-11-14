import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import { subscribeToNewsletterRequest } from "../../requests";
import { URL_RIGHTS_PAGE } from "../../utils";

import "./Newsletter.css";

export function Newsletter(): ReactElement {
    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    /**
     * Show message to indicate if the subscription succeeded or not.
     */
    async function subscribe(formData: FormData) {        
        try {
            await subscribeToNewsletterRequest(formData.get("newsletter-form-email") as string);
        } catch (error: any) {
            console.log(error);
            setIsError(true);
            setMessage(error.message);
            return;
        }
        
        setIsError(false);
        setMessage("Subscription successful");
    }
    
    return (
        <section id="news-letter">
            <section id="news-letter-content">
                <h3 id="news-letter__heading"> Subscribe to the newsletter </h3>
                <p id="news-letter__text"> New games, updates and exclusive goodies directly in your inbox </p>

                {
                    message ? <h2 className={isError ? "message-failure" : "message-success"}> { message }</h2> : <></>
                }

                <form id="newsletter-form" name="newsletter-form" action={subscribe}>
                    <input 
                        id="newsletter-form-email" 
                        name="newsletter-form-email" 
                        placeholder="Enter your email" 
                        autoComplete="off"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit"> Subscribe &rarr; </button>
                </form>

                <section id="newsletter-disclaimer">
                    <p id="newsletter-disclaimer__text"> 
                        Your email address will only be used to send you our newsletter, as well as updates and such. 
                        You can unsubscribe at any time using the link included in the newsletter.
                    </p>

                    <NavLink to={URL_RIGHTS_PAGE}> Learn more about how RollNES manage your data and your rights. </NavLink>
                </section>
            </section>
        </section>
    );
}