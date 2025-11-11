import type { ReactElement } from "react";

import "./VisionPage.css";

export default function VisionPage(): ReactElement {
    return (
        <main id="visionPage">
            <section className="vision-content">
                <h1 id="vision__heading"> The RollNES mission is to bring the past to the presence. </h1>

                <p id="vision__text">
                    Our vision is to be the go-to source for retro 8-bit games: a place where anyone can sell,
                    buy, or be a part of a 24/7 retro entertainment community. No matter where or who you are,
                    our platform welcomes you, enabling real-time interaction and connection
                    between retro lovers.
                </p>
            </section>
        </main>
    );
}