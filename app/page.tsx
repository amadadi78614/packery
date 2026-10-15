import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Affiliations from "@/components/Affiliations";
import WhyUs from "@/components/WhyUs";
import ServicesGrid from "@/components/ServicesGrid";
import Process from "@/components/Process";
import AboutTeaser from "@/components/AboutTeaser";
import CollegeTeaser from "@/components/CollegeTeaser";
import CtaBand from "@/components/CtaBand";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Affiliations />
      <WhyUs />
      <ServicesGrid />
      <Process />
      <AboutTeaser />
      <SocialProof />
      <CollegeTeaser />
      <CtaBand />
    </>
  );
}
