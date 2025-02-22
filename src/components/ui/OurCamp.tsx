"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Camp } from "@/lib/notion";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

export default function OurCamp({ camp }: { camp: Camp }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="blog-item  rounded-lg shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-5 ">
          {/* Image Section */}
          <div className="relative aspect-[2] lg:col-span-3 cursor-pointer">
            <div
              onClick={() => {
                setIndex(index);
                setOpen(true);
              }}
              className="relative w-full h-full hover:scale-105 transition-transform"
            >
              <div className="relative w-full h-full">
                <Image
                  src={camp.images?.[0]?.url || PLACEHOLDER_IMAGE_URL}
                  alt={camp.title}
                  fill
                  className="object-cover "
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Thumbnail Strip */}
              {camp.images && camp.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                  <div className="flex items-center justify-between gap-2">
                    <FaAnglesLeft className="text-white w-6 h-6 flex-shrink-0" />
                    <div className="flex gap-2 overflow-hidden">
                      {camp.images.slice(1, 4).map((image, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-14 flex-shrink-0"
                        >
                          <Image
                            src={image.url || PLACEHOLDER_IMAGE_URL}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>
                      ))}
                    </div>
                    <FaAnglesRight className="text-white w-6 h-6 flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col justify-between bi-text lg:col-span-2">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                {camp.title}
              </h2>
              <div className="flex gap-4 text-primary mb-4 text-lg ">
                <ul>
                  <li>{camp.city}</li>
                  <li>{camp.date}</li>
                </ul>
              </div>
              <p>
                {camp.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={
          camp.images?.length
            ? camp.images.map((img) => ({ src: img.url }))
            : [{ src: PLACEHOLDER_IMAGE_URL }]
        }
        plugins={[Thumbnails]}
      />
    </>
  );
}
