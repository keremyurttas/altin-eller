"use client";

import Image from "next/image";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AboutUsRating() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Manually trigger animation for the progress bars
    const bars = document.querySelectorAll(".fill");
    bars.forEach((bar) => {
      const percentage = bar.getAttribute("data-percentage");
      if (percentage) {
        (bar as HTMLElement).style.width = `${percentage}%`;
      }
    });
  }, []);

  return (
    <section className="aboutus-section">
      <div className="container-fluid">
        <div className="row">
          {/* Video Section */}
          <div className="col-lg-6 p-0">
            <div
              className="about-video set-bg"
              style={{
                backgroundImage: `url(https://ik.imagekit.io/dyw3rzban/M%C4%B0N%C4%B0K%20TAKIM/458A8854.JPG?updatedAt=1739119196968)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <button
                className="play-btn video-popup"
                onClick={() => setIsOpen(true)}
              >
                <i className="fa fa-caret-right"></i>
              </button>
            </div>
          </div>

          {/* About Us Section */}
          <div className="col-lg-6 p-0">
            <div className="about-text">
              <div className="section-title">
                <span>About Us</span>
                <h2>What we have done</h2>
              </div>
              <div className="at-desc">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis. Aliquip ex ea commodo
                  consequat sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor.
                </p>
              </div>

              {/* Progress Bars */}
              <div className="about-bar">
                {[
                  { title: "Body building", percentage: 80 },
                  { title: "Training", percentage: 85 },
                  { title: "Fitness", percentage: 75 },
                ].map((item, index) => (
                  <div className="ab-item" key={index}>
                    <p>{item.title}</p>
                    <div className="barfiller">
                      <span
                        className="fill "
                        data-percentage={item.percentage}
                        style={{
                          width: "0%",
                          transition: "width 1.5s ease-in-out",
                        }}
                      ></span>
                      <div className="tipWrap font-mulish">
                        <span className="tip">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
