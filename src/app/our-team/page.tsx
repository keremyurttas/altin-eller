import { getMetadata } from "@/lib/metadata";
import TeamPage from "./TeamPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("ourTeam");
}

export default function Page() {
  return <TeamPage />;
}
