import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import FeatureNav from "@/components/sections/feature-nav";
import InferenceSection from "@/components/sections/inference-section";
import FineTuningSection from "@/components/sections/finetuning-section";
import VectorDBSection from "@/components/sections/vectordb-section";
import AutoscalingSection from "@/components/sections/autoscaling-section";
import ObservabilitySection from "@/components/sections/observability-section";
import AgentPlatform from "@/components/sections/agent-platform";
import BackedBy from "@/components/sections/backed-by";
import CTAFinal from "@/components/sections/cta-final";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <FeatureNav />
      <InferenceSection />
      <FineTuningSection />
      <VectorDBSection />
      <AutoscalingSection />
      <ObservabilitySection />
      <AgentPlatform />
      <BackedBy />
      <CTAFinal />
      <Footer />
    </div>
  );
}
