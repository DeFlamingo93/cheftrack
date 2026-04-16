"use client";

type FAQSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function FAQSearch({ value, onChange }: FAQSearchProps) {
  return (
    <div className="faq-search">
      <label htmlFor="faq-search" className="sr-only">
        FAQ durchsuchen
      </label>
      <input
        id="faq-search"
        type="search"
        placeholder="Frage oder Stichwort suchen"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
