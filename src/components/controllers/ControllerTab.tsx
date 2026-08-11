import { type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import { GamePad } from "..";
import type { GameController } from "../../types/types";

import "./ControllerTab.css";

/**
 * Form used for configuration of player 1 and player 2 controls.
 */
export function ControllerTab(): ReactElement {
    const { player1, player2, resetConfiguration } = useControllers();

    return (
        <section id="controllerTab">
            <section className="gamepad-config">
                <h2 className="gamepad-heading bit-font">Player 1</h2>
                <ButtonBindings player={player1} />

                <GamePad player={1} />
            </section>

            <section className="gamepad-config">
                <h2 className="gamepad-heading bit-font">Player 2</h2>
                <ButtonBindings player={player2} />

                <GamePad player={2} />
            </section>

            <button className="retro-button" onClick={resetConfiguration}> Reset settings </button>
        </section>
    );
}

function ButtonBindings({player}: {player: GameController}): ReactElement {
    return (
        <section className="button-bindings">
            <div>Left: <p>{player.left.value}</p></div>
            <div>Up: <p>{player.up.value}</p></div>
            <div>Right: <p>{player.right.value}</p></div>
            <div>Down: <p>{player.down.value}</p></div>
            <div>Select: <p>{player.select.value}</p></div>
            <div>Start: <p>{player.start.value}</p></div>
            <div>B: <p>{player.b.value}</p></div>
            <div>A: <p>{player.a.value}</p></div>
        </section>
    );
}