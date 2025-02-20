import { getTeamMembers } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teamMembers = await getTeamMembers();
    return NextResponse.json(teamMembers);
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
