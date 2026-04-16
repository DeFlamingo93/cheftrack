import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cheftrack.ch"),
  title: "Cheftrack — Food Waste Kalkulator für Gastronomie | Mengen planen, Reste tracken",
  description:
    "Cheftrack hilft Köchen und Gastro-Betrieben, Mengen für Events präzise zu planen und Food Waste in CHF zu messen. 14 Tage gratis testen.",
  robots: {
    index: true,
    follow: true
  },
  authors: [{ name: "John Mayer" }],
  keywords: [
    "food waste",
    "gastronomie",
    "kalkulator",
    "mengenplanung",
    "buffet",
    "catering",
    "event",
    "küche",
    "reste tracken",
    "lebensmittelverschwendung",
    "hotel"
  ],
  openGraph: {
    title: "Cheftrack — Food Waste Kalkulator für Gastronomie",
    description:
      "Wissen statt raten. Mengen planen, Reste tracken, Kosten in CHF auswerten. 14 Tage gratis testen.",
    url: "https://cheftrack.ch",
    type: "website",
    locale: "de_CH",
    siteName: "Cheftrack"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheftrack — Food Waste Kalkulator für Gastronomie",
    description:
      "Mengen planen, Reste tracken, Kosten in CHF auswerten. Für Hotels, Catering & Events."
  },
  verification: {
    google: "WjEs-9naA_DV_mBEGS_Sa_LTv85b-DmBRdgV8caFtH8"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Cheftrack",
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "Food Waste Management",
              operatingSystem: "Web",
              availableOnDevice: "Web Browser",
              description:
                "Food Waste Kalkulator für Gastronomie — Mengen planen, Reste tracken, Kosten in CHF auswerten. Für Hotels, Catering und Event-Locations im DACH-Raum.",
              url: "https://cheftrack.ch",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "19",
                highPrice: "49",
                priceCurrency: "CHF",
                offerCount: "2"
              },
              author: {
                "@type": "Person",
                name: "John Mayer"
              },
              countriesSupported: ["CH", "DE", "AT"],
              inLanguage: "de"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cheftrack",
              url: "https://cheftrack.ch",
              description: "B2B-SaaS Food Waste Kalkulator für Gastronomie im DACH-Raum",
              foundingDate: "2025",
              founder: {
                "@type": "Person",
                name: "John Mayer",
                jobTitle: "Gründer & CEO"
              },
              areaServed: [
                { "@type": "Country", name: "Switzerland" },
                { "@type": "Country", name: "Germany" },
                { "@type": "Country", name: "Austria" }
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "info@cheftrack.ch",
                availableLanguage: ["German", "English"]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Was ist Cheftrack?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cheftrack ist ein Food-Waste-Kalkulator für die Gastronomie. Köche geben Gästezahl und Event-Typ ein, erhalten Mengenempfehlungen und können nach dem Event Reste tracken, um die tatsächlichen Kosten in CHF zu sehen."
                  }
                },
                {
                  "@type": "Question",
                  name: "Für wen ist Cheftrack geeignet?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cheftrack ist ideal für Küchenchefs, F&B-Manager und Catering-Betriebe die regelmässig Events, Buffets oder Bankette planen — besonders im DACH-Raum (Schweiz, Deutschland, Österreich)."
                  }
                },
                {
                  "@type": "Question",
                  name: "Was kostet Cheftrack?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Basic kostet CHF 19 pro Monat (bis 10 Events), Pro kostet CHF 49 pro Monat (unbegrenzte Events). Es gibt einen 14-tägigen Gratis-Test ohne Kreditkarte."
                  }
                },
                {
                  "@type": "Question",
                  name: "Wie unterscheidet sich Cheftrack von Winnow oder Kitro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Winnow und Kitro nutzen teure Hardware wie Kameras und Waagen und richten sich an Enterprise-Kunden. Cheftrack ist eine reine Software-Lösung — günstiger, schneller eingerichtet, ideal für kleinere und mittlere Gastro-Betriebe."
                  }
                },
                {
                  "@type": "Question",
                  name: "Ersetzt Cheftrack die Erfahrung eines Kochs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nein. Cheftrack ergänzt die Erfahrung eines Kochs mit echten Zahlen. Es macht Bauchgefühl messbar und wiederholbar, ersetzt es aber nicht."
                  }
                },
                {
                  "@type": "Question",
                  name: "Was sind Repeat-Events?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Wenn du den gleichen Event-Typ wiederholt planst (z.B. monatlicher Brunch-Buffet für 80 Gäste), vergleicht Cheftrack automatisch und zeigt dir, wo du beim letzten Mal zu viel oder zu wenig hattest. Mit jedem Event wird deine Planung präziser."
                  }
                },
                {
                  "@type": "Question",
                  name: "Brauche ich technische Kenntnisse?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nein. Cheftrack ist so einfach wie eine Koch-App. Erstes Event anlegen dauert 2 Minuten. Keine Installation, keine Hardware, keine Schulung nötig."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
