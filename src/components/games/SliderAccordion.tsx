import { useState, type ReactElement } from "react";
import { RangeSlider } from "..";

/**
 * Slider used in GamesPage for choosing how many game cards to render on screen.
 */
export function SliderAccordion({title, setValue, min, max}: {title: string, setValue: (value: number) => void, min: number, max: number}): ReactElement {
    const [isShowingRange, setIsShowingRange] = useState(false);
    
    return (
        <section className="game-filters-panel__accordion">
            <article className="filter-card-header" onClick={() => setIsShowingRange(!isShowingRange)}> 
                <div className={isShowingRange ? "filter-open" : "filter-closed"} /> 
                <h5 className="filter-card-title"> {title} </h5>
            </article>

            <article className={isShowingRange ? "filter-card-collapsible dropdown" : "filter-card-collapsible"}>
                <section className="filter-card-body">
                    <RangeSlider min={min} max={max} setSliderValue={setValue} />
                </section>
            </article>
        </section>
    )
}