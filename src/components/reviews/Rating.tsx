import type { ReactElement } from "react";
import { Star } from "..";

import "./Rating.css";

/**
 * Renders a 5 star rating corresponding to the supplied rating. The return value of the getWidth function decides how much each star is filled.
 * If the setRating function is supplied, a star becomes clickable invoking that function with its rating.
 */
export function Rating({rating, setRating}: {rating: number, setRating?: (rating: number) => void}): ReactElement {
    
    function getWidth(index: number): number {
        return index >= rating ? 0 : Math.min(1, rating - index);
    };

    return (
        <section className="rating">
            {
                Array.from({ length: 5 }).map((_, index) => (
                    setRating ? 
                        <div onClick={() => setRating(index + 1)}> <Star key={index} width={getWidth(index)} /> </div>
                        : 
                        <Star key={index} width={getWidth(index)} />
                    ))
            }
        </section>
    );
}