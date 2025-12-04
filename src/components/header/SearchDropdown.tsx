import {useEffect, useRef, useState, type ReactElement} from "react";
import type { Game } from "../../types/types";
import { TopGameCard } from "./TopGameCard";
import { getThreeMatchingGamesRequest } from "../../requests";

import "./SearchDropdown.css";

/**
 * Dropdown section containing a simple search field and some game recommendations.
 */
export function SearchDropdown({show, toggleShowDropdown, topGames}: {show: boolean, toggleShowDropdown: () => void, topGames: Game[]}): ReactElement {
    const [isShowing, setIsShowing] = useState<boolean>(show);
    const [gameName, setGameName] = useState<string>("");
    const [gameMatches, setGameMatches] = useState<Game[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsShowing(show);
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [show]);

    /**
     * Retrieve at most 3 games that matches the 'name' parameter. Only search when 'name' consists of 3 or more letters.
     */
    async function matchGames(name: string): Promise<void> {
        setGameName(name);
        
        if (name.length > 2) {
            const matches = await getThreeMatchingGamesRequest(name);

            if (matches && matches?.length > 0) {
                setGameMatches(matches);
            }
        } else {
            setGameMatches([]);
        }
    }

    /**
     * Clear the input field when closing the dropdown.
     */
    function closeDropdown(): void {
        setGameName("");
        setGameMatches([]);
        toggleShowDropdown();
    }

    return (
        <section id="search-dropdown">
            <section id="search-inner-content" className={isShowing ? "dropdown" : "accordion-panel"}>
                <section id="search-recommendations">
                    <form id="search-area" role="search" className="search-input__field" method="get" name="simpleSearch" action="/search">
                        <input
                            id="search-area__input"
                            title="Enter Search Keyword"
                            ref={inputRef}
                            placeholder="Enter Search Keyword"
                            onChange={e => matchGames(e.target.value)}
                            value={gameName}
                            autoComplete="off"
                            name="simple-search"
                            type="search"
                            autoFocus
                        />
                    </form>

                    {
                        gameName.length < 1 ?
                            <section id="top-games">
                                <h3 id="top-games__heading"> TOP GAMES </h3>

                                <section id="top-games__cards">
                                    {
                                        topGames.map(game => <TopGameCard key={game.id} game={game} close={closeDropdown} />)
                                    }
                                </section>
                            </section>
                        : 
                            <section id="matching-games">
                                <h3 id="matching-games__heading"> BEST GAME MATCHES </h3>

                                <section id="matching-games__cards">
                                    {
                                        gameMatches.map(game => <TopGameCard key={game.id} game={game} close={closeDropdown} />)
                                    }
                                </section>
                            </section>
                    }
                </section>

                <div id="shadow"></div>
            </section>
        </section>
    )
}