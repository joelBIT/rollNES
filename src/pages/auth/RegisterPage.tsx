import { useRef, useState, type ReactElement } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import type { RegisterRequest } from "../../types/types";
import { URL_DASHBOARD_PAGE, URL_LOGIN_PAGE } from "../../utils";

import "./RegisterPage.css";

/**
 * Register a new account/user.
 */
export default function RegisterPage(): ReactElement {
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const { register } = useUser();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    /**
     * Send a request to the registration endpoint if passwords match.
     */
    async function registerUser(): Promise<void> {
        setMessage('');
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (password !== confirmPassword) {
            console.log("Passwords must be equal");
            return;
        }

        const request: RegisterRequest = {
            email: emailRef.current?.value ?? "",
            firstName: firstNameRef.current?.value ?? "",
            lastName: lastNameRef.current?.value ?? "",
            password: password ?? ""
        }

        try {
            await register(request);
            navigate(URL_DASHBOARD_PAGE);
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage(`Could not register with email ${request.email}`);
            }
        }
    }

    return (
        <main id="registerPage">
            <section id="register-section">
                <div className="stripe"></div>

                <h1 className="register-section__heading"> NEW TO ROLLNES? </h1>
                <p className="register-section__text"> Create an account to get personalized settings and services. </p>

                <form id="register-form" autoComplete="off" action={registerUser}>
                    <input autoComplete="false" name="hidden" type="text" style={{"display": "none"}} />

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="register-form-email"> EMAIL </label>
                        <input 
                            id="register-form-email" 
                            name="register-form-email" 
                            type="email" 
                            placeholder="Email" 
                            autoComplete="off"
                            className="form-control" 
                            ref={emailRef}
                            required
                        />
                    </section>

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="register-form-firstName"> FIRST NAME </label>
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
                        <label className="form-control__label" htmlFor="register-form-lastName"> LAST NAME </label>
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

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="register-form-password"> PASSWORD </label>
                        <input 
                            id="register-form-password" 
                            name="register-form-password" 
                            type="password" 
                            placeholder="Password" 
                            autoComplete="off"
                            className="form-control" 
                            ref={passwordRef}
                            required
                        />
                    </section>

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="register-form-password-repeat"> CONFIRM PASSWORD </label>
                        <input 
                            id="register-form-password-repeat" 
                            name="register-form-password-repeat" 
                            type="password" 
                            placeholder="Confirm Password" 
                            autoComplete="off"
                            className="form-control" 
                            ref={confirmPasswordRef}
                            required
                        />
                    </section>

                    <button type="submit" className="nes-button"> Create Account </button>
                </form>

                <div className="divider">OR</div>
                <p className="signin">Already have an account? <Link to={URL_LOGIN_PAGE}> Sign in</Link></p>
            </section>

            {
                message ? <h2 className="message-failure"> { message }</h2> : <></>
            }
        </main>
    )
}