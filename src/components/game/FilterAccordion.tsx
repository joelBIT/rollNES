import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import type { Filter } from "../../types/types";

import "./FilterAccordion.css";

export function FilterAccordion({values, title, filterName}: {values: string[], title: string, filterName: Filter}): ReactElement {
    const [isShowingValues, setIsShowingValues] = useState(false);
    const { matchesFilter, addFilter, removeFilter } = useGames();

    return (
        <section className="game-filters-panel__accordion">
            <article className="filter-card-header" onClick={() => setIsShowingValues(!isShowingValues)}> 
                <span className={isShowingValues ? "rotate-down" : "rotate-up"}> &#94; </span>
                <h5 className="filter-card-title"> {title} </h5>
            </article>

            {
                values.map(value => 
                    <article className={isShowingValues ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={value}>
                        <section className="filter-card-body">
                            <section className="filter-card-body-data">
                                <input 
                                    type="checkbox" 
                                    name={`filter-${value}`} 
                                    id={`filter-${value}`} 
                                    onClick={(e) => (e.target as HTMLInputElement).checked ? addFilter(filterName, value) : removeFilter(filterName, value)} 
                                />

                                <h3 className="filter-card-body-data__title"> {value} </h3>
                            </section>
                            
                            <h3 className="filter-card-body-data__amount"> { matchesFilter(filterName, value) } </h3>
                        </section>
                    </article>
                )
            }
        </section>
    )
}