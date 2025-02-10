"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";

const images = [
  "https://ik.imagekit.io/dyw3rzban/M%C4%B0N%C4%B0K%20TAKIM/_IGP5496.JPG?updatedAt=1739119318202",
  "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5091.JPG?updatedAt=1739119466655",
];
export default function FullscreenSwiper() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile: < 768px (Tailwind's md)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 8000, disableOnInteraction: false }}
      loop={true}
      navigation={!isMobile} // Enable arrows only on larger screens
      pagination={isMobile ? { clickable: true } : false} // Enable pagination only on mobile
      className="h-screen w-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="relative">
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-8 md:p-0">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text">
                  <span className="md:text-2xl text-xl font-mulish  ">
                    Hedeflerine bizimle ulaş
                  </span>
                  <h1 className="md:text-7xl text-3xl font-oswald mb-8">
                    <strong className="text-primary text-4xl md:text-8xl uppercase">
                      Altıneller
                    </strong>
                    <br />
                    Spor Kulübü
                  </h1>
                  <a href="#" className="primary-btn font-mulish">
                    BİLGİ ALIN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
