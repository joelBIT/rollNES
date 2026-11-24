import { useId, useRef, useState, type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import type { ButtonId, GameController, PlayerNumber } from "../../types/types";
import { BUTTON_LABELS } from "../../config/gamepads";

import "./GamePad.css";

/**
 * A NES gamepad used for setting controller inputs for players when using the RollNES emulator.
 * The parameter 'player' represents if the gamepad is used by player 1, 2, etc.
 */
export function GamePad({player}: {player: PlayerNumber}): ReactElement {
    const [activeButton, setActiveButton] = useState<ButtonId | null>(null);        // Which button is being edited
    const [selectedValue, setSelectedValue] = useState<string>('');
    const titleId = useId();
    const openerRef = useRef<HTMLElement | null>(null);     // The gamepad button that opened the popup, so focus can go back to it
    const { player1, player2, updateBinding, findBindingConflict } = useControllers();
    const controller: GameController = player === 1 ? player1 : player2;            // Always the current configuration, never a stale copy
    const conflict = activeButton && selectedValue ? findBindingConflict(player, activeButton, selectedValue) : null;

    function openPopup(button: ButtonId, event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        openerRef.current = event.currentTarget;
        setSelectedValue(controller[button]);
        setActiveButton(button);
    }

    function closePopup(): void {
        setActiveButton(null);
        openerRef.current?.focus();
    }

    function saveBinding(): void {
        if (activeButton && selectedValue && !conflict) {
            updateBinding(player, activeButton, selectedValue);
            closePopup();
        }
    }

    /**
     * Show the pressed key's code in the input. Tab and Escape are left alone so keyboard users can navigate and
     * close the popup, which means they cannot be bound.
     */
    function setKeyCode(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Tab" || event.key === "Escape") {
            return;
        }

        setSelectedValue(event.code);
        event.preventDefault();
    }

    /**
     * Escape closes the popup, and Tab cycles between the popup's controls instead of leaving it.
     */
    function onPopupKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (event.key === "Escape") {
            event.stopPropagation();
            closePopup();
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusable = event.currentTarget.querySelectorAll<HTMLElement>("input, button:not(:disabled)");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
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

                    <button className="dpad-up" aria-label="Up" onClick={(event) => openPopup("up", event)}></button>
                    <button className="dpad-down" aria-label="Down" onClick={(event) => openPopup("down", event)}></button>
                    <button className="dpad-left" aria-label="Left" onClick={(event) => openPopup("left", event)}></button>
                    <button className="dpad-right" aria-label="Right" onClick={(event) => openPopup("right", event)}></button>
                </div>

                <div className="center-controls">
                    <div className="meta-btn-group">
                        <div className="meta-wrap">
                            <button className="meta-btn" aria-label="Select" onClick={(event) => openPopup("select", event)}></button>
                            <span className="meta-label">SELECT</span>
                        </div>
                        <div className="meta-wrap">
                            <button className="meta-btn" aria-label="Start" onClick={(event) => openPopup("start", event)}></button>
                            <span className="meta-label">START</span>
                        </div>
                    </div>
                </div>

                <div className="ab-controls">
                    <div className="ab-wrap">
                        <button className="round-btn" aria-label="B" onClick={(event) => openPopup("b", event)}></button>
                        <span className="ab-label">B</span>
                    </div>
                    <div className="ab-wrap">
                        <button className="round-btn" aria-label="A" onClick={(event) => openPopup("a", event)}></button>
                        <span className="ab-label">A</span>
                    </div>
                </div>
            </section>

            <div className="brand">NINTENDO</div>

            {activeButton && (
                <div className="popup-backdrop" onClick={closePopup}>
                    <div
                        className="popup-card"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={onPopupKeyDown}
                    >
                        <p className="popup-title" id={titleId}>Bind {BUTTON_LABELS[activeButton]} (Player {player})</p>
                        <p className="popup-hint">Press the key you want to use. Tab and Escape can't be bound.</p>
                        <input type="text" value={selectedValue} name={activeButton} onKeyDown={setKeyCode} readOnly autoComplete="off" autoFocus />

                        {conflict && (
                            <p className="popup-warning" role="alert">
                                {selectedValue} is already used by Player {conflict.player} {BUTTON_LABELS[conflict.button]}. Choose another key.
                            </p>
                        )}

                        <div className="popup-actions">
                            <button className="popup-button" onClick={closePopup}>Close</button>
                            <button className="popup-button" onClick={saveBinding} disabled={!selectedValue || conflict !== null}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}