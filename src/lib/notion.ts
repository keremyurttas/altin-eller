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
export type VolleyballSchedule = {
  day: string;
  time: string;
  category: string;
};

export async function getCamps(): Promise<Camp[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_CAMPS_DATABASE_ID!,
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
      database_id: process.env.NOTION_IMAGES_DATABASE_ID!,
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
      database_id: process.env.NOTION_CAMPS_DATABASE_ID!,
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
      database_id: process.env.NOTION_NEWS_DATABASE_ID!,
      page_size: 100, // Maximum page size to get as many items as possible
    });

    // Get the actual paginated items
    const response = await notion.databases.query({
      database_id: process.env.NOTION_NEWS_DATABASE_ID!,
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
                  return (imageRecord as any).properties.URL.url || "";
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

export async function getScheduleData(
  category: string
): Promise<VolleyballSchedule[]> {
  const getDatabaseId = (category: string): string => {
    switch (category.toLowerCase()) {
      case "basketball":
        return process.env.NOTION_BASKETBALL_SCHEDULE_DATABASE_ID!;
      case "volleyball":
        return process.env.NOTION_VOLLEYBALL_SCHEDULE_DATABASE_ID!;
      default:
        throw new Error(`Unknown category: ${category}`);
    }
  };
  try {
    const databaseId = getDatabaseId(category);
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        day: properties.Gün.select.name,
        time: properties.Saat.title[0].plain_text,
        category: properties.Kategori.multi_select
          .map((category: { name: string }) => category.name)
          .join(", "),
      };
    });
  } catch (error) {
    console.error(`Error fetching ${category} schedule data:`, error);
    throw error;
  }
}
export type TeamMember = {
  name: string;
  title: string;
  imageUrl: string;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  const databaseId = process.env.NOTION_OUR_TEAM_DATABASE_ID!;
  try {
    const response = await notion.databases.query({ database_id: databaseId });

    const members = await Promise.all(
      response.results.map(async (page: any) => {
        const properties = page.properties;

        // ✅ Get relation ID from Fotoğraf column
        const relatedPhotoId = properties.Fotoğraf.relation[0]?.id;
        let imageUrl = "";

        if (relatedPhotoId) {
          try {
            // ✅ Fetch the related page from the Fotoğraflar database
            const photoPage = await notion.pages.retrieve({
              page_id: relatedPhotoId,
            });

            // ✅ Get the image URL from the related page (adjust property name accordingly)
            const photoPageProperties = (photoPage as any).properties;
            imageUrl = photoPageProperties.URL.url || "";
          } catch (err) {
            console.error("Error fetching related photo:", err);
          }
        }

        return {
          name: properties.İsim.title[0].plain_text,
          title: properties.Ünvan.rich_text[0].plain_text,
          imageUrl: imageUrl, // ✅ Now fetching the correct image URL
        };
      })
    );

    return members;
  } catch (error) {
    console.error("Error fetching our team data:", error);
    throw error;
  }
}
export interface Image {
  url: string;
}

interface NotionPhotoPage {
  properties: {
    URL: {
      url: string;
    };
    Name: {
      title: {
        plain_text: string;
      }[];
    };
  };
}

interface NotionGalleryPage {
  properties: {
    Fotoğraf: {
      relation: Array<{ id: string }>;
    };
  };
}

interface NotionPhotoPage {
  properties: {
    URL: {
      url: string;
    };
    Name: {
      title: Array<{
        plain_text: string;
      }>;
    };
  };
}

interface NotionGalleryPage {
  properties: {
    Fotoğraf: {
      relation: Array<{ id: string }>;
    };
  };
}

export async function getGallery(category: string): Promise<Image[]> {
  const getDatabaseId = (category: string): string => {
    switch (category.toLowerCase()) {
      case "volleyball":
        return process.env.NOTION_VOLLEYBALL_GALLERY_DATABASE_ID!;
      case "basketball":
        return process.env.NOTION_BASKETBALL_GALLERY_DATABASE_ID!;
      default:
        return process.env.NOTION_MAIN_GALLERY_DATABASE_ID!;
    }
  };

  try {
    const databaseId = getDatabaseId(category);

    // Fetch all gallery entries
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // Extract all photo IDs that need to be fetched
    const photoIds = response.results
      .map(
        (page) =>
          (page as unknown as NotionGalleryPage).properties.Fotoğraf.relation[0]
            ?.id
      )
      .filter(Boolean);

    // Fetch all related photos in parallel
    const photoPages = await Promise.all(
      photoIds.map(async (id) => {
        try {
          return await notion.pages.retrieve({ page_id: id });
        } catch (err) {
          console.error(`Error fetching photo with ID ${id}:`, err);
          return null;
        }
      })
    );

    // Create a map of photo IDs to their data for efficient lookup
    const photoDataMap = new Map(
      photoPages.filter(Boolean).map((page) => [
        page!.id,
        {
          url: (page as unknown as NotionPhotoPage).properties.URL.url || "",
          name:
            (page as unknown as NotionPhotoPage).properties.Name.title[0]
              ?.plain_text || "",
        },
      ])
    );

    return response.results.map((page) => {
      const photoId = (page as unknown as NotionGalleryPage).properties.Fotoğraf
        .relation[0]?.id;
      const photoData = photoId ? photoDataMap.get(photoId) : null;

      return {
        url: photoData?.url || "",
        name: photoData?.name || "",
      };
    });
  } catch (error) {
    console.error(`Error fetching ${category} gallery:`, error);
    throw error;
  }
}
