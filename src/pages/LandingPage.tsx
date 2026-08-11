import { type ReactElement } from "react";
import { useLoaderData, NavLink } from "react-router";
import { GameCarousel, PopularGames } from "../components";
import type { Game } from "../types/types";
import { URL_GAMES_PAGE } from "../utils";

import "./LandingPage.css";

export default function LandingPage(): ReactElement {
    const games = useLoaderData() as Game[];
    
    return (
        <main id="landingPage">
            <section id="game-battletoads">
                <section className="game-battletoads__text">
                    <h2 className="game-battletoads__italic"> New Improved Formula </h2>
                    <h2 className="game-battletoads__heading"> Battletoads & Double Dragon </h2>
                    <p className="game-battletoads__text"> Characters from both series join forces in new adventures. </p>

                    <NavLink className="play-button" to={URL_GAMES_PAGE + "/113"}>
                        Play now
                    </NavLink>
                </section>

                <figure id="game-battletoads__figure">
                    <img src="/ddbattletoads.jpeg" alt="Battletoads and Double Dragon" />
                </figure>
            </section>

            <section className="available-games">
                <h2 className="available-games__heading"> Play NES games </h2>
                <p className="available-games__text">
                    RollNES supports most games released for the NES. Below is a selection of the 
                    fun games playable on the RollNES emulator.
                </p>
            </section>
            
            <GameCarousel />

            <PopularGames games={games} />

            <section id="landing-promises">
                <h2 id="landing-promises__heading"> RollNES Promises </h2>

                <section id="landing-promises-list">
                    <section className="landing-promises">
                        <img src="/response.webp" alt="Fast Response image" />
                        <h2 className="landing-promises-list__heading"> Fast Response Times </h2>
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