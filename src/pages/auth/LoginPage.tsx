import { useRef, type ReactElement } from "react";
import type { AuthenticationRequest } from "../../types/types";
import { login } from "../../requests";

import "./LoginPage.css";

/**
 * Authenticate an existing user/account.
 */
export default function LoginPage(): ReactElement {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    /**
     * Send a request to the authentication endpoint to perform a login.
     */
    async function loginUser(): Promise<void> {
        const request: AuthenticationRequest = {
            email: emailRef.current?.value ?? "",
            password: passwordRef.current?.value ?? ""
        }

        await login(request);
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
                            className="form-control" 
                            required
                        />
                    </section>

                    <button type="submit" className="retro-button"> Sign in </button>
                </form>
            </section>
        </main>
    )
}