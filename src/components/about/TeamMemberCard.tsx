import type { ReactElement } from "react";

import "./TeamMemberCard.css";

/**
 * A RollNES team member.
 */
export function TeamMemberCard({imageSource, name, title}: {imageSource: string, name: string, title: string}): ReactElement {
    return (
        <section className="team-member-card">
            <img src={imageSource} className="team-member-photo" />

            <h2 className="team-member-name"> {name} </h2>
            <h3 className="team-member-title"> {title} </h3>
        </section>
    );
}