export type FAQItem = {
  question: string;
  answer: string[];
};

export const faqItems: FAQItem[] = [
  {
    question: "Was ist Cheftrack?",
    answer: [
      "Cheftrack ist ein Food-Waste-Kalkulator für die Gastronomie. Du gibst die Gästezahl und den Event-Typ ein, bekommst Mengenempfehlungen und trägst nach dem Event ein, was übrig geblieben ist.",
      "Das Dashboard zeigt dir sofort: Wie viel hat der Food Waste in CHF gekostet? Wo hast du zu viel geplant?"
    ]
  },
  {
    question: "Für wen ist Cheftrack?",
    answer: [
      "Für jeden der in einer professionellen Küche Mengen planen muss: Küchenchefs, Sous-Chefs, F&B-Manager, Catering-Unternehmer und Event-Locations.",
      "Besonders wertvoll ist Cheftrack für Betriebe mit wiederkehrenden Events — Hotels mit regelmässigen Banketten, Caterer mit Stammkunden oder Locations mit wöchentlichen Anlässen."
    ]
  },
  {
    question: "Was kostet Cheftrack?",
    answer: [
      "Basic: CHF 19 pro Monat — bis zu 10 Events, ideal zum Ausprobieren.",
      "Pro: CHF 49 pro Monat — unbegrenzte Events, für aktive Betriebe. Enterprise: Auf Anfrage. Der Gratis-Test läuft 14 Tage kostenlos und braucht keine Kreditkarte."
    ]
  },
  {
    question: "Wie unterscheidet sich Cheftrack von Winnow, Kitro oder Leanpath?",
    answer: [
      "Der grösste Unterschied: Cheftrack braucht keine Hardware. Winnow, Kitro und Leanpath arbeiten mit Kameras, Waagen oder speziellen Geräten, die in der Küche installiert werden müssen.",
      "Cheftrack ist eine reine Browser-App. Du meldest dich an und legst dein erstes Event in 2 Minuten an. Kein Download, keine Installation, keine Techniker vor Ort."
    ]
  },
  {
    question: "Brauche ich technische Kenntnisse?",
    answer: [
      "Nein. Cheftrack ist so einfach wie eine Koch-App. Wenn du ein Smartphone bedienen kannst, kannst du Cheftrack nutzen.",
      "Es gibt kein kompliziertes Setup, keine Schulung und keine IT-Abteilung, die du dafür brauchst."
    ]
  },
  {
    question: "Ersetzt Cheftrack die Erfahrung eines Kochs?",
    answer: [
      "Nein — und das ist auch nicht das Ziel. Cheftrack ergänzt deine Erfahrung mit echten Zahlen.",
      "Dein Bauchgefühl sagt dir, dass der Lachs zu viel war. Cheftrack zeigt dir, wie viel zu viel es war, was es gekostet hat und ob das Muster schon beim letzten Event sichtbar war."
    ]
  },
  {
    question: "Was sind Repeat-Events und warum sind sie so wichtig?",
    answer: [
      "Repeat-Events sind wiederkehrende Anlässe — zum Beispiel der monatliche Brunch, das wöchentliche Mittagsbuffet oder der Quartals-Apéro.",
      "Bei diesen Events wird Cheftrack mit jedem Mal schlauer: Es vergleicht automatisch, was beim letzten Mal übrig blieb, und zeigt dir, welche Posten du anpassen solltest."
    ]
  },
  {
    question: "Wie schnell sehe ich Ergebnisse?",
    answer: [
      "Die ersten Erkenntnisse hast du nach dem ersten Event — du siehst schwarz auf weiss, was übrig geblieben ist und was es gekostet hat.",
      "Der echte Mehrwert zeigt sich ab dem zweiten oder dritten Event desselben Typs, wenn Cheftrack Muster erkennt und du gezielt optimieren kannst."
    ]
  },
  {
    question: "Kann ich Cheftrack auf dem Handy nutzen?",
    answer: [
      "Ja. Cheftrack läuft im Browser und ist für Mobile optimiert.",
      "Du kannst nach dem Event direkt in der Küche vom Handy aus die Reste eintragen."
    ]
  },
  {
    question: "Welche Event-Typen unterstützt Cheftrack?",
    answer: [
      "Aktuell unterstützt Cheftrack Brunch-Buffet, Mittags-Buffet, Abend-Buffet, Hochzeit, Firmenanlass, Bankett, Apéro/Stehempfang, Konferenz/Tagung und individuelle Event-Typen.",
      "Eigene Typen kannst du zusätzlich anlegen, wenn deine Abläufe spezieller sind."
    ]
  },
  {
    question: "Kann ich meine Daten exportieren?",
    answer: [
      "Ja. Cheftrack bietet PDF-Export für Event-Auswertungen.",
      "Du kannst Reports für einzelne Events oder Zeiträume erstellen — praktisch für Geschäftsleitung, Nachkalkulation oder Nachhaltigkeitsberichte."
    ]
  },
  {
    question: "Sind meine Daten sicher?",
    answer: [
      "Ja. Cheftrack speichert alle Daten verschlüsselt und DSGVO-konform.",
      "Deine Rezepte, Mengenplanungen und Event-Daten gehören dir und werden nicht mit Dritten geteilt."
    ]
  },
  {
    question: "Wie kann ich starten?",
    answer: [
      "Gehe auf cheftrack.ch, klicke auf Gratis testen und erstelle deinen Account. Das dauert rund 30 Sekunden.",
      "Danach legst du dein erstes Event an, trägst nach dem Service die Reste ein und siehst direkt deine erste Auswertung."
    ]
  },
  {
    question: "Brauche ich für den Gratis-Test eine Kreditkarte?",
    answer: [
      "Nein. Der 14-tägige Gratis-Test funktioniert ohne Kreditkarte.",
      "So kannst du Cheftrack erst im Alltag prüfen und in Ruhe entscheiden, ob es für deinen Betrieb passt."
    ]
  }
];

export const faqJsonLd = faqItems.map((item) => ({
  "@type": "Question",
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: item.answer.join(" ")
  }
}));
