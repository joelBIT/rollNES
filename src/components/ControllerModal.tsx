import { type ReactElement, useEffect, useRef, useState } from "react";

import "./ControllerModal.css";
import { getControllerConfigurationMap } from "../config/config";

/**
 * Modal used for configuration of player 1 and player 2 controls.
 */
export function ControllerModal({ text, close }: { text: string, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const keys = document.getElementsByClassName('key') as HTMLCollectionOf<HTMLInputElement>;
    const controllers = getControllerConfigurationMap();

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
                            <input type="text" value={controllers.get('ArrowUp')} className="key form__field" id="ArrowUp" autoComplete="off" />
                            <legend className="form__field-label">
                                Up
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowDown')} className="key form__field" id="ArrowDown" autoComplete="off" />
                            <legend className="form__field-label">
                                Down
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowLeft')} className="key form__field" id="ArrowLeft" autoComplete="off" />
                            <legend className="form__field-label">
                                Left
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowRight')} className="key form__field" id="ArrowRight" autoComplete="off" />
                            <legend className="form__field-label">
                                Right
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('A')} className="key form__field" id="A" autoComplete="off" name="A" />
                            <legend className="form__field-label">
                                A
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('B')} className="key form__field" id="B" autoComplete="off" />
                            <legend className="form__field-label">
                                B
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('Start')} className="key form__field" id="Start" autoComplete="off" />
                            <legend className="form__field-label">
                                Start
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('Select')} className="key form__field" id="Select" autoComplete="off" />
                            <legend className="form__field-label">
                                Select
                            </legend>
                        </fieldset>
                    </section>

                    <section className="player2-controller">
                        <h2 className="bit-font">Player 2</h2>
                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowUp2')} className="key form__field" id="ArrowUp2" autoComplete="off" />
                            <legend className="form__field-label">
                                Up
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowDown2')} className="key form__field" id="ArrowDown2" autoComplete="off" />
                            <legend className="form__field-label">
                                Down
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowLeft2')} className="key form__field" id="ArrowLeft2" autoComplete="off" />
                            <legend className="form__field-label">
                                Left
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('ArrowRight2')} className="key form__field" id="ArrowRight2" autoComplete="off" />
                            <legend className="form__field-label">
                                Right
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('A2')} className="key form__field" id="A2" autoComplete="off" />
                            <legend className="form__field-label">
                                A
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('B2')} className="key form__field" id="B2" autoComplete="off" />
                            <legend className="form__field-label">
                                B
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('Start2')} className="key form__field" id="Start2" autoComplete="off" />
                            <legend className="form__field-label">
                                Start
                            </legend>
                        </fieldset>

                        <fieldset className="controller-input">
                            <input type="text" value={controllers.get('Select2')} className="key form__field" id="Select2" autoComplete="off" />
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