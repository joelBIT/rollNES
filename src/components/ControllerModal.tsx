import { type ReactElement, useEffect, useRef, useState } from "react";

import "./ControllerModal.css";

/**
 * Modal used for configuration of player 1 and player 2 controls.
 */
export function ControllerModal({ text, close }: { text: string, close: (toggle: boolean) => void }): ReactElement {
    const [ showMessage, setShowMessage ] = useState<boolean>();
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
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
    function confirmSettings(): void {
        if (inputRef.current?.value && inputRef.current?.value.length > 2) {
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

            <form method="dialog" className="modal-content">
                <section className="controllers">
                    <section className="player1-controller">
                        <h2 className="bit-font">Player 1</h2>
                        <article><h3>Up</h3><input type="text" value="ArrowUp" className="key" id="ArrowUp" /></article>
                        <article><h3>Down</h3><input type="text" value="ArrowDown" className="key" id="ArrowDown"/></article>
                        <article><h3>Left</h3><input type="text" value="ArrowLeft" className="key" id="ArrowLeft"/></article>
                        <article><h3>Right</h3><input type="text" value="ArrowRight" className="key" id="ArrowRight"/></article>
                        <article><h3>A</h3><input type="text" value="KeyX" className="key" id="A"/></article>
                        <article><h3>B</h3><input type="text" value="KeyZ" className="key" id="B"/></article>
                        <article><h3>Start</h3><input type="text" value="KeyS" className="key" id="Start"/></article>
                        <article><h3>Select</h3><input type="text" value="KeyA" className="key" id="Select"/></article>
                    </section>

                    <section className="player2-controller">
                        <h2 className="bit-font">Player 2</h2>
                        <article><h3>Up</h3><input type="text" value="KeyU" className="key" id="ArrowUp2"/></article>
                        <article><h3>Down</h3><input type="text" value="KeyJ" className="key" id="ArrowDown2"/></article>
                        <article><h3>Left</h3><input type="text" value="KeyH" className="key" id="ArrowLeft2"/></article>
                        <article><h3>Right</h3><input type="text" value="KeyK" className="key" id="ArrowRight2"/></article>
                        <article><h3>A</h3><input type="text" value="KeyG" className="key" id="A2"/></article>
                        <article><h3>B</h3><input type="text" value="KeyF" className="key" id="B2"/></article>
                        <article><h3>Start</h3><input type="text" value="KeyT" className="key" id="Start2"/></article>
                        <article><h3>Select</h3><input type="text" value="KeyR" className="key" id="Select2"/></article>
                    </section>
                </section>

                <section className="dialog-buttons">
                    <button className="retro-button close-button" onClick={closeModal}> Close </button>
                    <button className="retro-button save-button" onClick={confirmSettings}> Save </button>
                </section>
                
                { 
                    showMessage ? 
                        <h2 className="message-failure">
                            Could not save controller settings
                        </h2> : <></> 
                }
            </form>
        </dialog>
    );
}