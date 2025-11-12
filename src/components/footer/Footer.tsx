import type { ReactElement } from "react";
import { Link, NavLink } from "react-router";
import { Newsletter } from "./Newsletter";
import { FooterList } from "./FooterList";
import { Divider } from "./Divider";
import { URL_COMPANY_PAGE, URL_CONTACT_PAGE, URL_HELP_CENTER_PAGE, URL_PRIVACY_PAGE, URL_TEAM_PAGE, URL_TERMS_PAGE, URL_VISION_PAGE } from "../../utils";

import "./Footer.css";

export function Footer(): ReactElement {

    const RESOURCE_LINKS = [
        {title: "Help Center", link: URL_HELP_CENTER_PAGE}
    ]

    const ABOUT_LINKS = [
        {title: "RollNES", link: URL_COMPANY_PAGE},
        {title: "Team", link: URL_TEAM_PAGE},
        {title: "Vision", link: URL_VISION_PAGE},
        {title: "Contact", link: URL_CONTACT_PAGE}
    ]

    return (
        <footer>
            <Divider />
            <Newsletter />
            <Divider />

            <section id="footer-list-links">
                <FooterList heading="resources" links={RESOURCE_LINKS} />
                <FooterList heading="about" links={ABOUT_LINKS} />
            </section>

            <section id="footer-contact">
                    <span className="material-symbols-outlined"> stacked_email </span>
                    <Link to="mailto:contact@joel-rollny.eu" className="contact__email"> contact@joel-rollny.eu </Link>
            </section>

            <section id="footer-copyright">
                <p id="footer-copyright__links"> &#169; 2025 Joel Rollny Design	&#8729; <NavLink to={URL_TERMS_PAGE}>Terms</NavLink> &#8729; <NavLink to={URL_PRIVACY_PAGE}>Privacy</NavLink> </p>

                <section id="footer-social-media">
                    <Link to={"https://www.linkedin.com/in/joel-rollny-1b517330a/"} target="_blank">
                        <img src="/linkedin.svg" className="linkedin" alt="linkedin icon" title="https://www.linkedin.com/in/joel-rollny-1b517330a/" />
                    </Link>

                    <Link to={"https://github.com/joelbit"} target="_blank">
                        <img src="/github.svg" className="github" alt="github icon" title="https://github.com/joelbit" />
                    </Link>

                    <Link to="mailto:contact@joel-rollny.eu" target="_blank">
                        <img src="/mail.svg" className="email" alt="email icon" title="mailto:contact@joel-rollny.eu" />
                    </Link>
                </section>
            </section>
        </footer>
    )
}