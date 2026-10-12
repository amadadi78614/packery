import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import QuoteWizard from "@/components/QuoteWizard";
import About from "@/components/About";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhyUs />
        <Services />
        <Process />
        <QuoteWizard />
        <About />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
