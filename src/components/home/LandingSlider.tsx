import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";
import { URL_GAMES_PAGE } from "../../utils";

import "./LandingSlider.css";

/**
 * Carousel on Landing Page that shows several games.
 */
export function LandingSlider(): ReactElement {
    const [ slide, setSlide ] = useState<number>(0);
    const [ isNext, setIsNext ] = useState<boolean>(false);

    function prevSlide(): void {
        setSlide(_prev => slide === 0 ? 1 : 0);
        setIsNext(false);
    }

    function nextSlide(): void {
        setSlide(_prev => slide === 0 ? 1 : 0);
        setIsNext(true);
    }
    
    return (
        <section id="landing-slider">
            <section id="slide-space">
                <img 
                    id="prevButton" 
                    onClick={prevSlide} 
                    src={slide === 0 ? "/left-arrow-black.png" : "/left-arrow.png"} 
                    alt="Change to previous slide" 
                />

                <section id="slides">
                    <section id="slide-battletoads" className={slide === 0 ? isNext ? "active-slide" : "active-slide-reverse" : isNext ? "slide" : "slide-reverse" }>
                        <section id="game-battletoads">
                            <h2 className="game-battletoads__italic"> New Improved Formula </h2>
                            <h2 className="game-battletoads__heading"> Battletoads & Double Dragon </h2>
                            <p className="game-battletoads__text"> Characters from both series join forces in new adventures. </p>

                            <NavLink className="play-button" to={URL_GAMES_PAGE + "/113"}>
                                Play now
                            </NavLink>
                        </section>

                        <section id="game-battletoads__image">
                            <img src="/ddbattletoads.jpeg" alt="Battletoads and Double Dragon" />
                        </section>
                    </section>

                    <section id="slide-cartridges" className={slide === 1 ? isNext ? "active-slide" : "active-slide-reverse" : isNext ? "slide" : "slide-reverse"}>
                        <section id="slide-cartridges__image">
                            <img src="/nes-game-cartridges-hero.avif" alt="Cartridges" />
                        </section>

                        <section id="mapper-cartridges">
                            <h2 className="mapper-cartridges__heading"> Most common mappers implemented</h2>
                            <p className="mapper-cartridges__text"> Nearly all games supported </p>

                            <NavLink className="play-button" to={URL_GAMES_PAGE}>
                                Play Nintendo
                            </NavLink>
                        </section>
                    </section>
                </section>

                <img 
                    id="nextButton" 
                    onClick={nextSlide} 
                    src={slide === 0 ? "/right-arrow-black.png" : "/right-arrow.png"} 
                    alt="Change to next slide" 
                />
            </section>
        </section>
    );
}