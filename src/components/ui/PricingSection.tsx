type Props = { pricingCards: PricingCard[] };

type PricingCard = {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
};

export default function PricingSection(Props: Props) {
  return (
    <section className="pricing-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>PAKETLERİMİZ</span>
              <h2>KENDİ PLANINI SEÇ</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {Props.pricingCards.map((item, index) => {
            return (
              <div key={index} className="col-lg-4 col-md-8">
                <div className="ps-item">
                  <h3>{item.title}</h3>
                  <div className="pi-price">
                    <h2>{item.price}</h2>
                    <span>{item.subtitle}</span>
                  </div>
                  <ul>
                    {item.features.map((feature, index) => {
                      return <li key={index}>{feature}</li>;
                    })}
                  </ul>
                  <a href="/contact-us#register-form" className="primary-btn pricing-btn font-mulish">
                    KAYIT OL
                  </a>
                  <a href="#" className="thumb-icon">
                    <i className="fa fa-picture-o"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
