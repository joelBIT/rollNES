import type { ReactElement } from "react";

import "./Cartridge.css";

/**
 * A cartridge on the GamePage showing the NES game cover.
 */
export function Cartridge({coverUrl}: {coverUrl: string}): ReactElement {
    return (
        <section className="cartridge">
            <img src="nes-cartridge.png" alt="Nes cartridge image" className="cartridge-image" />
            <img src={coverUrl} className="cartridge-cover" alt="nes cover" />
        </section>
    );
}