import { New } from "@/data/news";
import Image from "next/image";
type Props = {
  news: New[];
};
export default function NewsSection({ news }: Props) {
  return (
    <section className="classes-section spad  ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Classes</span>
              <h2>Bİzden Haberler</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {news.map((item: New, index) => {
            return (
              <div
                className={
                  index > 3
                    ? "col-lg-6"
                    : index == 3
                    ? "col-lg-6 col-md-6"
                    : "col-lg-4 col-md-6"
                }
              >
                <div className="class-item">
                  <div className="ci-pic">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        objectFit: "cover",
                      }}
                      src={item.imageSource}
                      alt={item.title}
                      quality={100}
                    />
                  </div>
                  <div className="ci-text">
                    <h5>{item.title}</h5>
                    <div className="ci-text-bottom-container">
                      <span className="font-mulish">{item.content}</span>

                      <a href="#">
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
