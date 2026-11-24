import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { AppliedGameFilter, FilterAccordion, GameCard, RangeSlider } from "../../components";
import type { Game } from "../../types/types";
import { DEFAULT_GAMES_SHOWING } from "../../utils";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { games, filteredGames, loadStatus, allFilterValues, appliedFilters, loadGames } = useGames();
    const [chosenCount, setChosenCount] = useState<number | null>(null);    // null means the user has not used the slider yet
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const total = filteredGames.length;
    const minRange = Math.min(DEFAULT_GAMES_SHOWING, total);                // Minimum 10 games are rendered (or fewer due to chosen filters)
    const numberGamesShowing = Math.max(minRange, Math.min(chosenCount ?? minRange, total));

    return (
        <main id="gamesPage">
            <section id="games-page-header">
                <button 
                    className="retro-button" 
                    onClick={() => setShowFilters(!showFilters)}
                > 
                    {showFilters ? <h2 className="filter-button-text"> Hide filters </h2> : <h2 className="filter-button-text"> Show filters </h2>} 
                </button>
            </section>

            <section className={showFilters ? "game-filters-panel show-filters" : "game-filters-panel hide-filters"}>
                <RangeSlider min={minRange} max={total} value={numberGamesShowing} setSliderValue={setChosenCount} />

                <FilterAccordion title="Category" values={allFilterValues("category")} filterName="category" />

                <FilterAccordion values={allFilterValues("players")} title="Players" filterName="players" />

                <FilterAccordion values={allFilterValues("publisher")} title="Publisher" filterName="publisher" />

                <FilterAccordion values={allFilterValues("developer")} title="Developer" filterName="developer" />
            </section>

            <section id="games-list">
                {
                    appliedFilters?.length === 0 ? <></> : 
                        <section id="applied-filters">
                            <h2 className="applied-filters__title"> 
                                {appliedFilters.length} Applied filter{appliedFilters.length > 1 ? "s" : ""}:
                            </h2>

                            <section className="applied-filters__list">
                                {
                                    appliedFilters.map(filter => <AppliedGameFilter filter={filter} key={filter.type + filter.value} />)
                                }
                            </section>
                        </section>
                }
                    
                {
                    loadStatus === "loading" ?
                        <p className="games-status"> Loading games... </p>
                    : loadStatus === "error" ?
                        <section className="games-status">
                            <h2 className="message-failure"> Could not load games </h2>
                            <button className="retro-button" onClick={() => loadGames()}> Try again </button>
                        </section>
                    : games.length === 0 ?
                        <p className="games-status"> No games are available yet. </p>
                    : filteredGames.length === 0 ?
                        <p className="no-games-text"> No games match the selected filters. </p>
                    :
                        filteredGames.slice(0, numberGamesShowing).map((game: Game) => <GameCard key={game.id} game={game} />)
                }
            </section>
        </main>
    );
}