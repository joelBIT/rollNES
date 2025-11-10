import type { ReactElement } from "react";

import "./Logo.css";

export function Logo(): ReactElement {
    return (
        <figure id="logo">
            <img src="/logo.png"  className="logo" alt={"Logo of page"}/>
            <img src="/logo-mobile.png" className="logo-mobile" alt={"Logo of page in mobile view"}/>
        </figure>
    );
}