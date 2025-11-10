import type { ReactElement } from "react";

import "./Star.css";

/**
 * The supplied width parameter decides how much the star is filled.
 */
export function Star({width}: {width: number}): ReactElement {

    return (
        <section className="star-rating">
            <span className="empty">☆</span>
            <span className="filled" style={{width:`${width*100}%`}}>★</span>
        </section>
    );
}