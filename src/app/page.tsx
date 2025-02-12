import Navbar from "@/components/global/Navbar";
import FullscreenCarousel from "@/components/ui/FullscreenCarousel";
import "./globals.css";
import NewsSection from "@/components/ui/NewsSection";
import BannerSection from "@/components/ui/BannerSection";
import ChooseUsSection from "@/components/ui/ChooseUsSection";
import { chooseUsItems } from "@/data/chooseUsItems";
import { news } from "@/data/news";
import { homepageBanner } from "@/data/banners";
import PricingSection from "@/components/ui/PricingSection";
import { pricingCards } from "@/data/pricingCards";
import GallerySection from "@/components/ui/GallerySection";
import { galleryItems } from "@/data/galleryItems";
import TeamSection from "@/components/ui/TeamSection";
import { ourTeamMembers } from "@/data/ourTeamMembers";
import GetTouchSection from "@/components/ui/GetTouchSection";
export default function Home() {
  return (
    <>
    

      <FullscreenCarousel />
      <ChooseUsSection items={chooseUsItems} />
      <NewsSection news={news} />
      <BannerSection {...homepageBanner} />
      <PricingSection pricingCards={pricingCards} />
      <GallerySection galleryItems={galleryItems} />
      <TeamSection ourTeamMembers={ourTeamMembers} />
      <GetTouchSection />
    </>
  );
}
