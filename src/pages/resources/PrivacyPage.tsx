import type { ReactElement } from "react";

import "./PrivacyPage.css";

export default function PrivacyPage(): ReactElement {
    return (
        <main id="privacyPage">
            <h2 id="privacyPage__heading"> Privacy </h2>

            <section className="privacy-sections">
                <p className="privacy-sections__text">
                    RollNES operates this emulator and website, including all related information, content, features, tools, products and services, 
                    in order to provide you, the user, with a curated retro experience. This Privacy Policy describes how we collect, 
                    use, and disclose your personal information when you visit or use the 
                    Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this 
                    Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
                </p>

                <p className="privacy-sections__text">
                    Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read 
                    this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                </p>
            </section>

            <section className="privacy-sections">
                <h2 className="privacy-sections__heading"> Personal Information We Collect or Process </h2>

                <p className="privacy-sections__text">
                    When we use the term “personal information,” we are referring to information that identifies or can reasonably be linked to you 
                    or another person. Personal information does not include information that is collected anonymously or that has been de-identified,
                    so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal 
                    information, including inferences drawn from this personal information, depending on how you interact with the Services, 
                    where you live, and as permitted or required by applicable law:
                </p>

                <ul className="privacy-sections__list">
                    <li><b>Contact details</b> including your name, address, phone number, and email address.</li>
                    <li><b>Account information</b> including your username, password, preferences and settings.</li>
                    <li><b>Communications with us</b> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                    <li><b>Device information</b> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                    <li><b>Usage information</b> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                </ul>
            </section>
        </main>
    );
}