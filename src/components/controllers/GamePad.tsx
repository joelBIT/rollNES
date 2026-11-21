import { useState, type ReactElement } from "react";
import { useControllers } from "../../hooks/useControllers";
import type { GameController } from "../../types/types";

import "./GamePad.css";

/**
 * A NES gamepad used for setting controller inputs for players when using the RollNES emulator.
 * The parameter 'player' represents if the gamepad is used by player 1, 2, etc.
 */
export function GamePad({player}: {player: 1 | 2}): ReactElement {
    const { player1, player2, updateBinding } = useControllers();
    const controller: GameController = player === 1 ? player1 : player2;        // Always the current configuration, never a stale copy

    const [activeKey, setActiveKey] = useState<keyof GameController | null>(null);     // Which button is being edited
    const [selectedValue, setSelectedValue] = useState<string>('');

    const button = activeKey ? controller[activeKey] : null;

    function openPopup(key: keyof GameController, event: React.MouseEvent): void {
        event.preventDefault();
        setSelectedValue(controller[key].value);        // Start from the current binding so Save without a key press changes nothing
        setActiveKey(key);
    }

    function closePopup(): void {
        setActiveKey(null);
    }

    function saveBinding(): void {
        if (activeKey && selectedValue) {
            updateBinding(player, activeKey, selectedValue);
        }
        setActiveKey(null);
    }

    /**
     * Show key code in input text field.
     */
    function setKeyCode(event: React.KeyboardEvent<HTMLInputElement>): void {
        setSelectedValue(event.code);
        event.preventDefault();
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

            {activeKey && button && (
                <div className="popup-backdrop" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <p className="popup-title">
                            Bind {activeKey.charAt(0).toUpperCase() + activeKey.slice(1)} (Player {player})
                        </p>
                        <input
                            type="text"
                            value={selectedValue}
                            name={activeKey}
                            onKeyDown={setKeyCode}
                            readOnly
                            autoComplete="off" 
                            autoFocus
                        />

                        <div className="popup-actions">
                            <button className="popup-button" onClick={closePopup}>Close</button>
                            <button className="popup-button" onClick={saveBinding}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}