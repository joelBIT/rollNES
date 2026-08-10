import { useState, type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import type { Button } from "../../types/types";

import "./GamePad.css";

/**
 * A NES gamepad used for setting controller inputs for players when using the RollNES emulator.
 * The parameter 'player' represents if the gamepad is used by player 1, 2, etc.
 */
export function GamePad({player}: {player: number}): ReactElement {
    const [activePopup, setActivePopup] = useState<string>("");
    const { getControllerForPlayer, getControllersConfiguration } = useControllers();
    const [controller] = useState(getControllerForPlayer(player));
    const [buttons, setButtons] = useState<Button[]>(getControllersConfiguration());
    const [button, setButton] = useState<Button>(controller.a);

    function openPopup(button: Button, event: any) {
        event.preventDefault();
        setButton(button);
        if (player === 1) {
            setActivePopup(button.name);
        } else {
            setActivePopup(button.name.slice(0, button.name.length - 1));   // Remove the 2 in the end of the button name
        }
    };

    function closePopup() {
        setActivePopup("");
    }

    /**
     *  Show key code in input text field.
     */
    function setKeyCode(event: React.KeyboardEvent<HTMLInputElement>): void {
        removeKeyWhereAlreadyUsed(event.code);
        (event.target as HTMLInputElement).value = event.code;
        event.preventDefault();
    }

    /**
     *  Removes the chosen key from other buttons if already in use.
     */
    function removeKeyWhereAlreadyUsed(keyCode: string): void {
        for (const key of buttons) {
            if (Object.is(key.value, keyCode)) {
                key.value = '';
            }
        }
    }

    return (
        <section className="gamePad">
            <div className="stripe"></div>

            <section className="layout">
                <div className="dpad">
                    <div className="dpad-h"></div>
                    <div className="dpad-v"></div>
                    <div className="dpad-center"></div>

                    <button className="dpad-up" aria-label="Up" onClick={(event) => openPopup(controller.up, event)}></button>
                    <button className="dpad-down" aria-label="Down" onClick={(event) => openPopup(controller.down, event)}></button>
                    <button className="dpad-left" aria-label="Left" onClick={(event) => openPopup(controller.left, event)}></button>
                    <button className="dpad-right" aria-label="Right" onClick={(event) => openPopup(controller.right, event)}></button>
                </div>

                <div className="center-controls">
                    <div className="meta-btn-group">
                        <div className="meta-wrap">
                            <button className="meta-btn" aria-label="Select" onClick={(event) => openPopup(controller.select, event)}></button>
                            <span className="meta-label">SELECT</span>
                        </div>
                        <div className="meta-wrap">
                            <button className="meta-btn" aria-label="Start" onClick={(event) => openPopup(controller.start, event)}></button>
                            <span className="meta-label">START</span>
                        </div>
                    </div>
                </div>

                <div className="ab-controls">
                    <div className="ab-wrap">
                        <button className="round-btn" aria-label="B" onClick={(event) => openPopup(controller.b, event)}></button>
                        <span className="ab-label">B</span>
                    </div>
                    <div className="ab-wrap">
                        <button className="round-btn" aria-label="A" onClick={(event) => openPopup(controller.a, event)}></button>
                        <span className="ab-label">A</span>
                    </div>
                </div>
            </section>

            <div className="brand">NINTENDO</div>

            {activePopup && (
                <div className="popup-backdrop" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <p className="popup-title">Bind {activePopup} button (Player {player})</p>
                        <input
                            type="text"
                            defaultValue={button.value}
                            name={button?.name}
                            onKeyDown={e => setKeyCode(e)}
                            autoComplete="off" 
                            autoFocus
                        />

                        <div className="popup-actions">
                            <button className="popup-close" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}