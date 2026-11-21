import { useState, type ReactElement } from "react";

import "./RangeSlider.css";

/**
 * Slider for changing how many games are rendered on the GamesPage. 
 * When mouse state is "up" the parent is called with that chosen value (avoids parent rerendering all the time when sliding).
 */
export function RangeSlider({min, max, value, setSliderValue}: {min: number, max: number, value: number, setSliderValue: (value: number) => void}): ReactElement {
    const [dragValue, setDragValue] = useState<number | null>(null);        // Value while sliding, null when not sliding
    const shown = Math.min(Math.max(dragValue ?? value, min), max);

    function commit(input: HTMLInputElement): void {
        const chosen = parseInt(input.value);
        if (dragValue !== null && chosen !== value) {
            setSliderValue(chosen);
        }
        setDragValue(null);
    }

    return (
        <section className="rangeSlider">
            <input 
                type="range" 
                min={min} 
                step="1" 
                max={max} 
                value={shown} 
                className="slider" 
                disabled={max === 0}
                onChange={(e) => setDragValue(parseInt(e.target.value))} 
                onPointerUp={(e) => commit(e.currentTarget)} 
                onKeyUp={(e) => commit(e.currentTarget)}
                onBlur={(e) => commit(e.currentTarget)}
            />

            <h2 className="slider-text"> Showing {shown} / {max} games</h2>
        </section>
    )
}