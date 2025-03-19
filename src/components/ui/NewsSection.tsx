"use client";

import { New } from "@/lib/types";
import Image from "next/image";
import NewDetailPopup from "./NewDetailsPopup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

const NewsSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      className={
        index < 2
          ? "col-lg-6"
          : index === 1
          ? "col-lg-6 col-md-6"
          : "col-lg-4 col-md-6"
      }
    >
      <div className="class-item">
        <div className="ci-pic relative">
          <div className="animate-pulse bg-gray-800 w-full h-[250px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
        <div className="ci-text flex flex-col justify-between min-h-[100px] md:min-h-[130px] lg:min-h-[150px] p-4">
          <div className="flex justify-between items-center">
            <div className="animate-pulse bg-gray-300 h-6 w-2/3 rounded" />
            <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded" />
          </div>
          <div className="ci-text-bottom-container flex justify-between items-center mt-4">
            <div className="space-y-2 w-full">
              <div className="animate-pulse bg-gray-300 h-4 w-4/5 rounded" />
              <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded" />
            </div>
            <div className="animate-pulse bg-gray-300 h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ButtonSkeleton = () => (
  <div className="w-full flex justify-center">
    <div className="animate-pulse bg-gray-300 h-[40px] w-[120px] rounded" />
  </div>
);

export default function NewsSection() {
  const [popupOpen, setPopupOpen] = useState(true);
  const [news, setNews] = useState<New[]>([]);
  const [newDetails, setNewDetails] = useState<New | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;

  const fetchNews = async (page: number, cursor?: string | null) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-news?page=${page}&limit=${itemsPerPage}${
          cursor ? `&cursor=${cursor}` : ""
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data.items);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, []);

  return (
    <section className="classes-section spad">
      {newDetails && (
        <NewDetailPopup
          isOpen={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            setNewDetails(null);
            document.body.style.overflow = "";
          }}
          title={newDetails.title}
          date={newDetails.date}
          description={newDetails.description}
          images={
            Array.isArray(newDetails.imageUrls)
              ? newDetails.imageUrls.map((src) => ({ url: src }))
              : [{ url: newDetails.imageUrls[0] }]
          }
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Güncel Kalın</span>
              <h2>Bizden Haberler</h2>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="row">
            {[...Array(5)].map((_, index) => (
              <NewsSkeleton key={index} index={index} />
            ))}
            <ButtonSkeleton />
          </div>
        ) : (
          <div className="row">
            {error ? (
              <div className="col-12 text-center">
                <p>{error}</p>
              </div>
            ) : news && news.length > 0 ? (
              news.map((item: New, index) => (
                <div
                  key={index}
                  className={
                    index === 0
                      ? "col-lg-6"
                      : index === 1
                      ? "col-lg-6 col-md-6"
                      : "col-lg-4 col-md-6"
                  }
                >
                  <div
                    onClick={() => {
                      setNewDetails(item);
                      setPopupOpen(true);
                      document.body.style.overflow = "hidden";
                    }}
                    className="class-item"
                  >
                    <div className="ci-pic relative aspect-video w-full overflow-hidden">
                      <Image
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={
                          Array.isArray(item.imageUrls)
                            ? item.imageUrls[0] || PLACEHOLDER_IMAGE_URL
                            : item.imageUrls || PLACEHOLDER_IMAGE_URL
                        }
                        alt={item.title}
                        quality={80}
                        loading="lazy"
                      />
                    </div>
                    <div className="ci-text flex flex-col justify-between min-h-[100px] md:min-h-[130px] lg:min-h-[150px] p-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-bold line-clamp-2 break-words flex-1">
                          {item.title}
                        </h3>
                        <span className="date text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                          {item.date.toString()}
                        </span>
                      </div>
                      <div className="ci-text-bottom-container flex justify-between items-center mt-2">
                        <span className="font-mulish line-clamp-2 pr-2 flex-1">
                          {item.description}
                        </span>
                        <button
                          aria-label="Detay"
                          className="p-2 bg-gray-200 flex-shrink-0 rounded hover:bg-gray-300"
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>
                  Haber bulunamadı. <Link href="/about">Hakkımızda</Link>{" "}
                  sayfası.
                </p>
              </div>
            )}

            <Link
              href="/news"
              className="primary-btn mx-auto hover:scale-110 transform transition duration-300 ease-in-out hover:text-white"
              style={{ padding: "8px 16px" }}
            >
              Tüm Haberler
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
