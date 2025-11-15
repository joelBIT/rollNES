import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { FilterAccordion, GameCard, RangeSlider } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { filteredGames, allCategories, allPlayers, allPublishers, allDevelopers, matchesFilter, addFilter, removeFilter } = useGames();
    const [isShowingRange, setIsShowingRange] = useState(false);
    const [isShowingPlayers, setIsShowingPlayers] = useState(false);
    const [isShowingPublishers, setIsShowingPublishers] = useState(false);
    const [isShowingDevelopers, setIsShowingDevelopers] = useState(false);
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

                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header" onClick={() => setIsShowingPlayers(!isShowingPlayers)}> 
                        <span className={isShowingPlayers ? "rotate-down" : "rotate-up"}> &#94; </span>
                        <h5 className="filter-card-title"> Players </h5>
                    </article>

                    {
                        allPlayers().map(players => 
                            <article className={isShowingPlayers ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={players}>
                                <section className="filter-card-body">
                                    <section className="filter-card-body-data">
                                        <input 
                                            type="checkbox" 
                                            name={`category-${players}`} 
                                            id={`category-${players}`} 
                                            onClick={(e) => (e.target as HTMLInputElement).checked ? addFilter("players", players + "") : removeFilter("players", players + "")} 
                                        />

                                        <h3 className="filter-card-body-data__title"> {players} player{players > 1 ? "s" : ""} </h3>
                                    </section>
                                    
                                    <h3 className="filter-card-body-data__amount"> { matchesFilter("players", players + "") } </h3>
                                </section>
                            </article>
                        )
                    }
                </section>

                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header" onClick={() => setIsShowingPublishers(!isShowingPublishers)}> 
                        <span className={isShowingPublishers ? "rotate-down" : "rotate-up"}> &#94; </span>
                        <h5 className="filter-card-title"> Publisher </h5>
                    </article>

                    {
                        allPublishers().map(publisher => 
                            <article className={isShowingPublishers ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={publisher}>
                                <section className="filter-card-body">
                                    <section className="filter-card-body-data">
                                        <input 
                                            type="checkbox" 
                                            name={`category-${publisher}`} 
                                            id={`category-${publisher}`} 
                                            onClick={(e) => (e.target as HTMLInputElement).checked ? addFilter("publisher", publisher) : removeFilter("publisher", publisher)} 
                                        />

                                        <h3 className="filter-card-body-data__title"> {publisher} </h3>
                                    </section>
                                    
                                    <h3 className="filter-card-body-data__amount"> { matchesFilter("publisher", publisher) } </h3>
                                </section>
                            </article>
                        )
                    }
                </section>

                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header" onClick={() => setIsShowingDevelopers(!isShowingDevelopers)}> 
                        <span className={isShowingDevelopers ? "rotate-down" : "rotate-up"}> &#94; </span>
                        <h5 className="filter-card-title"> Developer </h5>
                    </article>

                    {
                        allDevelopers().map(developer => 
                            <article className={isShowingDevelopers ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={developer}>
                                <section className="filter-card-body">
                                    <section className="filter-card-body-data">
                                        <input 
                                            type="checkbox" 
                                            name={`category-${developer}`} 
                                            id={`category-${developer}`} 
                                            onClick={(e) => (e.target as HTMLInputElement).checked ? addFilter("developer", developer) : removeFilter("developer", developer)} 
                                        />

                                        <h3 className="filter-card-body-data__title"> {developer} </h3>
                                    </section>
                                    
                                    <h3 className="filter-card-body-data__amount"> { matchesFilter("developer", developer) } </h3>
                                </section>
                            </article>
                        )
                    }
                </section>
            </section>

            <section id="games-list">
                {
                    filteredGames?.length > 0 ? filteredGames.slice(0, numberGamesShowing).map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}