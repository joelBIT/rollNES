import { type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import { GamePad } from "./GamePad";
import type { ButtonId, GameController } from "../../types/types";
import { BUTTON_LABELS } from "../../config/gamepads";

import "./ControllerTab.css";

const BINDING_ORDER: ButtonId[] = ["left", "up", "right", "down", "select", "start", "b", "a"];

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

            <button type="button" className="retro-button" onClick={() => resetConfiguration()}> Reset settings </button>
        </section>
    );
}

function ButtonBindings({player}: {player: GameController}): ReactElement {
    return (
        <section className="button-bindings">
            {BINDING_ORDER.map((id: ButtonId) => <div key={id}>{BUTTON_LABELS[id]}: <p>{player[id]}</p></div>)}
        </section>
    );
}