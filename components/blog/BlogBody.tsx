import type { BlogSection } from "@/lib/blogContent";

type BlogBodyProps = {
  sections: BlogSection[];
  quote: string;
  facts: string[];
};

export function BlogBody({ sections, quote, facts }: BlogBodyProps) {
  return (
    <div className="blog-article">
      <div className="fact-grid">
        {facts.map((fact) => (
          <div key={fact} className="fact-card">
            <strong>{fact}</strong>
          </div>
        ))}
      </div>

      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="blog-section">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {index === 2 ? <blockquote>{quote}</blockquote> : null}
        </section>
      ))}
    </div>
  );
}
