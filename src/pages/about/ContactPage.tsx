import type { ReactElement } from "react";
import { ContactForm } from "../../components";

import "./ContactPage.css";

export default function ContactPage(): ReactElement {
    return (
        <main id="contactPage">
            <section id="contactPage-heading">
                <h2 id="contactPage-heading__heading"> Contact RollNES </h2>
                <p id="contactPage-heading__text"> Get in touch! I am here to quickly provide you with the info and services you need and answer any question you may have. </p>
            </section>

            <section id="contact-information">
                <section className="contact-item">
                    <img src="/mobile-phone.svg" className="phone" alt="phone icon" title="Phone number" />
                    <h2 className="contact-item__heading"> +555 45 45 33 </h2>
                    <p className="contact-item__text"> Call me and expect a response as soon as I am available. </p>
                </section>
                
                <section className="contact-item">
                    <img src="/email.svg" className="email" alt="email icon" title="Email address" />
                    <h2 className="contact-item__heading"> contact@joel-rollny.eu </h2>
                    <p className="contact-item__text"> You can reach me via email and expect a response within 24-48 hours. </p>
                </section>
                
                <section className="contact-item">
                    <img src="/maps-location.svg" className="location" alt="location icon" title="Karlstad" />
                    <h2 className="contact-item__heading"> Karlstad, Sweden </h2>
                    <p className="contact-item__text"> Visit me in Karlstad if you are in the neighborhood. </p>
                </section>
            </section>

            <section id="contactPage-form">
                <h2 id="contactPage-form__heading"> Send me an email: </h2>
                <p id="contactPage-form__text"> Ask me anything! I will get back to you within 24-48 hours. </p>

                <ContactForm />
            </section>
        </main>
    )
}