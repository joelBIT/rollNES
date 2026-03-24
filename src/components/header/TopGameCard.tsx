import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import { Cartridge } from "../games/Cartridge";
import type { Game } from "../../types/types";
import { COVER_URL, URL_GAMES_PAGE } from "../../utils";

import "./TopGameCard.css";

/**
 * Card for the most popular games (used in Header dropdown).
 */
export function TopGameCard({game, close}: { game: Game, close: () => void}): ReactElement {
    let navigate = useNavigate();

    function goToGamePage(): void {
        navigate(URL_GAMES_PAGE + "/" + game.id);
        close();
    }

    return (
        <section className="top-game-card">
            <Cartridge coverUrl={COVER_URL + game.cover} />

            <h3 className="top-game__title" onClick={goToGamePage}> {game.title} </h3>
        </section>
    );
}