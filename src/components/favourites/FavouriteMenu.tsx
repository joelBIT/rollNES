import { type ReactElement } from "react";
import { useFavourites } from "../../hooks/useFavourites";
import { FavouriteCard } from "..";
import type { Game } from "../../types/types";

import "./FavouriteMenu.css";

/**
 * The favourite menu and its content. When clicking on a FavouriteCard a user is redirected to that game page so all overlays are closed.
 */
export function FavouriteMenu({show, closeOverlays, close}: {show: boolean, closeOverlays: () => void, close: () => void}): ReactElement {
    const { favourites } = useFavourites();

    return (
        <section className={show? "show-menu" : "hide-menu"}>
            <section id="favourite-menu-header">
                <img src="/favourites.svg" id="favourite-games" alt="Favourites icon" title="Favourite Games" />
                <h2 id="favourites__heading"> Favourite Games </h2>
                <button id="close-menu-button" onClick={() => close()}> &#x2715; </button>
            </section>

            <section id="favourite-games-list">
                {
                    favourites.map((game: Game) => <FavouriteCard key={game.title} game={game} close={closeOverlays} />)
                }
            </section>
        </section>
    );
}