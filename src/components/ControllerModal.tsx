import { type ReactElement, useEffect, useRef, useState } from "react";
import { useControllers } from "../hooks/useControllers";

import "./ControllerModal.css";

/**
 * Modal used for configuration of player 1 and player 2 controls.
 */
export function ControllerModal({ text, close }: { text: string, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { player1, player2 } = useControllers();
    const keys = document.getElementsByClassName('key') as HTMLCollectionOf<HTMLInputElement>;

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }

        for (const key of keys) {
            key.addEventListener('focus', removeInputCharacter);
            key.addEventListener('focusout', addDefaultValueIfEmpty);
            key.addEventListener('keydown', setKeyCode);
            key.addEventListener('keyup', setDefaultValueIfKeyCodeMissing);
        }

        return () => {
            for (const key of keys) {
                key.removeEventListener('focus', removeInputCharacter);
                key.removeEventListener('focusout', addDefaultValueIfEmpty);
                key.removeEventListener('keydown', setKeyCode);
                key.removeEventListener('keyup', setDefaultValueIfKeyCodeMissing);
            }
        };
    }, [])
    
    function closeModal(): void {
        modalRef.current?.close();
        setShowMessage(false);
        close(true);
    }

    /**
     * Do not store configuration if player has left empty input fields when trying to save the controller configuration.
     * Store the controller configuration in local storage if all fields are nonempty and contains unique values.
     */
    function confirmSettings(formData: FormData): void {
        console.log(formData);
        console.log(formData.get("A"));
        if (inputRef.current?.value && inputRef.current?.value.length > 0) {
            setShowMessage(false);
            confirm(inputRef.current?.value as string);
            closeModal();
        } else {
            setShowMessage(true);
        }
    }

    /**
     *  Remove the input character in order to prepare the field for the pressed key's code.
     */
    function removeInputCharacter(event: any) {
        event.target.value = '';
    }

    /**
     *  If input text field is empty when focus is removed, add the button's default value instead.
     */
    function addDefaultValueIfEmpty(event: any) {
        event.target.classList.remove('missing');
        if (!event.target.value) {
            event.target.value = event.target.defaultValue;
        }
    }

    /**
     *  Set default value if button has no value.
     */
    function setDefaultValueIfKeyCodeMissing(event: any) {
        if (!event.code) {
            event.target.value = event.target.defaultValue;
        }
    }

    /**
     *  Show key code in input text field.
     */
    function setKeyCode(event: any) {
        removeKeyWhereAlreadyUsed(event);
        event.target.value = event.code;
        event.preventDefault();
    }

    /**
     *  Removes the chosen key from other buttons if already in use.
     */
    function removeKeyWhereAlreadyUsed(event: any) {
        const keyCode = event.code;
        for (const key of keys) {
            if (Object.is(key.value, keyCode)) {
                key.value = '';
            }
        }
    }
    
    return (
        <dialog autoFocus id="controllerModal" ref={modalRef} className="modal-dialog">
            <h1 className="modal-text bit-font"> {text} </h1>

            <form className="modal-content" action={confirmSettings}>
                <section className="controllers">
                    <section className="player1-controller">
                        <h2 className="bit-font">Player 1</h2>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.up.value} className="key form__field" id={player1.up.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Up
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.down.value} className="key form__field" id={player1.down.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Down
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.left.value} className="key form__field" id={player1.left.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Left
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.right.value} className="key form__field" id={player1.right.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Right
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.a.value} className="key form__field" id={player1.a.button} autoComplete="off" name="A" />
                            <legend className="form__field-label">
                                A
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.b.value} className="key form__field" id={player1.b.button} autoComplete="off" />
                            <legend className="form__field-label">
                                B
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.start.value} className="key form__field" id={player1.start.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Start
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player1.select.value} className="key form__field" id={player1.select.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Select
                            </legend>
                        </fieldset>
                    </section>

                    <section className="player2-controller">
                        <h2 className="bit-font">Player 2</h2>
                        <fieldset className="controller-input">
                            <input type="text" value={player2.up.value} className="key form__field" id={player2.up.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Up
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.down.value} className="key form__field" id={player2.down.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Down
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.left.value} className="key form__field" id={player2.left.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Left
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.right.value} className="key form__field" id={player2.right.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Right
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.a.value} className="key form__field" id={player2.a.button} autoComplete="off" />
                            <legend className="form__field-label">
                                A
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.b.value} className="key form__field" id={player2.b.button} autoComplete="off" />
                            <legend className="form__field-label">
                                B
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.start.value} className="key form__field" id={player2.start.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Start
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={player2.select.value} className="key form__field" id={player2.select.button} autoComplete="off" />
                            <legend className="form__field-label">
                                Select
                            </legend>
                        </fieldset>
                    </section>
                </section>

                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            Could not save controller settings
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