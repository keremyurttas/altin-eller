import Link from "next/link";
import React from "react";

type Props = { pricingCards: PricingCard[] };

type PricingCard = {
  subtitle: string;
  title: string;
  features: string[];
  icon: React.ElementType | React.ElementType[];
};

const PricingSection = ({ pricingCards }: Props) => {
  return (
    <section className="pricing-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>DERSLERİMİZ</span>
              <h2>KENDİ PLANINI SEÇ</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {pricingCards.map((item) => (
            <div key={item.title} className="col-lg-4 col-md-8 relative">
              <div className="ps-item">
                <h3>{item.subtitle}</h3>
                <div className="pi-price">
                  <h2>{item.title}</h2>
                </div>
                <ul>
                  {item.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link
                  href="/contact-us#register-form"
                  className="primary-btn pricing-btn font-mulish"
                >
                  KAYIT OL
                </Link>
                <div className="thumb-icon hoop-animation">
                  {Array.isArray(item.icon)
                    ? item.icon.map((Icon, index) => <Icon key={index} />)
                    : React.createElement(item.icon)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(PricingSection);
