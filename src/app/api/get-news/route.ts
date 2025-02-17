import { NextResponse } from "next/server";
import { getNews } from "@/lib/notion";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const cursor = searchParams.get("cursor") || undefined;

    const { news, nextCursor, hasMore, total } = await getNews(limit, cursor);

    return NextResponse.json({
      items: news,
      total,
      page,
      limit,
      nextCursor,
      hasMore
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}