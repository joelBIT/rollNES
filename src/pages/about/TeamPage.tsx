import type { ReactElement } from "react";
import { TeamMemberCard } from "../../components";

import "./TeamPage.css";

/**
 * The team at RollNES.
 */
export default function TeamPage(): ReactElement {
    return (
        <main id="teamPage">
            <h1 id="team__heading"> Our Team </h1>

            <p id="team__text">
                Team Members
            </p>
           
           <section id="team-members">
                <TeamMemberCard imageSource={"/ceo.png"} name="Gretchen Sturm" title="CEO" />
                <TeamMemberCard imageSource={"/cto.png"} name="Joel Rollny" title="CTO" />
                <TeamMemberCard imageSource={"support.png"} name="Mållgan Karlsson" title="Support" />
           </section>
        </main>
    );
}