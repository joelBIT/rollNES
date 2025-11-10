import {useEffect, useState, type ReactElement} from "react";
import { NavLink } from "react-router";

import "./Carousel.css";
import { URL_GAMES } from "../../utils";

export function Carousel(): ReactElement {
    const [ slide, setSlide ] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => {
            nextSlide();
        }, 7000);

        return () => {
            clearInterval(id);
        };
    }, [slide]);

    function nextSlide(): void {
        setSlide(slide === 2 ? 0 : slide + 1);
    }

    function prevSlide(): void {
        setSlide(slide === 0 ? 2 : slide - 1);
    }

    return (
        <section id="carousel">
            <button id="prevButton" onClick={prevSlide}>
                <span className="material-symbols-outlined arrow"> arrow_back_ios </span>
            </button>

            <section id="slide-space">
                <h1 className={slide === 0 ? "active" : "inactive"}> PLAY MOST OF THE EXISTING 8-BIT GAMES IN A BROWSER </h1>
                <h1 className={slide === 1 ? "active" : "inactive"}> NEW: BATTLE TOADS VS DOUBLE DRAGON <NavLink to={`${URL_GAMES}/113`}> PLAY NOW </NavLink> </h1>
                <h1 className={slide === 2 ? "active" : "inactive"}> EMAIL ANY WISHES ABOUT THE PAGE </h1>
            </section>

            <button id="nextButton" onClick={nextSlide}>
                <span className="material-symbols-outlined arrow"> arrow_forward_ios </span>
            </button>
        </section>
    );
}