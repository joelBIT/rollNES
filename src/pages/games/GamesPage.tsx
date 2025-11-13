import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import { GameCard } from "../../components";

import "./GamesPage.css";

/**
 * Page for filtering playable games. A user can choose how many of the filtered games to show on the page.
 */
export default function GamesPage(): ReactElement {
    const { filteredGames, allCategories, matchesFilter, addFilter, removeFilter } = useGames();
    const [isShowingCategory, setIsShowingCategory] = useState(false);

    return (
        <main id="gamesPage">
            <section id="game-filters-panel">
                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header" onClick={() => setIsShowingCategory(!isShowingCategory)}> 
                        <span className={isShowingCategory ? "rotate-down" : "rotate-up"}> &#94; </span>
                        <h5 className="filter-card-title"> Category </h5>
                    </article>

                    {
                        allCategories().map(category => 
                            <article className={isShowingCategory ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={category}>
                                <section className="filter-card-body">
                                    <section className="filter-card-body-data">
                                        <input 
                                            type="checkbox" 
                                            name={`category-${category}`} 
                                            id={`category-${category}`} 
                                            onClick={(e) => (e.target as HTMLInputElement).checked ? addFilter("category", category) : removeFilter("category", category)} 
                                        />

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
                        <span className="rotate-up">  &#94; </span>
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
                    filteredGames?.length > 0 ? filteredGames.slice(0, 10).map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}