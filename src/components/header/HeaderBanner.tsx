import type { ReactElement } from "react";
import { Carousel } from "./Carousel";

import "./HeaderBanner.css";

/**
 * Sliding banner on top of page containing information about the site.
 */
export function HeaderBanner(): ReactElement {
    return (
        <section id="header-banner">
            <Carousel />
        </section>
    );
}