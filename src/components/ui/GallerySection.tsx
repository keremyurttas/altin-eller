"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

type Props = {
  galleryItems: string[];
};
export default function GallerySection(props: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <div className="gallery-section">
      <div className="gallery">
        {props.galleryItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setIndex(index);
                setOpen(true);
              }}
              className={
                index == 0 || index == props.galleryItems.length - 1
                  ? "gs-item grid-wide "
                  : "gs-item "
              }
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            
            >
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
          slides={props.galleryItems.map((src) => ({ src }))}
          plugins={[Video]}
        />
      </div>
    </div>
  );
}
