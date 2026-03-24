import type { ReactElement } from "react";

import "./Tag.css";

export function Tag({text}: {text: string}): ReactElement {

    return (
        <section className="tag">
            <p className="tag-text"> {text} </p>
        </section>
    );
}