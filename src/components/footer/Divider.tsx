import type { ReactElement } from "react";

import "./Divider.css";

export function Divider(): ReactElement {
    return (
        <section className="divider-dark">
            <div className="divider-row">
                <div className="divider-line"></div>
            </div>
        </section>
    );
}