import { type ReactElement } from "react";
import { useFavourites } from "../../hooks/useFavourites";
import { FavouriteCard } from "..";

import "./FavouriteMenu.css";

/**
 * The favourite menu and its content.
 */
export function FavouriteMenu({show, close}: {show: boolean, close: () => void}): ReactElement {
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
                    favourites.map(game => <FavouriteCard key={game.title} game={game} close={close} />)
                }
            </section>
        </section>
    );
}