"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { galleryItems } from "@/data/galleryItems";

type Member = {
  fullName: string;
  title: string;
  imageUrl: string;
};
type Props = { ourTeamMembers: Member[] };
export default function TeamSection(props: Props) {
  return (
    <section className="team-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="team-title">
              <div className="section-title">
                <span>EKİBİMİZ</span>
                <h2>PROFESYONELLERLE ÇALIŞIN</h2>
              </div>
              <a
                href="#"
                className="primary-btn btn-normal appoinment-btn font-mulish"
              >
                KAYIT OL
              </a>
            </div>
          </div>
        </div>
        <div className="relative pb-12">
          <div className="swiper-container overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={20}
              navigation
              speed={1000}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
                768: { slidesPerView: 2, slidesPerGroup: 2 },
                0: { slidesPerView: 1, slidesPerGroup: 1 },
              }}
            >
              {props.ourTeamMembers.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className="ts-item"
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="ts_text">
                      <h4>{item.fullName}</h4>
                      <span>{item.title}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>

      <style jsx scoped>{`
        .swiper-container {
          position: relative;
          padding-bottom: 30px;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
        .swiper-pagination-bullet {
          width: 20px;
          height: 5px;
          border-radius: 0;
          margin: 0 4px;
          background: #ccc;
          transform: skewY(-5deg);
        }
        .swiper-pagination-bullet-active {
          background: var(--primary);
        }
        .swiper-button-prev,
        .swiper-button-next {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
