type BlogHeroProps = {
  title: string;
  description: string;
  readingTime: string;
  publishedDate: string;
  author: string;
};

export function BlogHero({
  title,
  description,
  readingTime,
  publishedDate,
  author
}: BlogHeroProps) {
  return (
    <section className="editorial-hero">
      <div className="container editorial-shell">
        <span className="editorial-kicker">Blog</span>
        <h1>{title}</h1>
        <p className="editorial-lead">{description}</p>
        <div className="editorial-meta">
          <span>{readingTime}</span>
          <span>{publishedDate}</span>
          <span>{author}</span>
        </div>
      </div>
    </section>
  );
}
