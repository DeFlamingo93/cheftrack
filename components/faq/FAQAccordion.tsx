"use client";

import { useMemo, useState } from "react";
import type { FAQItem } from "@/lib/faqContent";
import { FAQSearch } from "./FAQSearch";

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [query, setQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;

    return items.filter((item) => {
      const haystack = `${item.question} ${item.answer.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, query]);

  function toggle(index: number) {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <div className="faq-shell">
      <FAQSearch value={query} onChange={setQuery} />
      <div className="faq-list">
        {filteredItems.map((item, index) => {
          const isOpen = openItems.includes(index);

          return (
            <article key={item.question} className={`faq-entry${isOpen ? " open" : ""}`}>
              <button
                type="button"
                className="faq-trigger"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-panel">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
