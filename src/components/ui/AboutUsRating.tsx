"use client";
import { useEffect } from "react";

export default function AboutUsRating() {
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
            ></div>
          </div>

          {/* About Us Section */}
          <div className="col-lg-6 p-0">
            <div className="about-text">
              <div className="section-title">
                <span>Hakkımızda</span>
                <h2>ÖZGÜVENE GİDEN İLK ADIM</h2>
              </div>
              <div className="at-desc">
                <p>
                  Deneyimli ve dinamik eğitmen kadromuz, çocuklarımızla birlikte
                  öncelikle özgüven ile temel branş tekniklerini geliştirmek,
                  sonrasında ise takım ruhu ve mücadeleci karakterlerini ortaya
                  çıkarmak amacıyla etkili yöntemler kullanarak çalışmaktadır.
                  Çocuklarımızın kendilerini özgüvenle ifade ederek sınırlarını
                  keşfetmelerini sağlamak, kurumumuzun temel misyonlarındandır.
                </p>
              </div>

              {/* Progress Bars */}
              <div className="about-bar">
                {[
                  { title: "Özgüven", percentage: 100 },
                  { title: "Eğlence", percentage: 100 },
                  { title: "Fiziksel Gelişim", percentage: 100 },
                ].map((item, index) => (
                  <div className="ab-item" key={index}>
                    <p>{item.title}</p>
                    <div className="barfiller">
                      <span
                        className="fill "
                        data-percentage={item.percentage}
                        style={{
                          width: "0%",
                          transition: "width 3s ease-in-out",
                        }}
                        aria-valuenow={item.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
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
