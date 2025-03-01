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
                  Altıneller Spor Kulübü olarak 2013 yılından beri basketbol,
                  2021 yılından beri ise voleybol branşlarında faaliyet
                  göstermekteyiz. Türkiye Basketbol Federasyonu (TBF) ve Türkiye
                  Voleybol Federasyonu (TVF) liglerinde mücadele eden
                  takımlarımızla, sporun rekabetçi ruhunu en iyi şekilde
                  yansıtırken, sporcularımızın gelişimine de büyük önem
                  veriyoruz. Deneyimli ve dinamik eğitmen kadromuz,
                  çocuklarımızın özgüven kazanmalarını, temel teknik
                  becerilerini geliştirmelerini ve takım ruhunu benimsemelerini
                  sağlamak için etkili yöntemler kullanmaktadır. Onların
                  sınırlarını keşfetmelerine, kendilerini özgüvenle ifade
                  etmelerine ve mücadeleci karakterlerini ortaya çıkarmalarına
                  rehberlik etmek, kulübümüzün en önemli misyonlarından biridir.
                  Altıneller ailesi olarak, sporun bir yaşam biçimi olduğunu
                  biliyor ve her yaştan sporcumuza bu bilinçle yol gösteriyoruz.
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
                      <div
                        className="fill "
                        data-percentage={item.percentage}
                        style={{
                          width: "0%",
                          transition: "width 3s ease-in-out",
                        }}
                        aria-valuenow={item.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${item.title}: ${item.percentage}%`}
                        role="progressbar"
                      ></div>
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
