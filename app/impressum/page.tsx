import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { impressumSections } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Impressum — Cheftrack",
  robots: "noindex",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Impressum"
      intro="Angaben gemäss Schweizer Recht (OR) zur Anbieterkennzeichnung."
      sections={impressumSections}
    />
  );
}
