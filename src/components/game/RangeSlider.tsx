import { useState, type ChangeEvent, type ReactElement } from "react";

import "./RangeSlider.css";

export function RangeSlider({max}: {max: number}): ReactElement {
    const [value, setValue] = useState<number>(max < 10 ? max : 10);

    function handleInput(event : ChangeEvent<HTMLInputElement>): void {
        const value = parseInt(event.target.value);
        setValue(value);
    }

    return (
        <section className="rangeSlider">
            <input type="range" min="10" step="1" max={max} value={value} className="slider" onInput={handleInput} />

            <h2 className="slider-text"> Showing {value} / {max} games</h2>
        </section>
    )
}