"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Types
interface File {
  name: string;
  fileUrl: string;
  id: string;
}

interface SportConfig {
  id: string;
  name: string;
  databaseId: string;
}

// Constants
const SPORTS_CONFIG: Record<string, SportConfig> = {
  volleyball: {
    id: "volleyball",
    name: "Voleybol",
    databaseId:
      process.env.NEXT_PUBLIC_NOTION_VOLLEYBALL_REGISTIRATION_DATABASE_ID || "",
  },
  basketball: {
    id: "basketball",
    name: "Basketbol",
    databaseId:
      process.env.NEXT_PUBLIC_NOTION_BASKETBALL_REGISTIRATION_DATABASE_ID || "",
  },
};

export default function FilesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [sport, setSport] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories when sport changes
  useEffect(() => {
    sport.length > 0 && fetchCategories(sport);
  }, [sport]);

  const fetchCategories = async (selectedSport: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const databaseId = SPORTS_CONFIG[selectedSport].databaseId;
      const response = await fetch(
        `/api/get-categories?databaseId=${databaseId}`
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();

      setCategoryOptions(data);
      setCategory(""); // Keep it empty instead of auto-selecting the first value
    } catch (error) {
      setError("Error loading categories. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiles = async (selectedCategory: string, databaseId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/notion-files?category=${selectedCategory}&databaseId=${databaseId}`
      );
      if (!response.ok) throw new Error("Failed to fetch files");
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      setError("Error loading files. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSportChange = (selectedSport: string) => {
    setCategoryOptions([]);
    setSport(selectedSport);
    setCategory("");
    setFiles([]);
  };

  const handleCategoryChange = async (selectedCategory: string) => {
    setFiles([]);
    setCategory(selectedCategory);
    await fetchFiles(selectedCategory, SPORTS_CONFIG[sport].databaseId);
  };

  return (
    <section className="team-section team-page spad">
      <div className="max-w-4xl mx-auto p-6 bg-primary rounded-xl shadow-lg  lg:mt-8 mt-16 ">
        <h1 className="text-3xl font-bold  mb-8 font-mulish text-white">
          Kayıt Belgeleri
        </h1>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 ">
          {/* Sport Filter */}
          <div className="space-y-2">
            <label
              htmlFor="sport"
              className="block text-xl font-medium !text-white"
            >
              Branş
            </label>
            <select
              id="sport"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary"
              value={sport}
              onChange={(e) => handleSportChange(e.target.value)}
            >
              <option value="" disabled>
                -- Branş seçin --
              </option>
              {Object.values(SPORTS_CONFIG).map((sportOption) => (
                <option key={sportOption.id} value={sportOption.id}>
                  {sportOption.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-xl font-medium text-white">
              Kayıt tipi
            </label>
            <select
              id="category"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={isLoading || categoryOptions.length === 0}
            >
              <option value="" disabled>
                -- Kayıt tipi seçin --
              </option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-white" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* File List */}
        <div className="space-y-4 px-4">
          {!isLoading && !error && files.length === 0 && category !== "" && (
            <div className="text-center py-8 text-gray-500">
              No files found for the selected category.
            </div>
          )}
          {files.map((file) => (
            <div
              key={file.id}
              className={`group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200  ${
                !file.fileUrl
                  ? "bg-primary text-white text-xl !p-2 font-mulish list-item"
                  : ""
              }`}
            >
              <span className={`text-gray-700 font-medium"+`}>{file.name}</span>

              <div className="flex gap-2 font-mulish">
                {/* Download button */}

                {file.fileUrl && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-opacity duration-200 hover:bg-blue-600 focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = file.fileUrl;
                      link.download = file.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    İndir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
