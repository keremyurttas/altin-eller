"use client";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  description: string;
  images: { url: string }[];
}

export default function Popup({
  isOpen,
  onClose,
  title,
  date,
  description,
  images,
}: PopupProps) {
  const [visible, setVisible] = useState(isOpen);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setFadeOut(false);
    } else {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      onClick={() => {
        setFadeOut(true);
        setTimeout(onClose, 300);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#171717] rounded-lg shadow-lg p-10 w-full max-w-6xl h-[80vh] relative overflow-auto ${
          fadeOut ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setFadeOut(true);
            setTimeout(onClose, 300);
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-primary"
        >
          <FaTimes size={20} />
        </button>

        {/* Swiper with Navigation */}
        <div className="relative">
          <Swiper
            className="h-[50vh] w-full"
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <Image
                  width={0}
                  height={0}
                  layout="responsive"
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev !text-white hover:!text-primary"></div>
          <div className="swiper-button-next !text-white hover:!text-primary"></div>
        </div>

        {/* Title, Date & Description */}
        <div className="mt-4 text-mulish text-center">
          <h2 className="text-4xl font-bold text-primary">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">{date.toString()}</p>
          <p className="text-[#e0e0e0] mt-3 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <style jsx scoped>{`
        /* Pagination Bullet Customization */
        :global(.swiper-pagination-bullet) {
          background-color: #e0e0e0 !important;
          width: 12px;
          height: 12px;
          opacity: 0.6;
          transition: opacity 0.3s ease-in-out;
        }

        :global(.swiper-pagination-bullet-active) {
          background-color: var(--primary) !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
