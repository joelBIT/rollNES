import { useEffect, useState, type ReactElement } from "react";
import { useSearchParams } from "react-router";
import { useGames } from "../../hooks/useGames";
import type { Game } from "../../types/types";
import { GameCard } from "../../components";

import "./GamesPage.css";

export default function GamesPage(): ReactElement {
    const { games } = useGames();
    const [ searchParams ] = useSearchParams();
    const category = searchParams.get("category") as string;
    const [ filteredGames, setFilteredGames ] = useState<Game[]>(games.slice(0, 10));
    const [ activeCategory, setActiveCategory ] = useState<string>(category ? category : "");

    useEffect(() => {
        if (activeCategory) {
            filterGames(activeCategory);     // Set category if an existing category is supplied as query param
        }
    }, [])

    function filterGames(category: string): void {
        setActiveCategory(category);
        setFilteredGames(games.filter(game => game.category == category));
    }

    return (
        <main id="gamesPage">
            <section id="game-filters-panel">
                <section className="game-filters-panel__accordion">
                    <article className="filter-card-header"> 
                        <img src="/caret-down.svg" className="filter-card-header__caret" />
                        <h5 className="filter-card-title"> Category </h5>
                    </article>

                    <article className="filter-card-collapsible">
                        <section className="filter-card-body">
                            <section className="filter-card-body-data">
                                <input type="checkbox" name={`category-action`} id={`category-action`} />
                                <h3 className="filter-card-body-data__title"> Action </h3>
                            </section>
                            
                            <h3 className="filter-card-body-data__amount"> 256 </h3>
                        </section>
                    </article>
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

                <section className="game-filters-panel__review-accordion">
                    
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