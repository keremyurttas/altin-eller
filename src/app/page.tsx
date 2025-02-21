import FullscreenCarousel from "@/components/ui/FullscreenCarousel";
import "./globals.css";
import NewsSection from "@/components/ui/NewsSection";
import BannerSection from "@/components/ui/BannerSection";
import ChooseUsSection from "@/components/ui/ChooseUsSection";
import { chooseUsItems } from "@/data/chooseUsItems";
import { homepageBanner } from "@/data/banners";
import PricingSection from "@/components/ui/PricingSection";
import { pricingCards } from "@/data/pricingCards";
import GallerySection from "@/components/ui/GallerySection";

import TeamSection from "@/components/ui/TeamSection";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("/");
}
export default function Home() {
  return (
    <>
      <FullscreenCarousel />
      <ChooseUsSection items={chooseUsItems} />
      <NewsSection />
      <BannerSection {...homepageBanner} />
      <PricingSection pricingCards={pricingCards} />
      <GallerySection category="main" />
      <TeamSection />
    </>
  );
}
