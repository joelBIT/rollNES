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
            <p>Up: <div>{player.up.value}</div></p>
            <p>Down: <div>{player.down.value}</div></p>
            <p>Left: <div>{player.left.value}</div></p>
            <p>Right: <div>{player.right.value}</div></p>
            <p>Select: <div>{player.select.value}</div></p>
            <p>Start: <div>{player.start.value}</div></p>
            <p>A: <div>{player.a.value}</div></p>
            <p>B: <div>{player.b.value}</div></p>
        </section>
    );
}