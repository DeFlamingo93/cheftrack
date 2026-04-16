import Link from "next/link";

export function FAQCta() {
  return (
    <section className="blog-cta faq-cta">
      <h2>Noch Fragen offen?</h2>
      <p>
        Teste Cheftrack 14 Tage im echten Küchenalltag oder schreib direkt an
        info@cheftrack.ch.
      </p>
      <div className="faq-cta-actions">
        <Link className="btn btn-primary" href="/app/signup">
          14 Tage kostenlos testen
        </Link>
        <a className="btn btn-secondary" href="mailto:info@cheftrack.ch">
          E-Mail schreiben
        </a>
      </div>
    </section>
  );
}
