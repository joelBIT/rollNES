import type { ReactElement } from "react";

import "./ManageRightsPage.css";

/**
 * Information about how RollNES handles email addresses registered for subscription.
 */
export default function ManageRightsPage(): ReactElement {
    return (
        <main id="manageRightsPage">
            <h2 id="manageRightsPage__heading"> Data Rights Notice </h2>

            <section className="privacy-rights">
                <h2 className="privacy-rights__heading"> Game additions </h2>

                <p className="privacy-rights__text">
                    RollNES has a legitimate interest in using your email address to notify you when support for new games have been added. 
                    Your email address will be retained until you are notified and will be available to our marketing and e-commerce teams, as 
                    well as to our service providers. It may be transferred to non-European countries that ensure an adequate level of protection
                    or under the standard contractual clauses adopted by the EU Commission. Please note that you may access your data and request
                    their rectification or deletion. You may also object to, or request the limitation of, the processing of your data. 
                    To exercise your rights or for any question on the processing of your data, please contact Retro Store's Data Protection Officer.
                    If nevertheless you believe RollNES did not adequately address your concerns and mishandled your data, you may lodge 
                    a complaint with the personal data protection authority of your country. 
                </p>
            </section>

            <section className="privacy-rights">
                <h2 className="privacy-rights__heading"> RollNES newsletter </h2>

                <p className="privacy-rights__text">
                    By providing your email address, you consent to receiving RollNES newsletter, as well as updates and offers. 
                    Your email address will be available to RollNES marketing team and its technical service providers and it will be retained 
                    for 25 months from your subscription or last contact, whichever is latest. It may be transferred to countries outside the 
                    European Economic Area ensuring an adequate level of protection according to the European Commission or within the framework 
                    of safeguards that assure the protection of your personal information, such as the standard contractual clauses adopted by 
                    the European Commission. Please note that you may withdraw your consent at any time using the link included in the newsletter. 
                    You may access your data, rectify it, request its deletion, exercise your right to data portability or to the restriction of 
                    its processing. To exercise these rights or for any question on the processing of your data, please contact RollNES'
                    Data Protection Officer. If you believe, after contacting us, that your rights over your data have not been respected, 
                    you can send a complaint to the personal data protection authority of your country.
                </p>
            </section>
        </main>
    );
}