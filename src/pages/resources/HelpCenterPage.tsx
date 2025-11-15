import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { FAQ } from "../../components";

import "./HelpCenterPage.css";

/**
 * Page for frequently asked questions.
 */
export default function HelpCenterPage(): ReactElement {

    const FAQs = [
        {question: "I cannot find a specific game. Why?", answer: <AnswerOne />},
        {question: "Which mappers do you have support for?", answer: <AnswerTwo />},
        {question: "Can I use this site to see all games released for the NES?", answer: <AnswerThree />},
        {question: "What should I do if I want to play an unsupported game?", answer: <AnswerFour />},
        {question: "Why is the game slow?", answer: <AnswerFive />}
    ]

    return (
        <main id="helpCenterPage">
            <h1 id="help__heading"> Help Center </h1>
            
            <p id="help__text">
                Answers to some frequently asked questions. If you have any other issues not answered here, please let me know by emailing 
                <a href="mailto:contact@joel-rollny.eu"> contact@joel-rollny.eu</a>.
            </p>

            <section id="help-questions">
                {
                    FAQs.map(faq => <FAQ faq={faq} key={faq.question} />)
                }
            </section>
        </main>
    );
}

function AnswerOne(): ReactNode {
    return (
        <section className="answer-section">
            <p className="answer-section__text">
                Not all mappers are implemented for the emulator which means there are games that are not supported yet. 
                Only games that are playable in the RollNES emulator can be found on this site.
            </p>
        </section>
    );
}

function AnswerTwo(): ReactNode {
    return (
        <section className="answer-section">
            <p className="answer-section__text">
                Mappers implemented for the RollNES emulator are mapper 0, 1, 2, 3, 4, 7, 9, 66, and 69. Check out the
                <Link className="answer-section__link" target="_blank" to="https://github.com/joelBIT/nes-emulator"> emulator github page </Link>
                for the most up-to-date list of supported mappers.
            </p>
        </section>
    );
}

function AnswerThree(): ReactNode {
    return (
        <section className="answer-section">
            <p className="answer-section__text">
                No. The games you find on this site is the games that the RollNES emulator supports. If you want a more or less complete
                list of all games released for the NES you can visit the 
                <Link className="answer-section__link" target="_blank" to="https://8bit-catalog.joel-rollny.eu/"> 8-bit Catalog</Link>.
            </p>
        </section>
    );
}

function AnswerFour(): ReactNode {
    return (
        <section className="answer-section">
            <p className="answer-section__text">
                You can add desired games to your wishlist in your account, or contact me directly at
                <a href="mailto:contact@joel-rollny.eu" className="answer-section__link"> contact@joel-rollny.eu</a>.
                I will implement corresponding mapper to enable support as soon as possible.
            </p>
        </section>
    );
}

function AnswerFive(): ReactNode {
    return (
        <section className="answer-section">
            <p className="answer-section__text">
                Some browsers, like Mozilla Firefox, have an inferior implementation affecting the performance of games. Chrome is an example 
                of a browser with good gaming performance.
            </p>
        </section>
    );
}