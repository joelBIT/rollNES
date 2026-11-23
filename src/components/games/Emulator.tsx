import type { ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import { useEmulator } from "../../hooks/useEmulator";
import { isMobileDevice } from "../../utils";
import type { GameController } from "../../types/types";

import "./Emulator.css";

const BUTTON_LABELS: [string, keyof GameController][] = [
    ["Up", "up"], ["Down", "down"], ["Left", "left"], ["Right", "right"],
    ["Select", "select"], ["Start", "start"], ["A", "a"], ["B", "b"]
];

/**
 * The Emulator should be run on the App if using a mobile device.
 */
export function Emulator({gameId}: {gameId: number}): ReactElement {
    const { player1 } = useControllers();
    const isMobile = isMobileDevice();
    const { screenRef, reload, error } = useEmulator(gameId, !isMobile);

    if (isMobile) {
        return (
            <section id="emulator">
                <h2 className="mobile-app-text"> You should use RollNES on the App if you are using a mobile device. </h2> 
            </section>
        );
    }

    return (
        <section id="emulator">
            <section id="reload-emulator">
                <h3 className="reload-emulator__text"> Press reload if the game does not start </h3>
                <button className="retro-button" onClick={reload}> Reload </button>

                {error && <h3 className="message-failure"> {error} </h3>}

                <section id="player1-controller">
                    <h3 className="player1-controller__title"> Player 1 </h3>
                    {
                        BUTTON_LABELS.map(([label, key]) => (
                            <h3 key={key} className="player1-controller__text"> <b>{label}:</b> {player1[key].value} </h3>
                        ))
                    }
                </section>
            </section>

            <div className="nes-screen-frame">
                <div className="screen" ref={screenRef}></div>
            </div>
        </section>
    )
}