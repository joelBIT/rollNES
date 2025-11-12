import type { ReactElement } from "react";

import "./TermsPage.css";

/**
 * The Terms for using the RollNES page.
 */
export default function TermsPage(): ReactElement {
    return (
        <main id="termsPage">
            <h2 id="termsPage__heading"> Terms and Conditions </h2>

            <section className="terms-sections">
                <p className="terms-sections__text">
                    This page contains the terms & conditions. Please read these terms & conditions carefully before using this site. 
                    You should understand that by using this site, you agree to be bound by these terms & conditions.
                </p>

                <p className="terms-sections__text">
                    By playing a game at the RollNES site, you warrant that you own that game and accept these terms & conditions which shall apply to 
                    all interactions with the RollNES emulator and this site. None of these terms & conditions affect your statutory rights. 
                    No other terms or changes to the terms & conditions shall be binding unless agreed in writing signed by us.
                </p>

                 <ul className="terms-sections__list">
                    <li>By using the RollNES emulator, you agree to be bound by these terms & conditions.</li>
                    <li>By playing a game at this site, you warrant that you are an owner of that specific game.</li>
                    <li>All personal information you provide us with or that we obtain will be handled by us as responsible for the personal information.</li>
                    <li>Events outside our control shall be considered force majeure.</li>
                    <li>RollNES reserves the right to amend any information without prior notice.</li>
                </ul>
            </section>

            <section className="terms-sections">
                <h2 className="terms-sections__heading"> Force Majeure </h2>

                <p className="terms-sections__text">
                    Events outside RollNES' control, which is not reasonably foreseeable, shall be considered force majeure, meaning that 
                    RollNES is released from RollNES' obligations to fulfill contractual agreements. Example of such events are 
                    government action or omission, new or amended legislation, conflict, embargo, fire or flood, sabotage, accident, war, 
                    natural disasters, strikes or lack of delivery from suppliers. The force majeure also includes government decisions 
                    that affect the market negatively and products, for example, restrictions, warnings, ban, etc.
                </p>
            </section>
        </main>
    );
}