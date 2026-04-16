type TocItem = {
  id: string;
  title: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside className="toc-card">
      <h2>Inhaltsverzeichnis</h2>
      <nav aria-label="Inhaltsverzeichnis">
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.title}</a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
