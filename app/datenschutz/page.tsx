import { LegalPage } from "@/components/LegalPage";
import { privacySections } from "@/lib/legalContent";

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer Daten ist uns wichtig. Diese Datenschutzerklärung informiert darüber, wie personenbezogene Daten im Zusammenhang mit Cheftrack verarbeitet werden."
      sections={privacySections}
    />
  );
}
