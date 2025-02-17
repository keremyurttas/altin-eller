"use client";
import { useEffect, useState } from "react";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import OurCamp from "@/components/ui/OurCamp";
import { ourCamps } from "@/data/breadCrumbs";
import { Loader2 } from "lucide-react";
import type { Camp } from "@/lib/notion";

export default function Page() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 6;

  const fetchCamps = async (cursor?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        pageSize: pageSize.toString(),
        ...(cursor && { cursor }),
      });

      const response = await fetch(`/api/get-camps?${params}`);
      const data = await response.json();

      if (cursor) {
        setCamps((prev) => [...prev, ...data.items]);
      } else {
        setCamps(data.items);
      }

      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  const loadMore = () => {
    if (nextCursor) {
      fetchCamps(nextCursor);
    }
  };

  return (
    <>
      <BreadCrumbSection {...ourCamps} />

      <section className="blog-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {camps.length === 0 && loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-1 gap-8 w-full">
                    {camps.map((camp) => (
                      <OurCamp key={camp.id} camp={camp} />
                    ))}
                  </div>

                  {hasMore && (
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Daha Fazla
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
