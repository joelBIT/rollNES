import { useEffect, useState, type ReactElement } from "react";
import { useUser } from "../../hooks/useUser";
import { getErrorMessage, reportError } from "../../errors";

import "./ProfileForm.css";

/**
 * Profile information.
 */
export function ProfileForm(): ReactElement {
    const { user, updateUser } = useUser();
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(user?.first_name ?? "");
    const [lastName, setLastName] = useState<string>(user?.last_name ?? "");

    useEffect(() => {
        setFirstName(user?.first_name ?? "");
        setLastName(user?.last_name ?? "");
    }, [user?.first_name, user?.last_name]);

    /**
     * Store profile information.
     */
    async function updateProfile(): Promise<void> {
        setMessage('');
        setIsError(false);

        try {
            await updateUser(firstName.trim(), lastName.trim());
            setMessage('Profile updated');
        } catch (error) {
            reportError(error);
            setIsError(true);
            setMessage(getErrorMessage(error, "Update failed"));
        }
    }

    return (
        <form id="profileForm" autoComplete="off" action={updateProfile}>
            <section className="form-group">
                <label className="form-control__label" htmlFor="profile-form-email"> Email </label>
                <input 
                    id="profile-form-email"
                    name="profile-form-email"
                    value={user?.email ?? ""}
                    readOnly
                    disabled
                    className="form-control" 
                />
            </section>

            <section className="form-group">
                <label className="form-control__label" htmlFor="profile-form-firstName"> First name </label>
                <input 
                    id="profile-form-firstName" 
                    name="profile-form-firstName" 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    autoComplete="off"
                    className="form-control" 
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
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    autoComplete="off"
                    className="form-control" 
                    required
                />
            </section>

            {
                message ? <h2 className={isError ? "message-failure" : "message-success"}> {message} </h2> : <></>
            }

            <button type="submit" className="retro-button update-button" disabled={!user}> Update </button>
        </form>
    )
}