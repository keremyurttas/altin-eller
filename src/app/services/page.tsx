import BannerSection from "@/components/ui/BannerSection";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ServicesSection from "@/components/ui/ServicesSection";
import { services } from "@/data/breadCrumbs";
import { servicesData } from "@/data/services";
import { servicesBanner } from "@/data/banners";
import PricingSection from "@/components/ui/PricingSection";
import { pricingCards } from "@/data/pricingCards";
import { getMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata("services");
}
export default function Page() {
  return (
    <>
      <BreadCrumbSection {...services} />
      <ServicesSection services={servicesData} />
      <BannerSection {...servicesBanner} />
      <PricingSection pricingCards={pricingCards} />
    </>
  );
}
