import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const databaseId = searchParams.get("databaseId");

    if (!databaseId) {
      return NextResponse.json(
        { error: "Database ID is required" },
        { status: 400 }
      );
    }

    // Fetch database metadata to get all possible category options
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Extract all possible category options from the multi-select property
    const categoryProperty = database.properties.Kategori as any;
    const categoryOptions = categoryProperty.multi_select.options.map(
      (option: any) => option.name
    );

    return NextResponse.json(categoryOptions);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
