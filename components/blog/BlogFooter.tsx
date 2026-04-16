type Source = {
  label: string;
  href: string;
};

type BlogFooterProps = {
  sources: Source[];
};

export function BlogFooter({ sources }: BlogFooterProps) {
  return (
    <footer className="blog-footer">
      <h2>Quellen</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
