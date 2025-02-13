import AboutUsRating from "@/components/ui/AboutUsRating";
import BannerSection from "@/components/ui/BannerSection";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ChooseUsSection from "@/components/ui/ChooseUsSection";
import GetTouchSection from "@/components/ui/GetTouchSection";
import TeamSection from "@/components/ui/TeamSection";
import { homepageBanner } from "@/data/banners";
import { aboutUs } from "@/data/breadCrumbs";
import { chooseUsItems } from "@/data/chooseUsItems";
import { ourTeamMembers } from "@/data/ourTeamMembers";
export default function About() {
  return (
    <>
      <BreadCrumbSection {...aboutUs} />
      <ChooseUsSection items={chooseUsItems} />
      <AboutUsRating />
      <TeamSection ourTeamMembers={ourTeamMembers} />
      <BannerSection {...homepageBanner} />
    </>
  );
}
