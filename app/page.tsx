import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Metrics from "@/components/sections/metrics";
import Features from "@/components/sections/features";
import Testimonials from "@/components/sections/testimonials";
import CTAFinal from "@/components/sections/cta-final";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Metrics />
      <Features />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </main>
  );
}
