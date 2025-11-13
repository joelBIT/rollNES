import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import type { Game } from "../../types/types";
import { GameCard } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games.
 */
export default function GamesPage(): ReactElement {
    const { games, allCategories, matchesFilter } = useGames();
    const [ filteredGames ] = useState<Game[]>(games.slice(0, 10));

    return (
        <main id="gamesPage">
            <section id="game-filters-panel">
                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header"> 
                        <img src="/caret-down.svg" className="filter-card-header__caret" />
                        <h5 className="filter-card-title"> Category </h5>
                    </article>

                    {
                        allCategories().map(category => 
                            <article className="filter-card-collapsible">
                                <section className="filter-card-body">
                                    <section className="filter-card-body-data">
                                        <input type="checkbox" name={`category-${category}`} id={`category-${category}`} />
                                        <h3 className="filter-card-body-data__title"> {category} </h3>
                                    </section>
                                    
                                    <h3 className="filter-card-body-data__amount"> { matchesFilter("category", category) } </h3>
                                </section>
                            </article>
                        )
                    }
                </section>

                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header"> 
                        <img src="/caret-down.svg" className="filter-card-header__caret" />
                        <h5 className="filter-card-title"> Result Range </h5>
                    </article>

                    <article className="filter-card-collapsible">
                        <section className="filter-card-body">
                            <section className="filter-card-body-data">
                                
                            </section>
                        </section>
                    </article>
                </section>

                <section className="game-filters-panel__players-accordion">
                    
                </section>

                <section className="game-filters-panel__publisher-accordion">
                    
                </section>

                <section className="game-filters-panel__developer-accordion">
                    
                </section>
            </section>

            <section id="games-list">
                {
                    filteredGames?.length > 0 ? filteredGames.map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}