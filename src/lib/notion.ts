import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface Camp {
  id: string;
  title: string;
  city: string;
  date: string;
  images?: Image[];
}

export interface Image {
  url: string;
}

export async function getCamps(): Promise<Camp[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_CAMPS_DATABASE_ID!,
      sorts: [
        {
          property: "Tarih",
          direction: "descending",
        },
      ],
    });

    const camps = response.results.map((page: any) => {
      const dateProperty = page.properties.Tarih.date;
      const startDate = dateProperty?.start
        ? new Date(dateProperty.start)
        : null;
      const endDate = dateProperty?.end ? new Date(dateProperty.end) : null;

      // Format the date range
      const formattedDate =
        startDate && endDate
          ? `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleString(
              "tr-TR",
              { month: "long" }
            )} ${startDate.getFullYear()}`
          : "";

      return {
        id: page.id,
        title: page.properties.Başlık.title[0]?.plain_text || "",
        city: page.properties.Şehir.rich_text[0]?.plain_text || "",
        date: formattedDate,
        rawDate: startDate, // In case you need the actual Date object
      };
    });

    return camps;
  } catch (error) {
    console.error("Error fetching camps:", error);
    throw error;
  }
}
export async function getCampImages(campId: string): Promise<Image[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_IMAGES_DATABASE_ID!,
      filter: {
        property: "Kamplar",
        relation: {
          contains: campId,
        },
      },
      sorts: [
        {
          property: "Name",
          direction: "ascending",
        },
      ],
    });

    const images = response.results.map((page: any) => ({
      url: page.properties.URL.url || "",
      title: page.properties.Name.title[0]?.plain_text || "", // Adding title for verification
    }));

    return images;
  } catch (error) {
    console.error("Error fetching camp images:", error);
    throw error;
  }
}

// If you need to get both camps and images together, you can use this function
export async function getCampsWithImages(): Promise<Camp[]> {
  try {
    const camps = await getCamps();

    const campsWithImages = await Promise.all(
      camps.map(async (camp) => {
        const images = await getCampImages(camp.id);
        return {
          ...camp,
          images,
        };
      })
    );

    return campsWithImages;
  } catch (error) {
    console.error("Error fetching camps with images:", error);
    throw error;
  }
}

export interface Camp {
  id: string;
  title: string;
  city: string;
  date: string;
  rawDate?: Date | null;
  images?: Image[];
  description?: string;
}

export interface Image {
  url: string;
  title?: string;
}

export interface PaginationParams {
  pageSize: number;
  startCursor?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}
type NewsItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrls: string[];
};
export async function getPaginatedCamps(
  pagination: PaginationParams
): Promise<PaginatedResponse<Camp>> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_CAMPS_DATABASE_ID!,
      page_size: pagination.pageSize,
      start_cursor: pagination.startCursor,
      sorts: [
        {
          property: "Tarih",
          direction: "descending",
        },
      ],
    });

    const camps = response.results.map((page: any) => {
      const dateProperty = page.properties.Tarih.date;
      const startDate = dateProperty?.start
        ? new Date(dateProperty.start)
        : null;
      const endDate = dateProperty?.end ? new Date(dateProperty.end) : null;

      const formattedDate =
        startDate && endDate
          ? `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleString(
              "tr-TR",
              { month: "long" }
            )} ${startDate.getFullYear()}`
          : "";

      return {
        id: page.id,
        title: page.properties.Başlık.title[0]?.plain_text || "",
        city: page.properties.Şehir.rich_text[0]?.plain_text || "",
        description: page.properties.Açıklama.rich_text[0]?.plain_text || "",
        date: formattedDate,
        rawDate: startDate,
      };
    });

    return {
      items: camps,
      nextCursor: response.next_cursor,
      hasMore: response.has_more,
      total: response.results.length,
    };
  } catch (error) {
    console.error("Error fetching camps:", error);
    throw error;
  }
}
export async function getNews(pageSize: number = 4, startCursor?: string) {
  try {
    // Get all items for total count (without fetching images)
    const totalResponse = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID!,
      page_size: 100, // Maximum page size to get as many items as possible
    });

    // Get the actual paginated items
    const response = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_NEWS_DATABASE_ID!,
      sorts: [
        {
          property: "Tarih",
          direction: "descending",
        },
      ],
      page_size: pageSize,
      ...(startCursor && { start_cursor: startCursor }),
    });

    const news: NewsItem[] = await Promise.all(
      response.results.map(async (page: any) => {
        const imageIds = page.properties.Fotoğraflar.relation;

        const imageUrls = imageIds
          ? await Promise.all(
              imageIds.map(async (image: any) => {
                try {
                  const imageRecord = await notion.pages.retrieve({
                    page_id: image.id,
                  });
                  return imageRecord.properties.URL.url || "";
                } catch (error) {
                  console.error(`Error fetching image ${image.id}:`, error);
                  return "";
                }
              })
            )
          : [];

        const filteredImageUrls = imageUrls.filter((url) => url !== "");

        return {
          id: page.id,
          title: page.properties.Başlık.title[0]?.plain_text || "",
          date: page.properties.Tarih.date?.start || "",
          description: page.properties.Açıklama.rich_text[0]?.plain_text || "",
          imageUrls: filteredImageUrls,
        };
      })
    );

    return {
      news,
      nextCursor: response.next_cursor,
      hasMore: response.has_more,
      total: totalResponse.results.length, // Use the length of results array
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// API route handler for the news endpoint
export async function createNewsApiHandler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const cursor = searchParams.get("cursor") || undefined;

    const { news, nextCursor, hasMore } = await getNews(limit, cursor);

    return Response.json({
      items: news,
      nextCursor,
      hasMore,
      page,
    });
  } catch (error) {
    console.error("Error in news API handler:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
