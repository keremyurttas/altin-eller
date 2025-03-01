import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ClassCategories from "@/components/ui/ClassCategories";
import { basketballClasses } from "@/data/breadCrumbs";
import Image from "next/image";
import { basketballClassesCategories } from "@/data/classCategories";
import ClassTimeTable from "@/components/ui/ClassTimeTable";
import GallerySection from "@/components/ui/GallerySection";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import PageLayout from "@/components/ui/PageLayout";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("basketballClasses");
}
export default function BasketballClasses() {
  return (
    <PageLayout>
      <BreadCrumbSection {...basketballClasses} />
      <section className="class-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="class-details-text">
                <div className="cd-pic">
                  {/* <img src="img/classes/class-details/class-detailsl.jpg" alt=""> */}
                  <Image
                    layout="responsive"
                    width={0}
                    height={0}
                    src={
                      "https://ik.imagekit.io/dyw3rzban/IMG_0336.jpeg?updatedAt=1739824083811"
                    }
                    alt="basketol sporcuları"
                  ></Image>
                </div>
                <div className="cd-text">
                  <div className="cd-single-item flex flex-col gap-4">
                    <p>
                      Basketbol bizim için sadece bir spor değil, ailemizin
                      büyüdüğü, herkesin birbirine destek olduğu muhteşem bir
                      macera! Antrenmanlarımızda gençlerimizle hem ter döküyor
                      hem de bolca eğleniyoruz. Her idmanda yeni şeyler
                      öğrenirken, bir yandan da arkadaşlıklarımızı
                      pekiştiriyoruz.
                    </p>
                    <p>
                      Deneyimli koçlarımız her sporcumuzu ayrı ayrı tanıyor,
                      onların güçlü yanlarını keşfedip parlatıyor. Herkesin
                      kendi hızında ilerlediğini biliyoruz ve kimseyi
                      zorlamadan, her birinizin en iyi olduğu alanda parlamasına
                      yardımcı oluyoruz.
                    </p>
                    <p>
                      En büyük hedefimiz, size basketbolu sevdirirken
                      özgüveninizi artırmak ve takım ruhunu aşılamak. Burada
                      sadece basketbol oynamayı öğrenmiyorsunuz, aynı zamanda
                      harika dostluklar kuruyor ve unutulmaz anılar
                      biriktiriyorsunuz.
                    </p>
                    <p>
                      Basketbol sayesinde hem fiziksel olarak güçleniyor hem de
                      hayatta karşılaşacağınız zorluklarla başa çıkmayı
                      öğreniyorsunuz. Biz sadece antrenör değil, aynı zamanda
                      sizin en büyük destekçileriniziz. Salonumuzda attığınız
                      her basket, yaptığınız her asist ve kazandığınız her maç
                      bizim için ayrı bir gurur kaynağı. Gelin, bu muhteşem
                      basketbol ailesinin bir parçası olun!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="sidebar-option">
                <ClassCategories categories={basketballClassesCategories} />
                <div
                  className="so-banner set-bg"
                  style={{
                    backgroundImage: `url(https://ik.imagekit.io/dyw3rzban/IMG_7438.jpeg?updatedAt=1739824149655)`,
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
      <ClassTimeTable category="basketball" />
      <GallerySection category="basketball" />
    </PageLayout>
  );
}
