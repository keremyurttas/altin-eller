import NewsPage from "./NewsPage";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("news");
}
export default function Page() {
  return <NewsPage />;
}
