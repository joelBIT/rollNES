import { type ReactElement } from "react";
import type { Button } from "../../types/types";

import "./ControllerInput.css";

export function ControllerInput({button, label, onKeyDown}: {button: Button, label: string, onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void}): ReactElement {
    return (
        <fieldset className="controller-input">
            <input 
                type="text" 
                defaultValue={button?.value} 
                className="key-controller form__field" 
                onKeyDown={e => onKeyDown(e)}
                form="controllerForm"
                name={button?.button}
                autoComplete="off" 
            />

            <legend className="form__field-label">
                { label }
            </legend>
        </fieldset>
    );
}