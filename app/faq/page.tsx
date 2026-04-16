import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQCta } from "@/components/faq/FAQCta";
import { FAQHero } from "@/components/faq/FAQHero";
import { faqItems, faqJsonLd } from "@/lib/faqContent";

export const metadata: Metadata = {
  title: "Häufige Fragen zu Cheftrack — Food Waste Kalkulator für Gastronomie",
  description:
    "Alles was du über Cheftrack wissen musst: Funktionen, Preise, Unterschiede zu Winnow & Kitro, und wie du in 2 Minuten startest.",
  keywords:
    "cheftrack faq, cheftrack preise, food waste gastronomie, winnow kitro alternative",
  alternates: {
    canonical: "https://cheftrack.ch/faq"
  },
  openGraph: {
    title: "Häufige Fragen zu Cheftrack",
    description:
      "Alles was du über Cheftrack wissen musst: Funktionen, Preise, Unterschiede zu Winnow & Kitro, und wie du in 2 Minuten startest.",
    url: "https://cheftrack.ch/faq",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Häufige Fragen zu Cheftrack",
    description:
      "Alles was du über Cheftrack wissen musst: Funktionen, Preise, Unterschiede zu Winnow & Kitro, und wie du in 2 Minuten startest."
  }
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqJsonLd
  };

  return (
    <main className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQHero
        title="Häufige Fragen zu Cheftrack"
        description="Alles was du über Funktionen, Preise, Einstieg und den Unterschied zu Hardware-Lösungen wissen musst — kompakt an einem Ort."
      />

      <section className="editorial-content">
        <div className="container faq-page-shell">
          <FAQAccordion items={faqItems} />
          <FAQCta />
        </div>
      </section>
    </main>
  );
}
