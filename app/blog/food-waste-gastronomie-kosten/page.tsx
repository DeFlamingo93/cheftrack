import type { Metadata } from "next";
import { BlogBody } from "@/components/blog/BlogBody";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogHero } from "@/components/blog/BlogHero";
import { TableOfContents } from "@/components/blog/TableOfContents";
import {
  blogHighlightFacts,
  blogMeta,
  blogPublishedDate,
  blogQuote,
  blogSections,
  blogSources
} from "@/lib/blogContent";

export const metadata: Metadata = {
  title: "Food Waste in der Gastronomie: Was es wirklich kostet (mit Rechner)",
  description:
    "Schweizer Gastro-Betriebe verlieren tausende Franken pro Jahr durch Food Waste. Erfahre die wahren Kosten — und wie du sie mit einfachen Mitteln senkst.",
  keywords:
    "food waste gastronomie kosten, lebensmittelverschwendung hotel, food waste restaurant schweiz",
  alternates: {
    canonical: "https://cheftrack.ch/blog/food-waste-gastronomie-kosten"
  },
  openGraph: {
    title: "Food Waste in der Gastronomie: Was es wirklich kostet",
    description:
      "Schweizer Gastro-Betriebe verlieren tausende Franken pro Jahr durch Food Waste. Erfahre die wahren Kosten — und wie du sie mit einfachen Mitteln senkst.",
    url: "https://cheftrack.ch/blog/food-waste-gastronomie-kosten",
    type: "article",
    publishedTime: blogPublishedDate,
    authors: ["Cheftrack Team"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Waste in der Gastronomie: Was es wirklich kostet",
    description:
      "Schweizer Gastro-Betriebe verlieren tausende Franken pro Jahr durch Food Waste. Erfahre die wahren Kosten — und wie du sie mit einfachen Mitteln senkst."
  }
};

export default function BlogFoodWasteKostenPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Food Waste in der Gastronomie: Was es wirklich kostet — und wie du es änderst",
    description:
      "Schweizer Gastro-Betriebe verlieren tausende Franken pro Jahr durch Food Waste. Erfahre die wahren Kosten — und wie du sie mit einfachen Mitteln senkst.",
    datePublished: blogPublishedDate,
    dateModified: blogPublishedDate,
    author: {
      "@type": "Organization",
      name: "Cheftrack"
    },
    publisher: {
      "@type": "Organization",
      name: "Cheftrack",
      logo: {
        "@type": "ImageObject",
        url: "https://cheftrack.ch/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://cheftrack.ch/blog/food-waste-gastronomie-kosten"
    },
    keywords:
      "food waste gastronomie kosten, lebensmittelverschwendung hotel, food waste restaurant schweiz"
  };

  return (
    <main className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogHero
        title="Food Waste in der Gastronomie: Was es wirklich kostet — und wie du es änderst"
        description="Schweizer Gastro-Betriebe verlieren tausende Franken pro Jahr durch Food Waste. Dieser Beitrag zeigt, wo die echten Kosten liegen und warum wiederkehrende Events der grösste Hebel sind."
        readingTime={blogMeta.readingTime}
        publishedDate={blogPublishedDate}
        author={blogMeta.author}
      />

      <section className="editorial-content">
        <div className="container editorial-grid">
          <TableOfContents items={blogSections.map(({ id, title }) => ({ id, title }))} />
          <div className="editorial-main">
            <BlogBody
              sections={blogSections}
              quote={blogQuote}
              facts={blogHighlightFacts}
            />
            <BlogCTA />
            <section className="related-card">
              <h2>Weitere Themen folgen</h2>
              <p>
                Cheftrack baut den Blog in den nächsten Wochen weiter aus — mit Artikeln zu
                Buffet-Planung, Repeat-Events und Food-Waste-Kosten im Küchenalltag.
              </p>
            </section>
            <BlogFooter sources={blogSources} />
          </div>
        </div>
      </section>
    </main>
  );
}
