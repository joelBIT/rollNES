import type { ReactElement } from "react";
import { NavLink } from "react-router";
import { Newsletter } from "./Newsletter";
import { FooterList } from "./FooterList";
import { Divider } from "./Divider";
import { URL_COMPANY_PAGE, URL_CONTACT_PAGE, URL_HELP_CENTER_PAGE, URL_PRIVACY_PAGE, URL_TEAM_PAGE, URL_TERMS_PAGE, URL_VISION_PAGE } from "../../utils";
import type { FooterLink } from "../../types/types";

import "./Footer.css";

export function Footer(): ReactElement {

    const RESOURCE_LINKS: FooterLink[] = [
        {title: "Help Center", link: URL_HELP_CENTER_PAGE}
    ]

    const ABOUT_LINKS: FooterLink[] = [
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

            <section id="footer-copyright">
                <p id="footer-copyright__links"> 
                    &#169; {new Date().getFullYear()} Joel Rollny &#8729; <NavLink to={URL_TERMS_PAGE}>Terms</NavLink> &#8729; <NavLink to={URL_PRIVACY_PAGE}>Privacy</NavLink> 
                </p>

                <section id="footer-social-media">
                    <a href={"https://www.linkedin.com/in/joel-rollny-1b517330a/"} target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.svg" className="linkedin" alt="LinkedIn" title="https://www.linkedin.com/in/joel-rollny-1b517330a/" />
                    </a>

                    <a href={"https://github.com/joelbit"} target="_blank" rel="noopener noreferrer">
                        <img src="/github.svg" className="github" alt="GitHub" title="https://github.com/joelbit" />
                    </a>

                    <a href="mailto:contact@joel-rollny.eu">
                        <img src="/mail.svg" className="email" alt="Email" title="mailto:contact@joel-rollny.eu" />
                    </a>
                </section>
            </section>
        </footer>
    )
}