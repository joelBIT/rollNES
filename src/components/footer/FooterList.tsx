import type { ReactElement } from "react";
import { NavLink } from "react-router";
import type { FooterLink } from "../../types/types";

import "./FooterList.css";

export function FooterList({heading, links}: {heading: string, links: FooterLink[]}): ReactElement {
    return (
        <section id="footer-list">
            <h1 className="footer-list__heading"> {heading} </h1>

            {
                links.map(link => <NavLink key={link.title} to={link.link} className="footer-list__element"> {link.title} </NavLink>)
            }
        </section>
    );
}