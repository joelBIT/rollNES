import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { FilterAccordion, GameCard, SliderAccordion } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { filteredGames, allFilterValues } = useGames();
    const [minRange] = useState<number>(filteredGames?.length > 10 ? 10 : filteredGames.length);     // Minimum 10 games are rendered on the page (or fewer due to chosen filters)
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(minRange);

    return (
        <main id="gamesPage">
            <section id="game-filters-panel">
                <FilterAccordion title="Category" values={allFilterValues("category")} filterName="category" />

                <SliderAccordion title="Result Range" setValue={setNumberGamesShowing} min={minRange} max={filteredGames.length}/>

                <FilterAccordion values={allFilterValues("players")} title={"Players"} filterName={"players"} />

                <FilterAccordion values={allFilterValues("publisher")} title={"Publisher"} filterName={"publisher"} />

                <FilterAccordion values={allFilterValues("developer")} title={"Developer"} filterName={"developer"} />
            </section>

            <section id="games-list">
                {
                    filteredGames?.length > 0 ? filteredGames.slice(0, numberGamesShowing).map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}