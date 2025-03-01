import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ClassCategories from "@/components/ui/ClassCategories";
import { volleyballClasses } from "@/data/breadCrumbs";
import Image from "next/image";
import { volleyballClassesClassesCategories } from "@/data/classCategories";
import ClassTimeTable from "@/components/ui/ClassTimeTable";
import GallerySection from "@/components/ui/GallerySection";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("volleyballClasses");
}
export default function VolleyballClasses() {
  return (
    <PageLayout>
      <BreadCrumbSection {...volleyballClasses} />
      <section className="class-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="class-details-text">
                <div className="cd-pic">
                  <Image
                    layout="responsive"
                    width={0}
                    height={0}
                    src={
                      "https://ik.imagekit.io/dyw3rzban/SPOR%20OKULLARI/_IGP5955.JPG?updatedAt=1739119131475"
                    }
                    alt="voleybol kursumuz"
                  ></Image>
                </div>
                <div className="cd-text">
                  <div className="cd-single-item flex flex-col gap-4 ">
                    <p>
                      Voleybol, yalnızca bir spor dalı değil, aynı zamanda
                      dostlukların kurulduğu ve takım ruhunun güçlendiği bir
                      ortamdır. Antrenmanlarımızda, çocuklarımızın mücadele
                      ruhunu geliştirmelerine yardımcı olurken, aynı zamanda
                      takım içindeki iletişim ve iş birliğini de artırmayı
                      hedefliyoruz. Her antrenman, genç sporcularımız için yeni
                      bir macera ve öğrenme fırsatı sunuyor.
                    </p>

                    <p>
                      Deneyimli antrenörlerimiz, her bir sporcunun yeteneklerini
                      ve potansiyelini anlamak için bireysel bir yaklaşım
                      benimsemekte. Her çocuk, kendi hızında gelişir ve
                      antrenörlerimiz onların güçlü yönlerini ön plana çıkarmak
                      için özveriyle çalışır. Bizim için önemli olan, her
                      çocuğun voleybol becerilerini geliştirirken kendine
                      güvenini artırmak ve takım içinde birbirleriyle uyumlu bir
                      şekilde çalışabilmelerini sağlamaktır.
                    </p>

                    <p>
                      Bu süreçte çocuklarımız sadece teknik beceriler kazanmakla
                      kalmaz, aynı zamanda hayat boyu sürecek dostluklar ve bir
                      aile hissi de geliştirirler. Voleybol, onların hem
                      fiziksel hem de sosyal gelişimlerine katkıda bulunurken,
                      birlikte mücadele etmenin ve kazanmanın keyfini
                      çıkarmalarını sağlar. Bizler, sporun getirdiği heyecan ve
                      eğlencenin yanı sıra, katılımcılarımızın kendilerini
                      değerli ve özel hissetmelerini sağlamak için buradayız.
                    </p>

                    <p>
                      Voleybol antrenmanlarımızda her bir gülümseme, her bir
                      alkış ve her bir başarı, birlikte attığımız adımların
                      birer göstergesidir. Gelin, voleybol sahasında birlikte
                      büyüyelim!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="sidebar-option">
                <ClassCategories
                  categories={volleyballClassesClassesCategories}
                />
                <div
                  className="so-banner set-bg"
                  style={{
                    backgroundImage: `url(https://ik.imagekit.io/dyw3rzban/SPOR%20OKULLARI/_IGP5896.JPG?updatedAt=1739119120364)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span>Antrenman Kesitleri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClassTimeTable category="volleyball" />
      <GallerySection category="volleyball" />
    </PageLayout>
  );
}
