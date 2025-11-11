import { type ReactElement } from "react";
import { useLoaderData } from "react-router";
import {LandingSlider, PopularGameCard} from "../components";
import type { Game } from "../types/types";

import "./LandingPage.css";

export default function LandingPage(): ReactElement {
    const games = useLoaderData() as Game[];
    
    return (
        <main id="landingPage">
            <LandingSlider />

            <section id="landing-popular">
                <h2 id="landing-popular__heading"> Most Played </h2>

                <section id="landing-popular-list">
                    {
                        games.map(game => <PopularGameCard key={game.title} game={game} />)
                    }
                </section>
            </section>

            <section id="landing-promises">
                <h2 id="landing-promises__heading"> Our Promises </h2>

                <section id="landing-promises-list">
                    <section id="landing-promises-shipping">
                        <img src="/shipping.webp" alt="Shipping image" />
                        <h2 className="landing-promises-list__heading"> Free Shipping Over $50 </h2>
                    </section>

                    <section id="landing-promises-warranty">
                        <img src="/warranty.webp" alt="Warranty image" />
                        <h2 className="landing-promises-list__heading"> Two Year Warranty </h2>
                    </section>

                    <section id="landing-promises-return">
                        <img src="/returns.webp" alt="Return products image" />
                        <h2 className="landing-promises-list__heading"> Easy Returns </h2>
                    </section>
                </section>
            </section>
        </main>
    )
}