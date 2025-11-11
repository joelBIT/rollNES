import { useState, type ReactElement } from "react";
import { NavLink } from "react-router";

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
                    <section id="slide-protectors" className={slide === 0 ? isNext ? "active-slide" : "active-slide-reverse" : isNext ? "slide" : "slide-reverse" }>
                        <section id="shop-protectors">
                            <h2 className="shop-protectors__italic"> New Improved Plastic </h2>
                            <h2 className="shop-protectors__heading"> Cartridge Protectors </h2>
                            <p className="shop-protectors__text"> Protection for your NES cartridges. Now available in bulk. </p>

                            <NavLink className="shop-button" to="/games/8">
                                Play now
                            </NavLink>
                        </section>

                        <section id="shop-protectors__image">
                            <img src="/ddbattletoads.jpeg" alt="Battletoads and Double Dragon" />
                        </section>
                    </section>

                    <section id="slide-cartridges" className={slide === 1 ? isNext ? "active-slide" : "active-slide-reverse" : isNext ? "slide" : "slide-reverse"}>
                        <section id="shop-cartridges__image">
                            <img src="/nes-game-cartridges-hero.avif" alt="Cartridges" />
                        </section>

                        <section id="shop-cartridges">
                            <h2 className="shop-cartridges__heading"> Buy one, get one 50% off</h2>
                            <p className="shop-cartridges__text"> Use code: <b>REST50</b> </p>

                            <NavLink className="shop-button" to="/games">
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