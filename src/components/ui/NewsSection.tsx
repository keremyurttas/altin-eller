"use client";

import { New } from "@/data/news";
import Image from "next/image";
import NewDetailPopup from "./NewDetailsPopup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function NewsSection() {
  const [popupOpen, setPopupOpen] = useState(true);
  const [news, setNews] = useState<New[]>([]);
  const [newDetails, setNewDetails] = useState<New | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cursors, setCursors] = useState<(string | null)[]>([null]); // Store cursors for each page
  const itemsPerPage = 5;

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
      // Store the next cursor for the next page
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
      // If going forward, use the stored cursor
      if (newPage > currentPage) {
        fetchNews(newPage, cursors[newPage - 1]);
      } else {
        // If going backward, recalculate from the start
        // This is necessary because Notion's cursors are one-directional
        fetchNews(newPage, cursors[newPage - 1]);
      }
    }
  };

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
              <span>Our Classes</span>
              <h2>Bizden Haberler</h2>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="row">
            {news && news.length > 0 ? (
              news.map((item: New, index) => (
                <div
                  key={index}
                  className={
                    index < 2
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
                    className="class-item  "
                  >
                    <div className="ci-pic">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        src={
                          Array.isArray(item.imageUrls)
                            ? item.imageUrls[0]
                            : item.imageUrls
                        }
                        alt={item.title}
                        quality={100}
                      />
                    </div>
                    <div className="ci-text flex flex-col justify-between min-h-[100px] md:min-h-[130px] lg:min-h-[150px]">
                      <div className="flex justify-between items-center">
                        <h5 className="text-lg font-bold">{item.title}</h5>
                        <span className="date text-sm">
                          {item.date.toString()}
                        </span>
                      </div>
                      <div className="ci-text-bottom-container flex justify-between items-center">
                        <span className="font-mulish line-clamp-2">
                          {item.description}
                        </span>
                        <button className="p-2  bg-gray-200">
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No news available</p>
              </div>
            )}

            <Link
              href="/news"
              className="primary-btn  mx-auto hover:scale-110 transform transition duration-300 ease-in-out hover:text-white"
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
