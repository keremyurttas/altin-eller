import Navbar from "@/components/global/Navbar";
import FullscreenCarousel from "@/components/ui/FullscreenCarousel";
import "./globals.css";
import NewsSection from "@/components/ui/NewsSection";

import ChooseUsSection from "@/components/ui/ChooseUsSection";
import { chooseUsItems } from "@/data/chooseUsItems";
import { news } from "@/data/news";
export default function Home() {
  return (
    <>
      <Navbar />

      <FullscreenCarousel />
      <ChooseUsSection items={chooseUsItems} />
      <NewsSection news={news} />
    </>
  );
}
