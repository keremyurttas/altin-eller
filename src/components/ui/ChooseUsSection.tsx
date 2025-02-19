import { Item } from "@/data/chooseUsItems";

type Props = {
  items: Item[];
};
export default function ChooseUsSection(Props: Props) {
  return (
    <section className="choseus-section spad ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Why chose us?</span>
              <h2>PUSH YOUR LIMITS FORWARD</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {Props.items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="cs-item">
                  <div className="cs-icon">
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
