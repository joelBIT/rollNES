import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { FilterAccordion, GameCard, RangeSlider } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { filteredGames, allCategories, allPlayers, allPublishers, allDevelopers } = useGames();
    const [isShowingRange, setIsShowingRange] = useState(false);
    const [minRange] = useState<number>(filteredGames?.length > 10 ? 10 : filteredGames.length);     // Minimum 10 games are rendered on the page (or fewer due to chosen filters)
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(minRange);

    return (
        <main id="gamesPage">
            <section id="game-filters-panel">
                <FilterAccordion title="Category" values={allCategories()} filterName="category" />

                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header" onClick={() => setIsShowingRange(!isShowingRange)}> 
                        <span className={isShowingRange ? "rotate-down" : "rotate-up"}> &#94; </span>
                        <h5 className="filter-card-title"> Result Range </h5>
                    </article>

                    <article className={isShowingRange ? "filter-card-collapsible dropdown" : "filter-card-collapsible"}>
                        <section className="filter-card-body">
                            <RangeSlider min={minRange} max={filteredGames.length} setSliderValue={setNumberGamesShowing} />
                        </section>
                    </article>
                </section>

                <FilterAccordion values={allPlayers()} title={"Players"} filterName={"players"} />

                <FilterAccordion values={allPublishers()} title={"Publisher"} filterName={"publisher"} />

                <FilterAccordion values={allDevelopers()} title={"Developer"} filterName={"developer"} />
            </section>

            <section id="games-list">
                {
                    filteredGames?.length > 0 ? filteredGames.slice(0, numberGamesShowing).map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}