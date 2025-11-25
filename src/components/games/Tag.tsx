import type { ReactElement } from "react";
import type { GameTag } from "../../types/types";

import "./Tag.css";

export function Tag({text, type}: {text: string, type: GameTag}): ReactElement {
    const icons = {
        players: "sports_kabaddi",
        category: "category",
        developer: "code",
        publisher: "corporate_fare"
    }

    return (
        <section className={`tag tag-${type}`} title={type.charAt(0).toUpperCase() + type.slice(1, type.length)}>
            <span className="material-symbols-outlined"> {icons[type]} </span>
            <h2 className="tag-type"> {text} </h2>
        </section>
    );
}