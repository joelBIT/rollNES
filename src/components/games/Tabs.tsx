import { type ReactElement } from "react";

import "./Tabs.css";

/**
 * Takes a number of tab titles and creates corresponding tabs.
 *
 * @param titles        List of titles where each title is shown on a tab.
 * @param active        The currently active tab (title). The parent owns this state.
 * @param setActive     Called with the title of the tab that was clicked.
 */
export function Tabs({titles, active, setActive}: {titles: string[], active: string, setActive: (tab: string) => void}): ReactElement {
    return (
        <section className="tabs" role="tablist">
            {
                titles.map((title: string) => (
                    <section
                        key={title}
                        role="tab"
                        aria-selected={active === title}
                        className={active === title ? "tab selected" : "tab"}
                        onClick={() => setActive(title)}
                    >
                        <h2 className="tab-label">{title}</h2>
                    </section>
                ))
            }
        </section>
    );
}