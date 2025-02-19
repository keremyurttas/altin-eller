"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { TeamMember } from "@/lib/notion";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  useEffect(() => {
    fetch("/api/get-team-members")
      .then((response) => response.json())
      .then((data) => {
        setTeamMembers(data);
        console.log(data);
      });
  }, []);
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
                href="/contact-us#register-form"
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
              modules={[Pagination, Autoplay, Navigation]}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={20}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              speed={1000}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
                768: { slidesPerView: 2, slidesPerGroup: 2 },
                0: { slidesPerView: 1, slidesPerGroup: 1 },
              }}
            >
              {teamMembers.map((item, index) => (
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
                      <h4>{item.name}</h4>
                      <span className="text-primary">{item.title}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
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
        :global(.swiper-pagination-bullet) {
          width: 20px;
          height: 5px;
          border-radius: 0;
          margin: 0 4px;
          background: white;
          transform: skewY(-5deg);
        }
        :global(.swiper-pagination-bullet-active) {
          background: var(--primary);
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: var(--primary);
        }
      `}</style>
    </section>
  );
}
