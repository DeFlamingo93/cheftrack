import { LandingPage } from "@/components/LandingPage";
import { loadLandingHtml } from "@/lib/loadLandingHtml";

export default function HomePage() {
  const html = loadLandingHtml();
  return <LandingPage html={html} />;
}
