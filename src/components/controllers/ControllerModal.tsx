import { type ReactElement, useEffect, useRef, useState } from "react";
import { useControllers } from "../../hooks/useControllers";
import { ControllerInput } from "..";
import { extractPlayer1Configuration, extractPlayer2Configuration } from "../../utils";

import "./ControllerModal.css";

/**
 * Modal used for configuration of player 1 and player 2 controls.
 */
export function ControllerModal({ text, close }: { text: string, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>("Could not save controller settings");
    const modalRef = useRef<HTMLDialogElement>(null);
    const { player1, player2, saveConfigurations } = useControllers();
    const keys = document.getElementsByClassName('key-controller') as HTMLCollectionOf<HTMLInputElement>;

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }
    }, [])
    
    function closeModal(event?: any): void {
        event?.preventDefault();
        modalRef.current?.close();
        setShowMessage(false);
        close(true);
    }

    /**
     * Do not store configuration if player has left empty input fields when trying to save the controller configuration.
     * Store the controller configuration in local storage if all fields are nonempty and contains unique values.
     */
    function confirmSettings(formData: FormData): void {
        if (hasEmptyKeys()) {
            setMessage("Not allowed to set empty controller keys");
            setShowMessage(true);
            return;
        }

        const player1 = extractPlayer1Configuration(formData);
        const player2 = extractPlayer2Configuration(formData);

        saveConfigurations(player1, player2);
        setShowMessage(false);
        closeModal();
    }

    /**
     *  Show key code in input text field.
     */
    function setKeyCode(event: React.KeyboardEvent<HTMLInputElement>) {
        removeKeyWhereAlreadyUsed(event.code);
        (event.target as HTMLInputElement).value = event.code;
        event.preventDefault();
    }

    /**
     *  Removes the chosen key from other buttons if already in use.
     */
    function removeKeyWhereAlreadyUsed(keyCode: string) {
        for (const key of keys) {
            if (Object.is(key.value, keyCode)) {
                key.value = '';
            }
        }
    }

    /**
     * Tests if all keys have values. It should not be possible to store controller configuration is keys have not been set.
     */
    function hasEmptyKeys(): boolean {
        for (const key of keys) {
            if (!key.value) {
                return true;
            }
        }
        return false;
    }
    
    return (
        <dialog autoFocus id="controllerModal" ref={modalRef} className="modal-dialog">
            <h1 className="modal-text"> {text} </h1>

            <form id="controller-form" className="modal-content" action={confirmSettings}>
                <section className="controllers">
                    <section className="player1-controller">
                        <h2 className="bit-font">Player 1</h2>

                        <ControllerInput defaultButton={player1.up} label="UP" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.down} label="DOWN" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.left} label="LEFT" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.right} label="RIGHT" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.a} label="A" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.b} label="B" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.start} label="START" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player1.select} label="SELECT" onKeyDown={setKeyCode} />
                    </section>

                    <section className="player2-controller">
                        <h2 className="bit-font">Player 2</h2>
                        
                        <ControllerInput defaultButton={player2.up} label="UP" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.down} label="DOWN" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.left} label="LEFT" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.right} label="RIGHT" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.a} label="A" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.b} label="B" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.start} label="START" onKeyDown={setKeyCode} />
                        <ControllerInput defaultButton={player2.select} label="SELECT" onKeyDown={setKeyCode} />
                    </section>
                </section>

                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            {message}
                        </h2> : <></> 
                }

                <section className="dialog-buttons">
                    <button className="retro-button close-button" onClick={closeModal}> Close </button>
                    <button className="retro-button save-button" type="submit"> Save </button>
                </section>
            </form>
        </dialog>
    );
}