import type { ReactElement } from "react";
import { NavLink } from "react-router";
import { URL_RIGHTS_PAGE } from "../../utils";

import "./Newsletter.css";

export function Newsletter(): ReactElement {
    return (
        <section id="news-letter">
            <section id="news-letter-content">
                <h3 id="news-letter__heading"> Subscribe to the newsletter </h3>
                <p id="news-letter__text"> New games, updates and exclusive goodies directly in your inbox </p>

                <form id="newsletter-form" name="newsletter-form" method="POST">
                    <input id="newsletter-form-email" name="newsletter-form-email" placeholder="Enter your email" type="email" />

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