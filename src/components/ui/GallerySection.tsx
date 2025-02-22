"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css"; // Required for Lightbox
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Required for Thumbnails
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
type Props = {
  category: string;
};
type GalleryItem = {
  url: string;
  name: string;
};
export default function GallerySection(props: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "/api/get-gallery?category=" + props.category
        );
        const data = await response.json();
        setGalleryItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [props.category]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }
  return (
    <div className="gallery-section">
      <div className="gallery">
        {galleryItems
          .slice(0, isMobile ? 3 : galleryItems.length)
          .map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setIndex(index);
                  setOpen(true);
                }}
                className={`relative ${
                  index == 0 || index == galleryItems.length - 1
                    ? "gs-item grid-wide"
                    : "gs-item"
                }`}
              >
                <Image
                  src={item.url}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="thumb-icon">
                  <i className="fa fa-picture-o"></i>
                </div>
              </div>
            );
          })}

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={galleryItems.map((src) => ({ src: src.url }))}
          plugins={[Thumbnails]}
        />
      </div>
    </div>
  );
}
