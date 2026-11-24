import {useEffect, useRef, useState, type ReactElement} from "react";
import { useNavigate } from "react-router";
import { useGames } from "../../hooks/useGames";
import type { Game } from "../../types/types";
import { TopGameCard } from "./TopGameCard";
import { getThreeMatchingGamesRequest } from "../../requests";
import { DEBOUNCE_MS, MIN_SEARCH_LENGTH, URL_GAMES_PAGE } from "../../utils";
import { reportError } from "../../errors";

import "./SearchDropdown.css";

/**
 * Dropdown section containing a simple search field and some game recommendations.
 */
export function SearchDropdown({show, toggleShowDropdown, topGames}: {show: boolean, toggleShowDropdown: () => void, topGames: Game[]}): ReactElement {
    const [isShowing, setIsShowing] = useState<boolean>(show);
    const [gameName, setGameName] = useState<string>("");
    const [gameMatches, setGameMatches] = useState<Game[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addFilter } = useGames();
    const navigate = useNavigate();
    const term = gameName.trim();

    useEffect(() => {
        setIsShowing(show);
        setGameName("");
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [show]);

    /**
     * Retrieve at most 3 games that match the search term. The request is debounced, and the cleanup marks it as cancelled so a slow
     * response for an old term can never overwrite the result for the current one.
     */
    useEffect(() => {
        if (term.length < MIN_SEARCH_LENGTH) {
            setGameMatches([]);
            setIsSearching(false);
            return;
        }

        let cancelled = false;
        setIsSearching(true);

        const timer = setTimeout(async () => {
            try {
                const matches = await getThreeMatchingGamesRequest(term);
                if (!cancelled) {
                    setGameMatches(matches);        // Also applied when empty, so old matches never stay on screen
                    setIsSearching(false);
                }
            } catch (error) {
                if (!cancelled) {
                    reportError(error);
                    setGameMatches([]);             // A failed search shows "No games match" instead of stale results
                }
            } finally {
                if (!cancelled) {
                    setIsSearching(false);
                }
            }
        }, DEBOUNCE_MS);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [term]);

    /**
     * Clear the input field when closing the dropdown.
     */
    function closeDropdown(): void {
        setGameName("");
        setGameMatches([]);
        toggleShowDropdown();
    }

    /**
     * Show all games matching the search term on the Games page. Does not depend on the dropdown's preview matches, so
     * pressing Enter works even before the preview has loaded (or when it has fewer than 3 letters).
     */
    function searchGames(): void {
        if (term.length > 0) {
            addFilter("title", term);
            closeDropdown();
            navigate(URL_GAMES_PAGE);
        }
    }

    return (
        <section id="search-dropdown">
            <section id="search-inner-content" className={isShowing ? "dropdown" : "accordion-panel"}>
                <section id="search-recommendations">
                    <form id="search-area" role="search" className="search-input__field" name="simpleSearch" action={searchGames}>
                        <input
                            id="search-area__input"
                            title="Enter Search Keyword"
                            ref={inputRef}
                            placeholder="Enter Search Keyword"
                            onChange={e => setGameName(e.target.value)}
                            value={gameName}
                            autoComplete="off"
                            name="simple-search"
                            type="search"
                            autoFocus
                        />
                    </form>

                    {
                        term.length === 0 ?
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

                                {
                                    gameMatches.length > 0 ?
                                        <section id="matching-games__cards">
                                            {
                                                gameMatches.map(game => <TopGameCard key={game.id} game={game} close={closeDropdown} />)
                                            }
                                        </section>
                                    : term.length < MIN_SEARCH_LENGTH ?
                                        <p className="search-status"> Type at least {MIN_SEARCH_LENGTH} letters to see matches, or press Enter to search. </p>
                                    : isSearching ?
                                        <p className="search-status"> Searching... </p>
                                    :
                                        <p className="search-status"> No games match "{term}". </p>
                                }
                            </section>
                    }

                    <div className="darken-image-bottom" />
                </section>
            </section>
        </section>
    )
}