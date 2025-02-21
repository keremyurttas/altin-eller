import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import RegistirationFilesPage from "./RegistirationFilesPage";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("ourTeam");
}
export default function Page() {
  return <RegistirationFilesPage />;
}
