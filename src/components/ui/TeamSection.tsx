"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { TeamMember } from "@/lib/notion"; // Ensure this includes imageUrl, name, title
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function TeamSection() {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/get-team-members")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      })
      .finally(() => {
        setLoading(false);
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
              <Link
                href="/our-team"
                className="primary-btn btn-normal appoinment-btn font-mulish hover:text-white"
              >
                TÜM EKİBİMİZ
              </Link>
            </div>
          </div>
        </div>
        <div className="relative pb-12">
          {loading || teamMembers.length === 0 ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          ) : (
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
                      className="ts-item"
                      style={{
                        backgroundImage: `url(${item.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      aria-label={`Team member: ${item.name}, ${item.title}`}
                    >
                      <div className="ts_text">
                        <h3>{item.name}</h3>
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
          )}
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
