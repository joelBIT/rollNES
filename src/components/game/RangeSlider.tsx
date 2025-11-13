import { useState, type ChangeEvent, type ReactElement } from "react";

import "./RangeSlider.css";

/**
 * Slider for changing how many games are rendered on the GamesPage.
 */
export function RangeSlider({min, max, setSliderValue}: {min: number, max: number, setSliderValue: (value: number) => void}): ReactElement {
    const [value, setValue] = useState<number>(min);

    function handleInput(event : ChangeEvent<HTMLInputElement>): void {
        const value = parseInt(event.target.value);
        setValue(value);
        setSliderValue(value);
    }

    return (
        <section className="rangeSlider">
            <input type="range" min={min} step="1" max={max} value={value} className="slider" onInput={handleInput} />

            <h2 className="slider-text"> Show at most {value} / {max} games</h2>
        </section>
    )
}