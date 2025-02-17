// src/app/api/get-camps/route.ts
import { NextResponse } from "next/server";
import { getPaginatedCamps, getCampImages } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor") || undefined;
    const pageSize = parseInt(searchParams.get("pageSize") || "6");

    const paginatedCamps = await getPaginatedCamps({
      pageSize,
      startCursor: cursor,
    });

    // Fetch images for each camp
    const campsWithImages = await Promise.all(
      paginatedCamps.items.map(async (camp) => {
        const images = await getCampImages(camp.id);
        return {
          ...camp,
          images,
        };
      })
    );

    return NextResponse.json({
      items: campsWithImages,
      nextCursor: paginatedCamps.nextCursor,
      hasMore: paginatedCamps.hasMore,
      total: paginatedCamps.total,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch camps" },
      { status: 500 }
    );
  }
}