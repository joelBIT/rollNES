import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { AppliedFilter, FilterAccordion, GameCard, SliderAccordion } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { filteredGames, allFilterValues, appliedFilters } = useGames();
    const [minRange] = useState<number>(filteredGames?.length > 10 ? 10 : filteredGames.length);     // Minimum 10 games are rendered on the page (or fewer due to chosen filters)
    const [numberGamesShowing, setNumberGamesShowing] = useState<number>(minRange);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    return (
        <main id="gamesPage">
            <section id="games-page-header">
                <button className="retro-button" onClick={() => setShowFilters(!showFilters)}> {showFilters ? <h2> Hide filters </h2> : <h2> Show filters </h2>} </button>
            </section>

            <section className={showFilters ? "game-filters-panel show-filters" : "game-filters-panel hide-filters"}>
                <FilterAccordion title="Category" values={allFilterValues("category")} filterName="category" />

                <SliderAccordion title="Result Range" setValue={setNumberGamesShowing} min={minRange} max={filteredGames.length}/>

                <FilterAccordion values={allFilterValues("players")} title="Players" filterName="players" />

                <FilterAccordion values={allFilterValues("publisher")} title="Publisher" filterName="publisher" />

                <FilterAccordion values={allFilterValues("developer")} title="Developer" filterName="developer" />
            </section>

            <section id="games-list">
                {
                    appliedFilters.length === 0 ? <></> : 
                        <section id="applied-filters">
                            <h2 className="applied-filters__title"> 
                                {appliedFilters.length} Applied filter{appliedFilters.length > 1 ? "s" : ""}:
                            </h2>

                            <section className="applied-filters__list">
                                {
                                    appliedFilters.map(filter => <AppliedFilter filter={filter} key={filter.type + filter.value} />)
                                }
                            </section>
                        </section>
                }

                {
                    filteredGames?.length > 0 ? filteredGames.slice(0, numberGamesShowing).map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}