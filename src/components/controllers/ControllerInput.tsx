import { useState, type ReactElement } from "react";
import type { Button } from "../../types/types";

import "./ControllerInput.css";

export function ControllerInput({defaultButton, label, onKeyDown}: {defaultButton: Button, label: string, onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void}): ReactElement {
    const [button] = useState<Button>(defaultButton);

    return (
        <fieldset className="controller-input">
            <input 
                type="text" 
                defaultValue={button.value} 
                className="key-controller form__field" 
                onKeyDown={e => onKeyDown(e)}
                form="controller-form"
                name={button.button}
                autoComplete="off" 
            />

            <legend className="form__field-label">
                { label }
            </legend>
        </fieldset>
    );
}