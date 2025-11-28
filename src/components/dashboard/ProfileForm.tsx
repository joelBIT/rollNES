import { useRef, useState, type ReactElement } from "react";

import "./ProfileForm.css";

/**
 * Profile information.
 */
export function ProfileForm(): ReactElement {
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    /**
     * Store profile information.
     */
    function updateProfile(): void {
        setMessage('');
        setIsError(false);
    }

    return (
        <>
            <form id="profileForm" autoComplete="off" action={updateProfile}>
                <section className="form-group">
                    <label className="form-control__label" htmlFor="register-form-email"> Email </label>
                    <input 
                        readOnly
                        disabled
                        className="form-control" 
                    />
                </section>

                <section className="form-group">
                    <label className="form-control__label" htmlFor="register-form-firstName"> First name </label>
                    <input 
                        id="register-form-firstName" 
                        name="register-form-firstName" 
                        type="text" 
                        placeholder="First Name" 
                        autoComplete="off"
                        className="form-control" 
                        ref={firstNameRef}
                        required
                    />
                </section>

                <section className="form-group">
                    <label className="form-control__label" htmlFor="register-form-lastName"> Last name </label>
                    <input 
                        id="register-form-lastName" 
                        name="register-form-lastName" 
                        type="text" 
                        placeholder="Last Name" 
                        autoComplete="off"
                        className="form-control" 
                        ref={lastNameRef}
                        required
                    />
                </section>

                <button type="submit" className="retro-button update-button"> Update </button>
            </form>

            {
                message ? <h2 className={isError ? "message-failure" : "message-success"}> { message }</h2> : <></>
            }
        </>
    )
}