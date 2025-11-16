import { useState, type ReactElement } from "react";

import "./Tabs.css";

/**
 * Takes a number of tab titles and creates corresponding tabs. The supplied 'setActive' function is used by the parent to do something
 * desired when the user clicks on a tab.
 */
export function Tabs({titles, setActive}: {titles: string[], setActive: (tab: string) => void}): ReactElement {
    const [activeTab, setActiveTab] = useState<string>(titles[0]);

    function changeActiveTab(tab: string) {
        setActive(tab);         // Inform parent which tab has been clicked
        setActiveTab(tab);      // Switch tab
    }
    
    return (
        <section className="tabs">
            {
                titles.map((title) => (
                    <section
                        key={title}
                        className={activeTab === title ? "tab selected" : "tab"}
                        onClick={() => changeActiveTab(title)}
                    >
                        {title}
                    </section>
                ))
            }
        </section>
    );
}