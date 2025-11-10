import { type ReactElement } from "react";
import type { Game } from "../../types/types";

import "./FavouriteMenu.css";

/**
 * The favourite menu and its content.
 */
export function FavouriteMenu({show, close}: {show: boolean, close: () => void}): ReactElement {
    const favourites = [] as Game[];

    return (
        <section className={show? "show-menu" : "hide-menu"}>
            <section id="favourite-menu-header">
                <img src="/favourites.svg" id="favourite-games" alt="Favourites icon" title="Favourite Games" />
                <h2 id="favourites__heading"> Favourite Games </h2>
                <button id="close-menu-button" onClick={() => close()}> X </button>
            </section>

            <section id="favourite-games-list">
                {
                    // favourites.map(item => <FavouriteCard key={item.title} item={item} close={close} />)
                }
            </section>
        </section>
    );
}