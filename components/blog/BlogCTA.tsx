import Link from "next/link";

export function BlogCTA() {
  return (
    <section className="blog-cta">
      <h2>Weniger schätzen. Besser planen.</h2>
      <p>
        Cheftrack zeigt dir nach jedem Event, was zu viel war und wo dein Betrieb beim
        nächsten Mal Geld sparen kann.
      </p>
      <Link className="btn btn-primary" href="/app/signup">
        14 Tage kostenlos testen
      </Link>
    </section>
  );
}
