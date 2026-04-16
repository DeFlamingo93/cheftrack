export const blogPublishedDate = "2026-04-16";

export const blogMeta = {
  readingTime: "6 Min. Lesezeit",
  author: "Cheftrack Team"
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const blogSections: BlogSection[] = [
  {
    id: "was-ist-food-waste",
    title: "Was ist Food Waste in der Gastronomie?",
    paragraphs: [
      "Food Waste in der Gastronomie bezeichnet alle Lebensmittel, die in professionellen Küchen zubereitet, aber nicht serviert oder gegessen werden. Dazu gehören Überproduktion bei Buffets, Tellerrückläufe, Rüstabfälle und abgelaufene Lagerbestände. In der Schweiz entstehen rund 13% des gesamten Food Waste in der Gastronomie — das sind über 290'000 Tonnen pro Jahr.",
      "Für einen einzelnen Betrieb bedeutet das: Jedes Kilogramm Food Waste kostet im Schnitt rund CHF 24. Bei einem Hotel mit 200 Events pro Jahr summiert sich das schnell auf fünfstellige Beträge — Geld, das direkt im Abfall landet."
    ]
  },
  {
    id: "wahre-kosten",
    title: "Die wahren Kosten: Mehr als nur Wareneinsatz",
    paragraphs: [
      "Wenn nach einem Bankett für 150 Gäste fünf GN-Schalen übrig bleiben, denken viele zuerst an den Wareneinsatz. Aber die echten Kosten gehen weiter: Arbeitszeit für Vorbereitung und Zubereitung, Energiekosten fürs Kochen und Kühlen, und Entsorgungskosten. Eine Studie der Berner Fachhochschule zeigt, dass die tatsächlichen Kosten von Food Waste in der Gastronomie den reinen Warenwert um das Zwei- bis Dreifache übersteigen.",
      "Für einen typischen Schweizer Gastro-Betrieb sieht die Rechnung so aus: Wenn pro Event durchschnittlich 5-10% der zubereiteten Speisen im Abfall landen und der Betrieb 100 Events im Jahr macht, ergibt sich ein Verlust von CHF 10'000 bis CHF 30'000 jährlich — je nach Betriebsgrösse und Art der Events."
    ]
  },
  {
    id: "warum-passiert-das",
    title: "Warum passiert das immer wieder?",
    paragraphs: [
      "Die häufigsten Ursachen sind nachvollziehbar. Köche planen lieber etwas mehr als zu wenig — niemand will, dass das Buffet leer aussieht oder ein Gang fehlt. Dazu kommt: Es fehlt an Werkzeugen, um systematisch zu erfassen, was nach einem Event tatsächlich übrig bleibt. Die meisten Küchen arbeiten mit Erfahrungswerten und Bauchgefühl.",
      "Das funktioniert bei erfahrenen Köchen oft erstaunlich gut, aber es ist nicht messbar und nicht übertragbar. Wenn der erfahrene Küchenchef im Urlaub ist oder ein neuer Betrieb übernommen wird, geht dieses Wissen schnell verloren."
    ]
  },
  {
    id: "was-betriebe-tun-koennen",
    title: "Was Betriebe dagegen tun können",
    paragraphs: [
      "Der wichtigste Schritt ist simpel: messen. Wer nach jedem Event systematisch erfasst, was übrig bleibt, erkennt Muster. Vielleicht wird beim Brunch-Buffet immer zu viel Lachs eingeplant, aber Rührei geht jedes Mal aus. Ohne Daten sind das Vermutungen — mit Tracking werden es Fakten.",
      "Es gibt verschiedene Ansätze: Manche Hotels arbeiten mit Excel-Listen, andere nutzen spezialisierte Software. Der Vorteil digitaler Tools liegt in der automatischen Auswertung und dem Vergleich über mehrere Events hinweg. Besonders bei wiederkehrenden Anlässen zeigen sich schnell Muster, die mit einer einfachen Tabelle schwer erkennbar wären."
    ]
  },
  {
    id: "repeat-events",
    title: "Repeat-Events: Wo das grösste Sparpotenzial liegt",
    paragraphs: [
      "Der stärkste Hebel gegen Food Waste sind wiederkehrende Events. Wenn ein Hotel jeden Samstag ein Brunch-Buffet für 80-120 Gäste anbietet, kann es nach wenigen Durchläufen präzise vorhersagen, welche Mengen tatsächlich gebraucht werden. Die Bedingung: Die Reste müssen nach jedem Event konsequent erfasst werden.",
      "In der Praxis zeigt sich oft, dass bestimmte Posten konstant übrig bleiben, während andere immer zu knapp sind. Wer das weiss, kann gezielt anpassen — und spart nicht nur Geld, sondern reduziert auch den Stress in der Küche."
    ]
  },
  {
    id: "fazit",
    title: "Fazit: Kleine Änderung, grosse Wirkung",
    paragraphs: [
      "Food Waste in der Gastronomie ist kein unlösbares Problem. Der erste Schritt ist, zu wissen was wirklich passiert — nicht schätzen, sondern messen. Viele Betriebe sind überrascht, wie viel Geld sie sparen können, wenn sie ihre Mengenplanung auf Daten statt auf Vermutungen stützen.",
      "Tools wie Cheftrack machen genau das einfach: Event planen, Reste eintragen, Kosten sehen. Ohne Hardware, ohne Schulung, ohne Enterprise-Budget. Ab CHF 19 im Monat."
    ]
  }
];

export const blogHighlightFacts = [
  "Jedes Kilogramm Food Waste kostet im Schnitt rund CHF 24.",
  "100 Events pro Jahr können schnell CHF 10'000 bis CHF 30'000 Verlust bedeuten.",
  "Wiederkehrende Buffets zeigen oft schon nach wenigen Durchläufen klare Muster."
];

export const blogQuote =
  "Die Daten kommen aus der Erfahrung. Aber wenn der erfahrene Küchenchef im Urlaub ist oder ein neuer Betrieb übernommen wird, geht dieses Wissen verloren.";

export const blogSources = [
  {
    label: "Berner Fachhochschule: Food Waste in der Gastronomie",
    href: "https://www.bfh.ch/dam/jcr%3Ae21ceab0-4b59-4cad-8e83-b527eddd867a/food-waste-gastronomie.pdf"
  },
  {
    label: "foodwaste.ch",
    href: "https://foodwaste.ch"
  },
  {
    label: "BAFU: Food Waste",
    href: "https://www.bafu.admin.ch/en/food-waste"
  }
];
