import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const databaseId = searchParams.get("databaseId");

    if (!databaseId) {
      return NextResponse.json(
        { error: "Database ID is required" },
        { status: 400 }
      );
    }

    const queryOptions: any = {
      database_id: databaseId,
    };

    // Modified filter for multi-select
    if (category) {
      queryOptions.filter = {
        property: "Kategori",
        multi_select: {
          contains: category,
        },
      };
    }

    const response = await notion.databases.query(queryOptions);

    const files = response.results.map((page: any) => {
      const fileUrl = page.properties.File?.files[0]?.file?.url || null;
      return {
        id: page.id,
        name: page.properties.Name?.title[0]?.text.content || "Untitled",
        fileUrl: fileUrl,
        categories:
          page.properties.Kategori?.multi_select.map((cat: any) => cat.name) ||
          [],
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        warning: fileUrl ? null : "This entry does not contain a file.",
      };
    });

    // Modified grouping for multi-select categories
    if (!category) {
      const groupedFiles = files.reduce((acc: any, file) => {
        // Handle multiple categories for each file
        file.categories.forEach((category: string) => {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(file);
        });
        return acc;
      }, {});

      return NextResponse.json({
        success: true,
        groupedFiles,
        totalFiles: files.length,
      });
    }

    return NextResponse.json({
      success: true,
      files,
      totalFiles: files.length,
      category,
    });
  } catch (error: any) {
    console.error("Error fetching Notion files:", error);

    if (error.code === "notionhq_client_response_error") {
      return NextResponse.json(
        {
          success: false,
          error: "Notion API Error",
          message: "Failed to fetch data from Notion",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error.code === "notionhq_client_authentication_error") {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication Error",
          message: "Failed to authenticate with Notion API",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
