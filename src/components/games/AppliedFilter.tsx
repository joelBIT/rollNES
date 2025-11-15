import type { ReactElement } from "react";
import type { AppliedFilter } from "../../types/types";
import { useGames } from "../../hooks/useGames";

import "./AppliedFilter.css";

/**
 * Is shown in GamesPage for each selected filter.
 */
export function AppliedFilter({filter}: {filter: AppliedFilter}): ReactElement {
    const { removeFilter } = useGames();

    return (
        <section className="appliedFilter" title="Remove Filter" onClick={() => removeFilter(filter.type, filter.value)}>
            <h2 className="appliedFilter__text">
                {filter.type.charAt(0).toUpperCase() + filter.type.slice(1, filter.type.length)}: {filter.value}
            </h2>

            <h2 className="appliedFilter__cross"> &#x274c; </h2>
        </section>
    )
}