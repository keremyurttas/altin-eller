"use client";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

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

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFadeOut(true);
        setTimeout(onClose, 300);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

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
        role="dialog"
        aria-labelledby="popup-title"
        className={`bg-[#171717] rounded-lg shadow-lg p-6 md:p-10 w-full max-w-6xl max-h-[90vh] relative overflow-auto ${
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
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        {/* Swiper with Navigation */}
        <div className="relative mb-4">
          <Swiper
            className="w-full aspect-video" // Use aspect-video to maintain consistent image ratio
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            loop={images?.length > 1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
          >
            {(images?.length > 0
              ? images
              : [{ url: PLACEHOLDER_IMAGE_URL }]
            ).map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={image?.url || PLACEHOLDER_IMAGE_URL}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE_URL;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev !text-white hover:!text-primary"></div>
          <div className="swiper-button-next !text-white hover:!text-primary"></div>
        </div>

        {/* Title, Date & Description */}
        <div className="text-mulish text-center">
          <h2 id="popup-title" className="text-2xl md:text-4xl font-bold text-primary">
            {title}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1">{date.toString()}</p>
          <p className="text-[#e0e0e0] mt-3 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #e0e0e0 !important;
          width: 12px;
          height: 12px;
          opacity: 0.6;
          transition: opacity 0.3s ease-in-out;
        }

        .swiper-pagination-bullet-active {
          background-color: var(--primary) !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}