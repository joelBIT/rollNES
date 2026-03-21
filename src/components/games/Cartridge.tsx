import type { ReactElement } from "react";

import "./Cartridge.css";

/**
 * A cartridge on the GamePage showing the NES game cover.
 */
export function Cartridge({coverUrl}: {coverUrl: string}): ReactElement {
    return (
        <section className="cartridge">
            <div id="wrapper">
                <div className="cartridge-inner">
                    <div>
                        <section className="front">
                            <img src={coverUrl} id="cover-pic" alt="nes cover" />
                            <span className="triangle-down" />
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li id="lastLine"></li>
                            </ul>
                        </section>
                    </div>

                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>
            </div>
        </section>
    );
}