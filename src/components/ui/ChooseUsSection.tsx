import { Item } from "@/lib/types";

type Props = {
  items: Item[];
};

export default function ChooseUsSection({ items }: Props) {
  return (
    <section className="choseus-section spad">
      <div className="container">
        <header className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>En iyilerle çalış</span>
              <h2>En iyisi sen ol!</h2>
            </div>
          </div>
        </header>
        <div className="row">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="cs-item">
                  <div className="cs-icon" aria-hidden="true">
                    <IconComponent size={36} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
