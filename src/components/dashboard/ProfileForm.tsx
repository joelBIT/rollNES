import { useRef, useState, type ReactElement } from "react";
import type { RetroUser } from "../../types/types";

import "./ProfileForm.css";

/**
 * Profile information.
 */
export function ProfileForm({user}: {user: RetroUser}): ReactElement {
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
                    <label className="form-control__label" htmlFor="profile-form-email"> Email </label>
                    <input 
                        id="profile-form-email"
                        name="profile-form-email"
                        value={user.email}
                        readOnly
                        disabled
                        className="form-control" 
                    />
                </section>

                <section className="form-group">
                    <label className="form-control__label" htmlFor="register-form-firstName"> First name </label>
                    <input 
                        id="profile-form-firstName" 
                        name="profile-form-firstName" 
                        type="text" 
                        placeholder="First Name" 
                        defaultValue={user.first_name}
                        autoComplete="off"
                        className="form-control" 
                        ref={firstNameRef}
                        required
                    />
                </section>

                <section className="form-group">
                    <label className="form-control__label" htmlFor="profile-form-lastName"> Last name </label>
                    <input 
                        id="profile-form-lastName" 
                        name="profile-form-lastName" 
                        type="text" 
                        placeholder="Last Name" 
                        defaultValue={user.last_name}
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