import { type ReactElement, useState } from "react";
import { useControllers } from "../../hooks/useControllers";
import { extractPlayer1Configuration, extractPlayer2Configuration } from "../../utils";
import { GamePad } from "..";
import type { GameController } from "../../types/types";

import "./ControllerForm.css";

/**
 * Form used for configuration of player 1 and player 2 controls.
 */
export function ControllerForm(): ReactElement {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("Could not save controller settings");
    const { player1, player2, saveConfigurations, getControllersConfiguration } = useControllers();

    /**
     * Do not store configuration if player has left empty input fields when trying to save the controller configuration.
     * Store the controller configuration in local storage if all fields are nonempty and contains unique values.
     */
    function confirmSettings(formData: FormData): void {
        setShowMessage(true);
        setIsError(false);
        if (hasEmptyKeys()) {
            setIsError(true);
            setMessage("Not allowed to set empty controller keys");
            return;
        }

        const player1: GameController = extractPlayer1Configuration(formData);
        const player2: GameController = extractPlayer2Configuration(formData);

        saveConfigurations(player1, player2);
        setMessage("Configuration saved");
    }

    /**
     * Tests if all keys have values. It should not be possible to store controller configuration is keys have not been set.
     */
    function hasEmptyKeys(): boolean {
        for (const key of getControllersConfiguration()) {
            if (!key.value) {
                return true;
            }
        }
        return false;
    }

    return (
        <>
            <form id="controllerForm" action={confirmSettings}>
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

                <button className="retro-button" type="submit"> Save settings </button>
            </form>

            { 
                showMessage ? 
                    <h2 className={isError ? "message-failure" : "message-success"}>
                        {message}
                    </h2> : <></> 
            }
        </>
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