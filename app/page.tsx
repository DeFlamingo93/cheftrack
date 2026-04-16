import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { loadLandingHtml } from "@/lib/loadLandingHtml";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://cheftrack.ch/"
  }
};

export default function HomePage() {
  const html = loadLandingHtml();
  return <LandingPage html={html} />;
}
