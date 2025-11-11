import { useEffect, useState, type ReactElement } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import type { Game } from "../../types/types";
import { GameCard } from "../../components";

import "./GamesPage.css";

export default function GamesPage(): ReactElement {
    const games = useLoaderData() as Game[];
    const [ searchParams ] = useSearchParams();
    const category = searchParams.get("category") as string;
    const [ filteredGames, setFilteredGames ] = useState<Game[]>(games);
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

            </section>

            <section id="games-list">
                {
                    filteredGames?.length > 0 ? filteredGames.map(game => <GameCard key={game.id} game={game} />) : ""
                }
            </section>
        </main>
    );
}