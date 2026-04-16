type FAQHeroProps = {
  title: string;
  description: string;
};

export function FAQHero({ title, description }: FAQHeroProps) {
  return (
    <section className="editorial-hero faq-hero">
      <div className="container editorial-shell">
        <span className="editorial-kicker">FAQ</span>
        <h1>{title}</h1>
        <p className="editorial-lead">{description}</p>
      </div>
    </section>
  );
}
