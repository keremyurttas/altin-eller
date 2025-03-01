"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const desktopImages = [
  "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5380.JPG?updatedAt=1739119476294",
  "https://ik.imagekit.io/dyw3rzban/IMG_7515.jpeg?updatedAt=1739824148682",
];

const mobileImages = [
  "https://ik.imagekit.io/dyw3rzban/_IGP5380%20(3).jpg?updatedAt=1740846725823", // Replace with actual mobile image URLs
  "https://ik.imagekit.io/dyw3rzban/IMG_8132.png?updatedAt=1739824156362",
];

export default function FullscreenSwiper() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect screen width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile: < 768px (Tailwind's md)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages; // Dynamically select image set

  return (
    <Swiper
      aria-label="Ana Sayfa Resimleri"
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation={!isMobile}
      pagination={isMobile ? { clickable: true } : false}
      className="h-screen w-full"
      speed={1000}
      autoplay={{ delay: 5000 }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active slide
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="relative w-full h-full">
          <Image
            src={src}
            quality={80}
            alt={`Slayt ${index + 1}`}
            className="w-full h-full object-cover"
            sizes="100vw"
            priority={index === 0}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3C/svg%3E"
            fill
          />
          <div className="absolute -right-10 -top-40 h-[200%] w-[50%] sm:w-[50%] rotate-[15deg] transform flex">
            <div className="w-1/3 bg-black h-full opacity-40"></div>
            <div className="w-1/3 bg-primary opacity-50 h-full "></div>
            <div className="w-2/3 bg-primary h-full opacity-70"></div>
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-8 md:p-0">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div
                  className={`hi-text transition-all duration-700  ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <span className="md:text-2xl text-xl font-mulish">
                    Hedeflerine bizimle ulaş
                  </span>
                  <h1 className="md:text-7xl text-3xl font-oswald mb-8">
                    <strong className="text-primary text-4xl md:text-8xl uppercase">
                      Altıneller
                    </strong>
                    <br />
                    Spor Kulübü
                  </h1>
                  <a
                    href="/contact-us#register-form"
                    className="primary-btn font-mulish hover:scale-110 transition-transform"
                  >
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
