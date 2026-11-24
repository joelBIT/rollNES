import { type ReactElement, useActionState } from "react";
import { sendContactMessageRequest } from "../../requests";
import { getErrorMessage } from "../../errors";

import "./ContactForm.css";

type Fields = { name: string, email: string, subject: string, message: string };
type FormState = { status: "idle" | "success" | "error", text: string, fields: Fields };

const EMPTY_FIELDS: Fields = { name: "", email: "", subject: "", message: "" };
const INITIAL_STATE: FormState = { status: "idle", text: "", fields: EMPTY_FIELDS };

async function sendMessage(_previous: FormState, formData: FormData): Promise<FormState> {
    const fields: Fields = {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        subject: String(formData.get("subject") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim()
    };

    const sent: FormState = { status: "success", text: "Message sent.", fields: EMPTY_FIELDS };

    if (formData.get("website")) {      // Honeypot: real users never see this field, bots fill it. Pretend it worked.
        return sent;
    }

    try {
        await sendContactMessageRequest({
            name: fields.name || null,
            email: fields.email,
            subject: fields.subject || null,
            message: fields.message
        });
    } catch (error) {
        reportError(error);
        return { status: "error", text: getErrorMessage(error, "Could not send your message"), fields };     // Keep what the user typed
    }

    return sent;
}

export function ContactForm(): ReactElement {
    const [state, formAction, isPending] = useActionState(sendMessage, INITIAL_STATE);
    
    return (
        <form id="contactForm" action={formAction}>
                      <h2 id="contactForm__heading"> Send a message </h2>
            <p id="contactForm__text"> RollNES will get back to you within 24-48 hours. </p>

            <section className="information-input">
                <label className="input-label" htmlFor="name"> Name </label>
                <input id="name" name="name" type="text" className="input-field" autoComplete="none"
                    defaultValue={state.fields.name} maxLength={100} />
            </section>

            <section className="information-input">
                <label className="input-label required" htmlFor="email"> Email </label>
                <input id="email" name="email" type="email" className="input-field" autoComplete="none"
                    defaultValue={state.fields.email} maxLength={254} required />
            </section>

            <section className="information-input">
                <label className="input-label" htmlFor="subject"> Subject </label>
                <input id="subject" name="subject" type="text" className="input-field" autoComplete="off"
                    defaultValue={state.fields.subject} maxLength={150} />
            </section>

            <section className="information-input">
                <label className="input-label required" htmlFor="message"> Message </label>
                <textarea id="message" name="message" className="input-field"
                    defaultValue={state.fields.message} maxLength={5000} required />
            </section>

            {/* Honeypot, hidden from users and assistive tech */}
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px" }} />

            {state.text && (
                <h2 className={state.status === "error" ? "message-failure" : "message-success"} role="status">
                    {state.text}
                </h2>
            )}

            <button id="sendButton" className="sendButton" type="submit" disabled={isPending}>
                <span> {isPending ? "Sending..." : "Send"} </span>
            </button>
        </form>
    );
}