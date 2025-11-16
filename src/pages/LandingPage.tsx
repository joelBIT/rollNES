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
                <h2 id="landing-promises__heading"> RollNES Promises </h2>

                <section id="landing-promises-list">
                    <section className="landing-promises">
                        <img src="/response.webp" alt="Fast Response image" />
                        <h2 className="landing-promises-list__heading"> Fast Response Times </h2>
                    </section>

                    <section className="landing-promises">
                        <img src="/warranty.webp" alt="Warranty image" />
                        <h2 className="landing-promises-list__heading"> Two Year Warranty </h2>
                    </section>

                    <section className="landing-promises">
                        <img src="/wishlist.webp" alt="Wishlist image" />
                        <h2 className="landing-promises-list__heading"> Wishlist Achievements </h2>
                    </section>
                </section>
            </section>
        </main>
    )
}