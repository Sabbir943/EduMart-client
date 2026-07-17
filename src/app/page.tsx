import HeroBanner from "@/component/HeroBanner";
import PopularCourses from "@/component/PopularCourses";
import PricingSection from "@/component/PricingSection";
import TopContributor from "@/component/TopContributor";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <PricingSection/>
      <PopularCourses/>
      <TopContributor/>
    </div>
  );
}
