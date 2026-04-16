import Image from "next/image";
import Link from "next/link";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: ReadonlyArray<LegalSection>;
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <main className="page">
      <div className="container">
        <Link href="/" className="back-link" aria-label="Zurueck zur Startseite">
          ← Zurueck
        </Link>
        <section className="legal-card">
          <Image
            className="brand-mark"
            src="/cheftrack-transparent.svg"
            alt="Cheftrack Logo"
            width={170}
            height={60}
          />
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="intro">{intro}</p>

          {sections.map((section) => (
            <div className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
