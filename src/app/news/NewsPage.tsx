"use client";

import { New } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewDetailPopup from "@/components/ui/NewDetailsPopup";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import { news as newBreadCrumb } from "@/data/breadCrumbs";
import { Loader2 } from "lucide-react";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

export default function Page() {
  const [popupOpen, setPopupOpen] = useState(true);
  const [news, setNews] = useState<New[]>([]);
  const [newDetails, setNewDetails] = useState<New | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const itemsPerPage = 6;

  const fetchNews = async (page: number, cursor?: string | null) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-news?page=${page}&limit=${itemsPerPage}${
          cursor ? `&cursor=${cursor}` : ""
        }`
      );
      const data = await response.json();

      setNews(data.items);
      setTotalPages(Math.ceil(data.total / itemsPerPage));

      if (data.nextCursor) {
        setCursors((prev) => {
          const newCursors = [...prev];
          newCursors[page] = data.nextCursor;
          return newCursors;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (!isLoading && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (newPage > currentPage) {
        fetchNews(newPage, cursors[newPage - 1]);
      } else {
        fetchNews(newPage, cursors[newPage - 1]);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="primary-btn normal-case"
        style={{ padding: "8px 16px", opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        Önceki
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="primary-btn normal-case"
          style={{ padding: "8px 16px" }}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="mx-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`primary-btn ${
            currentPage === i ? "active" : ""
          }normal-case`}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === i ? "white" : "",
            color: currentPage === i ? "var(--primary)" : "",
          }}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="mx-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="primary-btn normal-case"
          style={{ padding: "8px 16px" }}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="primary-btn normal-case"
        style={{
          padding: "8px 16px",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        Sonraki
      </button>
    );

    return buttons;
  };

  return (
    <section className="blog-section spad pt-0">
      <BreadCrumbSection {...newBreadCrumb} />

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
      <div className="container pt-32">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="row">
              {news && news.length > 0 ? (
                news.map((item: New, index) => (
                  <div key={index} className="col-lg-6">
                    <div
                      onClick={() => {
                        setNewDetails(item);
                        setPopupOpen(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="class-item relative"
                    >
                      <div className="ci-pic relative aspect-video w-full overflow-hidden">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ objectFit: "cover" }}
                          src={
                            Array.isArray(item.imageUrls)
                              ? item.imageUrls[0] || PLACEHOLDER_IMAGE_URL
                              : item.imageUrls || PLACEHOLDER_IMAGE_URL
                          }
                          alt={item.title || "Placeholder image"}
                          quality={70}
                        />
                      </div>
                      <div className="ci-text flex flex-col justify-between min-h-[100px] md:min-h-[130px] lg:min-h-[150px]">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold text-primary">{item.title}</h2>
                          <span className="date text-sm">
                            {item.date.toString()}
                          </span>
                        </div>
                        <div className="ci-text-bottom-container flex justify-between items-center">
                          <span className="font-mulish line-clamp-2">
                            {item.description}
                          </span>
                          <button aria-label="Haberi incele" className="p-2  bg-gray-200">
                            <i className="fa fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>Gösterilecek Haber Bulunamadı.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="row mt-5">
                <div className="col-12">
                  <div className="pagination-container d-flex justify-content-center gap-2">
                    {renderPaginationButtons()}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
