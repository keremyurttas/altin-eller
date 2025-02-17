"use client";
import { useEffect, useState } from "react";

export default function FilesList() {
  const [files, setFiles] = useState<{ name: string; fileUrl: string }[]>([]);

  useEffect(() => {
    fetch(
      `/api/notion-files?category=Voleybol - Transfer&databaseId=${process.env.NEXT_PUBLIC_NOTION_REGISTIRATION_DATABASE_ID}`
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Files</h2>
      <ul>
        {/* {files.map((file, index) => (
          <li key={index}>
            <a href={file.fileUrl} download>
              {file.name}
            </a>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
