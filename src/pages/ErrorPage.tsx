import { useEffect, type ReactNode } from "react";
import { isRouteErrorResponse, NavLink, useRouteError } from "react-router";
import { URL_HOME } from "../utils";

import "./ErrorPage.css";

export function ErrorPage(): ReactNode {
    const error = useRouteError();
    
    useEffect(() => {
        reportError(error);
    }, [error]);

    let message = "Something went wrong";

    if (isRouteErrorResponse(error)) {
        if (typeof error.data === "string" && error.data.length > 0) {
            message = error.data;
        } else if (error.status === 404) {
            message = "Page Not Found";
        } else {
            message = error.statusText || `Error ${error.status}`;
        }
    } else if (error instanceof Error && import.meta.env.DEV) {
        message = error.message;        // Details only in development, visitors get the generic text
    }

    return (
        <main id="errorPage">
            <h1 className="message-failure"> {message} </h1>
            <NavLink to={URL_HOME} className="retro-button"> Back to start </NavLink>
        </main>
    );
}