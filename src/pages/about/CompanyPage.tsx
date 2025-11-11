import type { ReactElement } from "react";

import "./CompanyPage.css";

export default function CompanyPage(): ReactElement {
    return (
        <main id="companyPage">
            <section id="company-content">
                <section id="company-history">
                    <h1 id="company-history__subheading"> About the site </h1>
                    <h1 id="company-history__heading" className="baskervville-sc-regular"> RollNES </h1>

                    <p id="company-history__text">
                        RollNES started its journey in 2025, by retro lovers with complementary backgrounds to the retro and IT markets. 
                    </p>
                </section>

                <section id="company-statistics">
                    <section className="company-statistic ratings-border">
                        <img src="/rating.svg" className="company-icon" alt="Company rating icon" title="Company rating" />
                        <h2 className="company-statistic__heading"> Rating </h2>
                        <p className="company-statistic__text"> 97% Satisfaction </p>
                    </section>

                    <section className="company-statistic sold-border">
                        <img src="/sold-products.svg" className="company-icon" alt="Sold products icon" title="Sold Products in total" />
                        <h2 className="company-statistic__heading"> Retro Games </h2>
                        <p className="company-statistic__text"> 900+ </p>
                    </section>

                    <section className="company-statistic customers-border">
                        <img src="/customers.svg" className="company-icon" alt="Customers icon" title="Company customers" />
                        <h2 className="company-statistic__heading"> Users </h2>
                        <p className="company-statistic__text"> 2K+ </p>
                    </section>
                </section>                
            </section>
        </main>
    )
}