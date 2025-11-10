import type { ReactElement } from "react";
import { Star } from "..";

import "./Rating.css";

/**
 * Renders a 5 star rating corresponding to the supplied rating. The return value of the getWidth function decides how much each star is filled.
 */
export function Rating({rating}: {rating: number}): ReactElement {
    
    function getWidth(index: number): number {
        return index >= rating ? 0 : Math.min(1, rating - index);
    };

    return (
        <section className="rating">
            {
                Array.from({ length: 5 }).map((_, index) => (<Star key={index} width={getWidth(index)} />))
            }
        </section>
    );
}