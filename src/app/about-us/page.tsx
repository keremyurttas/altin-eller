import AboutUsRating from "@/components/ui/AboutUsRating";
import BannerSection from "@/components/ui/BannerSection";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ChooseUsSection from "@/components/ui/ChooseUsSection";
import TeamSection from "@/components/ui/TeamSection";
import { homepageBanner } from "@/data/banners";
import { aboutUs } from "@/data/breadCrumbs";
import { chooseUsItems } from "@/data/chooseUsItems";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("aboutUs");
}
export default function About() {
  return (
    <>
      <BreadCrumbSection {...aboutUs} />
      <ChooseUsSection items={chooseUsItems} />
      <AboutUsRating />
      <TeamSection />
      <BannerSection {...homepageBanner} />
    </>
  );
}
