import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import OurCampsPage from "./OurCampsPage";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("ourCamps");
}

export default function Page() {
  return <OurCampsPage />;
}
