import { LegalPage } from "@/components/LegalPage";
import { agbSections } from "@/lib/legalContent";

export default function AgbPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Allgemeine Geschäftsbedingungen (AGB)"
      intro="Diese AGB regeln die Nutzung von Cheftrack als webbasiertes SaaS-Tool für Gastronomiebetriebe."
      sections={[...agbSections]}
    />
  );
}
