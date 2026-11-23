import type { ReactElement } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LandingHero } from "./landing/LandingHero";
import { LandingLivePreview } from "./landing/LandingLivePreview";
import { LandingComponentMatrix } from "./landing/LandingComponentMatrix";
import { LandingIconForgeSection } from "./landing/LandingIconForgeSection";
import { LandingTokensSection } from "./landing/LandingTokensSection";
import { LandingMetricsSection } from "./landing/LandingMetricsSection";
import { LandingCTASection } from "./landing/LandingCTASection";

export function HomePage(): ReactElement {
  return (
    <div className="cinder-app">
      <Navbar />
      <main id="main-content">
        <LandingHero />
        <LandingLivePreview />
        <LandingComponentMatrix />
        <LandingIconForgeSection />
        <LandingTokensSection />
        <LandingMetricsSection />
        <LandingCTASection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
