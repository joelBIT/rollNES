import { useRef, useState, type ReactElement } from "react";
import type { AuthenticationRequest } from "../../types/types";
import { loginRequest } from "../../requests";

import "./LoginPage.css";

/**
 * Authenticate an existing user/account.
 */
export default function LoginPage(): ReactElement {
    const [message, setMessage] = useState<string>('');
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    /**
     * Send a request to the authentication endpoint to perform a login.
     */
    async function loginUser(): Promise<void> {
        setMessage('');
        const request: AuthenticationRequest = {
            email: emailRef.current?.value ?? "",
            password: passwordRef.current?.value ?? ""
        }

        try {
            const response = await loginRequest(request);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('Login failed');
            }
        }
    }

    return (
        <main id="loginPage">
            <section id="login-section">
                <h1 className="login-section__heading"> Welcome Back </h1>
                <p className="login-section__text"> Sign in to your existing account for personalized services. </p>

                <form id="login-form" autoComplete="off" action={loginUser}>
                    <input autoComplete="false" name="hidden" type="text" style={{"display": "none"}} />

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="login-form-email"> Email </label>
                        <input 
                            id="login-form-email" 
                            name="login-form-email" 
                            type="email" 
                            placeholder="Email" 
                            autoComplete="off"
                            ref={emailRef}
                            className="form-control" 
                            required
                        />
                    </section>

                    <section className="form-group">
                        <label className="form-control__label" htmlFor="login-form-password"> Password </label>
                        <input 
                            id="login-form-password" 
                            name="login-form-password" 
                            type="password" 
                            placeholder="Password" 
                            autoComplete="off"
                            ref={passwordRef}
                            className="form-control" 
                            required
                        />
                    </section>

                    <button type="submit" className="retro-button"> Sign in </button>
                </form>
            </section>

            {
                message ? <h2 className="message-failure"> { message } </h2> : <></>
            }
        </main>
    )
}