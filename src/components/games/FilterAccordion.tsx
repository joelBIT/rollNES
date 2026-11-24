import { useState, type ReactElement } from "react";
import { useGames } from "../../hooks/useGames";
import type { FacetFilter } from "../../types/types";

import "./FilterAccordion.css";

/**
 * Filter used in GamesPage to filter games that are of interest.
 * 
 * @param values        All filter values
 * @param title         Title of the filter (Category, Players, etc)
 * @param filterName    Name of the game property to filter on (category, players, etc)
 */
export function FilterAccordion({values, title, filterName}: {values: string[], title: string, filterName: FacetFilter}): ReactElement {
    const [isShowingValues, setIsShowingValues] = useState<boolean>(false);
    const { appliedFilters, matchesFilter, addFilter, removeFilter } = useGames();

    function isApplied(value: string): boolean {
        return appliedFilters.some(filter => filter.type === filterName && filter.value === value);
    }

    return (
        <section className="game-filters-panel__accordion">
            <article className="filter-card-header" onClick={() => setIsShowingValues(!isShowingValues)}> 
                <div className={isShowingValues ? "filter-open" : "filter-closed"} />
                <h5 className="filter-card-title"> {title} </h5>
            </article>

            {
                values.filter(value => matchesFilter(filterName, value) > 0 || isApplied(value)).map(value => 
                    <article className={isShowingValues ? "filter-card-collapsible dropdown" : "filter-card-collapsible"} key={value}>
                        <section className="filter-card-body">
                            <section className="filter-card-body-data">
                                <input 
                                    type="checkbox" 
                                    name={`filter-${value}`} 
                                    checked={isApplied(value)}
                                    onChange={(e) => e.target.checked ? addFilter(filterName, value) : removeFilter(filterName, value)}
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