import { NextRequest, NextResponse } from "next/server";
import { getScheduleData } from "@/lib/notion";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category parameter is required" },
      { status: 400 }
    );
  }

  try {
    const schedule = await getScheduleData(category);
    return NextResponse.json(schedule);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unknown category")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
