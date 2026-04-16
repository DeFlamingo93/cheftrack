const topbar = document.getElementById("topbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const eventsRange = document.getElementById("eventsRange");
const guestsRange = document.getElementById("guestsRange");
const reductionRange = document.getElementById("reductionRange");
const eventsValue = document.getElementById("eventsValue");
const guestsValue = document.getElementById("guestsValue");
const reductionValue = document.getElementById("reductionValue");
const savingsValue = document.getElementById("savingsValue");
const savingsContext = document.getElementById("savingsContext");
const roiValue = document.getElementById("roiValue");
const savingsCta = document.getElementById("savingsCta");
const pricingSummary = document.getElementById("pricingSummary");
const wowSavingsValue = document.getElementById("wowSavingsValue");
const wowCompareValue = document.getElementById("wowCompareValue");
const wowAnnualValue = document.getElementById("wowAnnualValue");
const wowAnnualNote = document.getElementById("wowAnnualNote");
const wowEventsBadge = document.getElementById("wowEventsBadge");
const wowGuestsBadge = document.getElementById("wowGuestsBadge");
const wowReductionBadge = document.getElementById("wowReductionBadge");
const calculatorCompareValue = document.getElementById("calculatorCompareValue");
const billingOptions = document.querySelectorAll(".billing-option");
const languageOptions = document.querySelectorAll(".language-option");
const currencyOptions = document.querySelectorAll(".currency-option");
const planOptions = document.querySelectorAll(".plan-option");
const pricingCards = document.querySelectorAll(".pricing-card[data-plan]");
const priceElements = document.querySelectorAll(".price[data-price-monthly-chf]");
const priceNotes = document.querySelectorAll(".price-note");
const planCtas = document.querySelectorAll(".plan-cta");

const STORAGE_KEY = "cheftrack_currency";
const LANGUAGE_STORAGE_KEY = "cheftrack_language";
const CHF_TO_EUR = 1.04;
const FOOD_WASTE_COST_PER_KG_CHF = 24;
const AVG_FOOD_WASTE_KG_PER_GUEST = 0.18;

let currentPlan = "pro";
let currentBilling = "monthly";
let currentCurrency = detectCurrency();
let currentLanguage = detectLanguage();

const translations = {
  de: {
    labels: {
      brandAria: "Cheftrack Startseite",
      navAria: "Hauptnavigation",
      navToggle: "Navigation öffnen",
      languageAria: "Sprache wählen",
      currencyAria: "Währung wählen"
    },
    nav: ["Vorteile", "Preise", "Über uns", "FAQ"],
    navCta: "14 Tage kostenlos testen",
    heroEyebrow: "Für Restaurants, Hotels, Catering und Buffets",
    heroTitle:
      'Weniger Food Waste. <span class="headline-highlight">Mehr Gewinn im Betrieb.</span>',
    heroText:
      "Cheftrack zeigt Ihnen nach jedem Event, was zu viel produziert wurde. So planen Sie beim nächsten Mal genauer, werfen weniger weg und behalten Ihre Kosten besser im Griff.",
    heroActions: ["14 Tage kostenlos testen", "Demo ansehen"],
    socialProof: "Entstanden aus echter Praxiserfahrung in der Gastronomie",
    previewTitle: "Tracke deine Küche. Spare bares Geld.",
    metricLabels: ["Events diesen Monat", "Verschwendet (Monat)", "Gespart mit Cheftrack", "Bestes Event"],
    bestEvent: "Frühstücks-<br>buffet",
    eventButton: "Neues Event erfassen",
    eventListTitle: "Abgeschlossene Events",
    eventRows: [
      {
        title: "Frühstücksbuffet Landgasthof Zum Adler",
        meta: "12.04.2026 • 60 Gäste",
        status: "Fertig"
      },
      {
        title: "Business Lunch Hotel Bellevue",
        meta: "09.04.2026 • 84 Gäste",
        status: "Fertig"
      }
    ],
    barLabels: ["Buffet Auslastung", "Vermeidbarer Waste", "Empfohlene Anpassung"],
    reportBadge: "PDF Report bereit",
    reportItems: ["Hauptgericht", "Dessert", "Warenwert", "Neue Zielmenge"],
    reportTarget: "118 Portionen",
    bottomNav: ["Home", "Events", "Übersicht", "Einstellungen"],
    heroCaption: "Für Restaurants, Hotels, Catering und Betriebe mit Buffets oder Events.",
    problem: {
      eyebrow: "Das Problem",
      title: "Kennen Sie das?",
      cards: [
        {
          title: "Nach dem Service bleibt oft mehr übrig, als gedacht.",
          text: "Aufschnitt, Beilagen, Salate oder Desserts summieren sich schnell zu echtem Geldverlust."
        },
        {
          title: "Es wird oft mehr eingekauft und vorbereitet, als nötig.",
          text: "Im Stress bleibt selten Zeit, Mengen sauber nachzurechnen. Also wird mit Reserve geplant und die Marge leidet."
        },
        {
          title: "Food Waste kostet mehr, als man im Alltag wahrnimmt.",
          text: "Ohne klare Zahlen pro Event bleibt unklar, wo Geld verloren geht und was beim nächsten Mal anders laufen sollte."
        }
      ],
      stat: "Fehlplanung kostet nicht nur Lebensmittel. Sie kostet direkt Marge, Zeit und Sicherheit im Betrieb."
    },
    solution: {
      eyebrow: "So funktioniert's",
      title: "In 3 Schritten zu weniger Food Waste",
      text: "Ohne komplizierte Software. Einfach erfassen, Reste eintragen und beim nächsten Event besser planen.",
      steps: [
        {
          title: "1. Event oder Buffet erfassen",
          text: "Sie tragen Gästezahl und Art des Events ein."
        },
        {
          title: "2. Übrig gebliebenes eintragen",
          text: "Nach dem Service halten Sie kurz fest, was übrig geblieben ist."
        },
        {
          title: "3. Beim nächsten Mal besser planen",
          text: "Cheftrack zeigt Ihnen, wo zu viel produziert wurde und wie Sie Mengen besser einschätzen."
        }
      ]
    },
    wow: {
      eyebrow: "So sieht Ihr Ergebnis aus",
      title: "Ihre Auswertung nach dem Event",
      text: "Sie sehen nach jedem Event, was übrig geblieben ist, was das gekostet hat und welches Potenzial bei der nächsten Planung drinliegt.",
      kicker: "Bis zu",
      subtitle: "potenzielle Einsparung pro Jahr",
      note: "Basierend auf typischen Branchenwerten, 24 CHF pro kg Food Waste und Ihren Eingaben.",
      annualLabel: "Jahreshochrechnung"
    },
    features: {
      eyebrow: "Praktisch im Alltag",
      title: "Für Küche, Buffet und Eventplanung gemacht",
      text: "Cheftrack hilft dort, wo im Alltag oft keine Zeit für sauberes Nachrechnen bleibt.",
      cards: [
        ["Mengen besser einschätzen", "Sie sehen schneller, was bei ähnlichen Events wirklich gebraucht wird."],
        ["Kosten direkt sehen", "Nicht nur Prozentwerte, sondern Verluste und potenzielle Einsparung in Ihrer Währung."],
        ["Jahreshochrechnung", "Sie sehen, was kleine Verbesserungen über das Jahr ausmachen können."],
        ["PDF-Report", "Praktisch für Nachkalkulation, Buchhaltung und interne Besprechungen."],
        ["Am Handy nutzbar", "Direkt im Browser. Ohne Installation, auch zwischen Küche und Service."],
        ["Für Restaurants, Hotels, Catering und Buffets", "Besonders hilfreich für Betriebe mit wiederkehrenden Buffets, Events oder wechselnden Gästezahlen."]
      ]
    },
    retention: {
      eyebrow: "Langfristiger Nutzen",
      title: "Nicht nur einmal besser planen, sondern dauerhaft den Überblick behalten",
      text: "Gästezahlen, Nachfrage und Team wechseln ständig. Darum braucht gute Planung im Betrieb mehr als nur Bauchgefühl.",
      introTitle: "Cheftrack hilft Ihnen, aus jedem Event etwas für das nächste mitzunehmen.",
      introText: "Sie sehen schneller, wo wieder zu viel produziert wurde, wo Mengen besser passen und wo sich Verluste wieder einschleichen.",
      statement: "Damit gute Kalkulation im Alltag bleibt und nicht vom Zufall abhängt.",
      cards: [
        ["Verlauf & Trends", "Sie sehen, ob Ihre Planung von Event zu Event besser wird oder wieder ungenauer läuft."],
        ["Warnhinweise", "Sie merken schneller, wenn Food Waste oder Kosten wieder ansteigen."],
        ["Event-Vergleich", "Sie vergleichen ähnliche Anlässe und sehen, wo Ihre Planung besser passt."],
        ["Praktische Hinweise", "Sie bekommen konkrete Anhaltspunkte, wo Sie Mengen vorsichtiger planen können."],
        ["Mehr Klarheit im Team", "Auch bei wechselndem Personal bleibt besser nachvollziehbar, wie geplant werden sollte."]
      ]
    },
    roi: {
      eyebrow: "ROI-Rechner",
      title: "Was kann das für Ihren Betrieb bedeuten?",
      text: "Mit wenigen Angaben sehen Sie eine realistische Jahreshochrechnung auf Basis typischer Branchenwerte.",
      labels: ["Wie viele Events pro Monat?", "Durchschnittliche Gästezahl?", "Reduktionspotenzial?"],
      resultTitle: "Potenzielle Einsparung pro Jahr:"
    },
    testimonials: [
      "„Bei einem Buffet mit 60 Gästen bleiben schnell ein paar Kilo zu viel übrig. Genau solche Verluste werden mit Cheftrack sichtbar.“",
      "„Vor allem bei Events mit wechselnder Gästezahl hilft eine klare Nachkalkulation, beim nächsten Mal sicherer zu planen.“",
      "„Wenn nach Frühstück oder Bankett regelmässig etwas übrig bleibt, lohnt sich schon ein kleinerer Blick auf Mengen und Kosten.“"
    ],
    testimonialAuthors: [
      "Beispiel: Landgasthof mit Buffetbetrieb",
      "Beispiel: Catering mit Eventgeschäft",
      "Beispiel: Hotel mit Frühstücksservice"
    ],
    pricing: {
      eyebrow: "Preise",
      title: "Cheftrack soll sich im Alltag lohnen",
      text: "Wählen Sie den Tarif, der zu Ihrem Betrieb passt, und machen Sie Food Waste Schritt für Schritt besser kontrollierbar.",
      billing: ["Monatlich", "Jährlich", "2 Monate geschenkt"],
      picker: [
        ["BASIC", "Für den einfachen Einstieg im Alltag"],
        ["PRO", "Für Betriebe, die Verluste aktiv reduzieren wollen"],
        ["ENTERPRISE", "Für mehrere Standorte oder besondere Abläufe"]
      ],
      popularBadge: "Beliebteste Wahl",
      planHighlight: "Rechnet sich oft schon nach dem ersten Event",
      tags: ["Für den Einstieg", "Für wachsende Betriebe", "Für mehrere Standorte"],
      bullets: {
        basic: [
          "Bis zu 10 Events pro Monat",
          "Einfach starten ohne lange Einarbeitung",
          "Erste Verluste im Alltag sichtbar machen",
          "Besser planen bei wiederkehrenden Buffets und Events",
          "Kosten und Einsparungen in Ihrer Währung",
          "Keine PDF Reports",
          "Keine Jahresübersicht"
        ],
        pro: [
          "Unbegrenzte Events für laufende Kostenkontrolle",
          "Bessere Mengenplanung für Buffet, Catering und Veranstaltungen",
          "Weniger Fehlplanung bei Einkauf und Vorbereitung",
          "Kosten und Einsparungen pro Event klar im Blick",
          "Jahresübersicht und Reports für Nachkalkulation",
          "Hilft, Marge im Alltag besser zu schützen",
          "Prioritäts-Support"
        ],
        enterprise: [
          "Flexible Lösung für mehrere Standorte",
          "Anpassbar an Ihre Abläufe und Anforderungen",
          "Gemeinsame Auswertung für Teams und Küchen",
          "Unterstützung bei einheitlicher Planung im Betrieb",
          "Persönliche Begleitung beim Setup",
          "Individuelle Betreuung nach Bedarf"
        ]
      },
      roi: "Bleiben nach einem Buffet nur 1 bis 2 kg Aufschnitt, Salat oder Beilagen übrig, entspricht das oft schon dem Monatsbetrag von Cheftrack.",
      footnote: "✓ 14 Tage kostenlos testen   ✓ Zahlung per Kreditkarte möglich   ✓ Jederzeit vor Ablauf kündbar",
      ctas: {
        basic: "14 Tage kostenlos testen",
        pro: "Jetzt Kosten reduzieren",
        enterprise: "Individuelle Lösung anfragen"
      }
    },
    stats: {
      eyebrow: "Markt & Vertrauen",
      title: "Food Waste kostet mehr, als man auf den ersten Blick sieht.",
      text: "Klare Kennzahlen zeigen, warum präzisere Planung in der Gastronomie wirtschaftlich sofort relevant ist.",
      values: ["2 Mio. Tonnen", "20%", "14%", "2 Min."],
      cards: [
        "Lebensmittel werden jährlich in der Gastronomie in Deutschland verschwendet",
        "des Wareneinsatzes werden im Gastgewerbe durchschnittlich entsorgt",
        "der Lebensmittelabfälle in der Schweiz entstehen in der Gastronomie",
        "durchschnittliche Zeit, um Cheftrack zu verstehen und zu nutzen"
      ],
      sources: "Quellen:"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Häufige Fragen",
      qa: [
        ["Brauche ich technische Kenntnisse, um Cheftrack zu nutzen?", "In der Regel nicht. Cheftrack ist bewusst einfach gehalten. Wenn Sie ein Smartphone nutzen und ein Event erfassen können, kommen Sie meist direkt zurecht."],
        ["Funktioniert Cheftrack auf meinem Handy?", "Ja. Cheftrack läuft direkt im Browser auf iPhone und Android. In den meisten Fällen ist kein Download nötig und Sie können direkt loslegen."],
        ["Für welche Betriebe eignet sich Cheftrack?", "Cheftrack eignet sich für Restaurants, Hotels, Catering und Betriebe mit Buffets oder Events. Besonders dort, wo Mengen oft unter Zeitdruck geschätzt werden."],
        ["Wie schnell kann ich starten?", "In der Regel in wenigen Minuten. Sie erfassen Ihr erstes Event, tragen nach dem Service die Reste ein und sehen direkt, wo beim nächsten Mal besser geplant werden kann."],
        ["Lohnt sich Cheftrack für meinen Betrieb?", "In vielen Fällen ja, oft schon durch kleine Anpassungen. Bleiben nach einem Buffet nur 1 bis 2 kg Aufschnitt, Salat oder Beilagen übrig, entspricht das häufig bereits dem Monatsbetrag von Cheftrack. Genau solche Verluste macht die App sichtbar."],
        ["Was passiert mit meinen Daten?", "Ihre Daten werden vertraulich behandelt und nur für die Nutzung von Cheftrack verarbeitet. Sie behalten den Überblick über Ihre eigenen Betriebsdaten."],
        ["Kann ich jederzeit kündigen?", "Ja. Sie können jederzeit vor Ablauf kündigen. So testen Sie Cheftrack ohne langfristiges Risiko im laufenden Betrieb."]
      ],
      cta: "14 Tage kostenlos testen"
    },
    about: {
      eyebrow: "Über uns",
      title: "Cheftrack ist nicht am Schreibtisch entstanden, sondern in der Praxis.",
      desktop: [
        "Über Jahre hinweg haben wir in verschiedenen Gastronomiebetrieben immer wieder das gleiche Problem gesehen: Lebensmittel werden eingekauft, verarbeitet und am Ende bleibt trotzdem zu viel übrig. Nicht aus Nachlässigkeit, sondern weil im hektischen Alltag oft die Zeit fehlt, den tatsächlichen Bedarf genau zu analysieren.",
        "Gleichzeitig wissen wir, wie knapp die Margen in der Gastronomie sind. <span class=\"about-highlight\">Jeder unnötige Verlust kostet bares Geld</span> und genau hier setzt Cheftrack an.",
        "Die Idee entstand aus dem Wunsch, Küchen eine einfache Möglichkeit zu geben, ihre Prozesse besser zu verstehen und gezielt zu optimieren.",
        "Cheftrack hilft dabei, genau diese Fragen zu beantworten: klar, übersichtlich und ohne komplizierte Systeme. Sie gewinnen ein besseres Verständnis für Ihren tatsächlichen Verbrauch, können gezielter einkaufen und Ihre Kalkulation Schritt für Schritt verbessern.",
        "Das Ergebnis: <span class=\"about-highlight\">weniger Food Waste, mehr Kontrolle über Ihre Kosten und eine spürbar effizientere Küche.</span>",
        "Cheftrack ist eine Lösung aus der Praxis, für Betriebe, die wirtschaftlich denken, Verantwortung übernehmen und ihre Küche nachhaltig optimieren wollen. Für alle, die nicht länger im Blindflug einkaufen, sondern fundierte Entscheidungen treffen möchten.",
        "Denn wer seine Zahlen kennt, reduziert Verluste, steigert seine Effizienz und sichert langfristig den wirtschaftlichen Erfolg seines Betriebs. Cheftrack unterstützt Sie dabei, genau diesen nächsten Schritt zu gehen."
      ],
      questions: [
        "Wie viel wird wirklich gebraucht?",
        "Wie lassen sich Buffets oder Gästezahlen präziser kalkulieren?",
        "Und wie kann der Einkauf so gesteuert werden, dass weniger verschwendet wird?"
      ],
      mobile: [
        "Cheftrack ist nicht am Schreibtisch entstanden, sondern in der Praxis.",
        "In verschiedenen Gastronomiebetrieben haben wir immer wieder das gleiche Problem gesehen: zu viel Food Waste, ungenaue Kalkulation und unnötige Kosten im laufenden Betrieb.",
        "Gerade in der Gastronomie, wo Margen oft knapp sind, macht jeder vermeidbare Verlust einen Unterschied.",
        "Genau deshalb wurde Cheftrack entwickelt: um Küchen dabei zu helfen, ihren tatsächlichen Verbrauch besser zu verstehen, gezielter einzukaufen und Abläufe wirtschaftlicher zu planen.",
        "Das bedeutet für Sie: weniger Verschwendung, mehr Kontrolle über Ihre Kosten und eine effizientere Küche.",
        "Cheftrack ist eine Lösung aus der Praxis, für Betriebe, die nicht länger im Blindflug arbeiten, sondern fundierte Entscheidungen treffen und ihre Küche nachhaltig optimieren wollen."
      ],
      cta: "Jetzt kostenlos testen"
    },
    finalCta: {
      eyebrow: "Startklar",
      title: "Weniger Food Waste. Mehr Kontrolle. Mehr Gewinn.",
      copy: "Sehen Sie nach Ihren nächsten Events klarer, wo zu viel produziert wurde und wie Sie Kosten Schritt für Schritt besser im Griff behalten.",
      trust: ["14 Tage kostenlos testen", "Zahlung bequem per Kreditkarte", "Jederzeit vor Ablauf kündbar"],
      button: "14 Tage kostenlos testen",
      consent: 'Ich akzeptiere <a href="/agb/">AGB</a> und <a href="/datenschutz/">Datenschutzerklärung</a>',
      microcopy: "Keine Abbuchung während der Testphase. Kündigung jederzeit vor Ablauf möglich.",
      proof: "Für den Alltag in Küche, Buffet und Eventplanung gemacht"
    },
    footer: {
      tagline: "Weniger wegwerfen. Besser planen. Kosten im Griff behalten.",
      headings: ["Navigation", "Rechtliches", "Kontakt"],
      nav: ["Startseite", "Vorteile", "Preise", "FAQ", "Demo"],
      legal: ["Datenschutz", "AGB", "Impressum", "Kontakt"],
      contact: ["Zürich, Schweiz", "Für Restaurants, Hotels, Catering und Events im DACH-Raum."],
      bottom: "© 2026 Cheftrack. Alle Rechte vorbehalten."
    },
    pricingSummary: {
      basic: {
        monthly: {
          title: "BASIC ist aktuell ausgewählt. Ideal für Betriebe, die einfach starten und erste Verluste sichtbar machen wollen.",
          note: "pro Monat, monatlich kündbar."
        },
        yearly: {
          title: "BASIC im Jahresmodell ist aktuell ausgewählt. Ein sinnvoller Einstieg für Betriebe, die ohne grossen Aufwand besser planen möchten.",
          note: "2 Monate geschenkt"
        }
      },
      pro: {
        monthly: {
          title: "PRO ist aktuell ausgewählt. Die beste Wahl für Betriebe, die Verluste aktiv reduzieren und ihre Marge besser schützen wollen.",
          note: "pro Monat und rechnet sich oft schon nach dem ersten Event."
        },
        yearly: {
          title: "PRO im Jahresmodell ist aktuell ausgewählt. Ideal für Betriebe, die Planung und Kosten dauerhaft besser im Griff behalten wollen.",
          note: "2 Monate kostenlos sichern"
        }
      },
      enterprise: {
        monthly: {
          title: "ENTERPRISE ist aktuell ausgewählt. Für Betriebe mit mehreren Standorten oder besonderen Anforderungen.",
          note: "Preis auf Anfrage mit persönlicher Abstimmung."
        },
        yearly: {
          title: "ENTERPRISE ist aktuell ausgewählt. Für individuelle Lösungen mit mehreren Standorten oder komplexeren Abläufen.",
          note: "Preis und Umfang werden gemeinsam mit Ihrem Betrieb abgestimmt."
        }
      }
    }
  },
  en: {
    labels: {
      brandAria: "Cheftrack home",
      navAria: "Main navigation",
      navToggle: "Open navigation",
      languageAria: "Select language",
      currencyAria: "Select currency"
    },
    nav: ["Benefits", "Pricing", "About us", "FAQ"],
    navCta: "Try for free",
    heroEyebrow: "Food waste calculator for hospitality",
    heroTitle:
      'Stop food waste. <span class="headline-highlight">Save up to <span class="money-value" data-currency-amount="5000"></span> per year.</span>',
    heroText:
      "Cheftrack shows you in 3 minutes how much your restaurant is wasting per event and how to improve your planning more sustainably.",
    heroActions: ["Start for free →", "View demo"],
    socialProof: "Built around real workflows in hospitality businesses",
    previewTitle: "Track your kitchen. Save real money.",
    metricLabels: ["Events this month", "Wasted (month)", "Saved with Cheftrack", "Best event"],
    bestEvent: "Breakfast<br>buffet",
    eventButton: "Add New Event",
    eventListTitle: "Completed events",
    eventRows: [
      {
        title: "Breakfast buffet Landgasthof Zum Adler",
        meta: "12 Apr 2026 • 60 guests",
        status: "Done"
      },
      {
        title: "Business lunch Hotel Bellevue",
        meta: "09 Apr 2026 • 84 guests",
        status: "Done"
      }
    ],
    barLabels: ["Buffet capacity", "Avoidable waste", "Recommended adjustment"],
    reportBadge: "PDF report ready",
    reportItems: ["Main course", "Dessert", "Goods value", "New target quantity"],
    reportTarget: "118 portions",
    bottomNav: ["Home", "Events", "Overview", "Settings"],
    heroCaption: "Realistic dashboard preview with red waste numbers and green savings",
    problem: {
      eyebrow: "The problem",
      title: "Does this sound familiar?",
      cards: [
        {
          title:
            'After every buffet, food worth <span class="money-value" data-currency-amount="200" data-money-suffix="+"></span> ends up in the bin.',
          text: "You buy with a safety margin, but too much is left over in the end and your margin quietly melts away."
        },
        {
          title: "You still calculate on paper or in Excel.",
          text: "That costs time, creates uncertainty in the team, and leads to the same estimation mistakes at every event."
        },
        {
          title: "You do not know exactly how much money food waste costs you each month.",
          text: "Without clear numbers in your own currency, optimization stays a gut feeling instead of a reliable business lever."
        }
      ],
      stat: "Many hospitality businesses across the DACH region lose thousands every year due to inaccurate buffet planning and limited transparency."
    },
    solution: {
      eyebrow: "The solution",
      title: "How Cheftrack works",
      text: "In three clear steps, you improve buffet planning and see your savings immediately in your own currency.",
      steps: [
        {
          title: "1. Set up event",
          text: "Enter the event type and guest count. Cheftrack automatically recommends the right quantities for each dish."
        },
        {
          title: "2. Enter leftovers",
          text: "After the event, quickly enter what was left over. This takes less than two minutes."
        },
        {
          title: "3. See the analysis",
          text: "Cheftrack immediately shows how much was wasted and what you could have saved with better planning."
        }
      ]
    },
    wow: {
      eyebrow: "This is what your result looks like",
      title: "Your next aha moment in numbers",
      text: "After each event, you see your progress clearly and instantly. No vague percentages, just a realistic savings potential in your own currency.",
      kicker: "Up to",
      subtitle: "potential savings per year",
      note: "Based on industry averages, 24 CHF per kg of food waste, and your inputs.",
      annualLabel: "Annual projection"
    },
    features: {
      eyebrow: "Features",
      title: "Everything you need. Nothing you do not.",
      text: "Cheftrack was built for hospitality teams that want fast clarity without learning complicated software.",
      cards: [
        ["Automatic quantity recommendations", "Based on guest count and event type, Cheftrack calculates the right quantities without guesswork or messy spreadsheets."],
        ["Instant currency analysis", "See right after each event how much you wasted in your local currency instead of abstract percentages."],
        ["Annual projection", "Cheftrack automatically projects your improvements to monthly and yearly values so you can see ROI immediately."],
        ["PDF report", "Download a professional report after each event, ideal for bookkeeping, post-calculation, and cost control."],
        ["Mobile first", "Cheftrack runs directly in the browser on any smartphone. No download required and no extra training effort."],
        ["Built for every hospitality business", "From inns and pizzerias to hotels and catering, Cheftrack adapts to your operation and event flow."]
      ]
    },
    retention: {
      eyebrow: "Long-term value",
      title: "Do not optimize once. Keep costs under control long term.",
      text: "Hospitality is dynamic: guest numbers, staffing, demand, and operations change constantly. That is why continuous control matters more than one-off estimates.",
      introTitle: "Cheftrack supports not just single events, but your ongoing kitchen control.",
      introText: "The app helps you make trends visible, spot deviations early, and improve planning step by step with more confidence.",
      statement: "So your calculations are not right just once, but every day.",
      cards: [
        ["Trends & history", "Track your progress and spot improvements or setbacks immediately."],
        ["Warning system", "Get alerts when food waste or costs start rising again."],
        ["Event comparison", "Compare events and keep improving your planning over time."],
        ["Smart recommendations", "Receive concrete quantity suggestions based on your own data."],
        ["Team usage", "Standardize workflows and ensure consistent results regardless of staff changes."]
      ]
    },
    roi: {
      eyebrow: "ROI calculator",
      title: "How much could you save with Cheftrack?",
      text: "Move the sliders and instantly see your estimated yearly savings and potential return on investment.",
      labels: ["How many events per month?", "Average number of guests?", "Reduction potential?"],
      resultTitle: "Potential savings per year:"
    },
    testimonials: [
      "“After the first event, Cheftrack showed that we had wasted <span class=\"money-value\" data-currency-amount=\"240\"></span>. Now we have reduced that to under <span class=\"money-value\" data-currency-amount=\"50\"></span>.”",
      "“The automatic quantity recommendations are worth their weight in gold. I save at least <span class=\"money-value\" data-currency-amount=\"300\"></span> at every wedding.”",
      "“Finally, an app a chef actually understands. I entered everything in two minutes and immediately saw what went wrong.”"
    ],
    pricing: {
      eyebrow: "Pricing",
      title: "Cheftrack costs less than inaccurate planning destroys each month",
      text: "Choose the plan that fits your business and turn ongoing losses into controlled savings.",
      billing: ["Monthly", "Yearly", "2 months free"],
      picker: [
            ["BASIC", "For an easy day-to-day start"],
            ["PRO", "For businesses that want to actively reduce losses"],
            ["ENTERPRISE", "For multiple locations or specific requirements"]
      ],
      popularBadge: "Most popular",
      planHighlight: "Pays off from the very first month",
      tags: ["For starters", "For growing businesses", "For chains & hotels"],
      bullets: {
        basic: [
          "Up to 10 events per month",
          "A fast start with less food waste",
          "Better planning for recurring events",
          "Clear cost visibility in your currency",
          "Mobile use directly in day-to-day operations",
          "No PDF reports",
          "No annual overview"
        ],
        pro: [
          "Unlimited opportunities to optimize costs",
          "More precise planning for buffets, events, and purchasing",
          "Less food waste through clear quantity recommendations",
          "Currency analysis and annual overview at a glance",
          "Reports for post-calculation and cost control",
          "Ideal for businesses that want to actively protect margin",
          "Priority support"
        ],
        enterprise: [
          "Everything in Pro for complex operating structures",
          "Multiple locations in one view",
          "Consistent processes for teams and kitchens",
          "Custom integration into your workflows",
          "Personal onboarding call",
          "Dedicated support"
        ]
      },
      roi: "With just 1 to 2 optimized events per month, Cheftrack can already pay for itself.",
      footnote: "✓ 14-day free trial   ✓ Credit card payment available   ✓ Cancel anytime before renewal",
      ctas: {
        basic: "Try for free",
        pro: "Reduce costs now",
        enterprise: "Reduce food waste now"
      }
    },
    stats: {
      eyebrow: "Market & trust",
      title: "Food waste costs more than it seems at first glance.",
      text: "Clear numbers show why more accurate planning in hospitality becomes economically relevant right away.",
      values: ["2M tons", "20%", "14%", "2 min."],
      cards: [
        "of food are wasted in hospitality in Germany every year",
        "of goods purchased are discarded on average in the hospitality sector",
        "of food waste in Switzerland comes from hospitality",
        "average time to understand and use Cheftrack"
      ],
      sources: "Sources:"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      qa: [
        ["Do I need technical knowledge to use Cheftrack?", "Usually not. Cheftrack is designed so you can get oriented in just a few minutes and start entering events right away. If you can use a smartphone, you will usually feel comfortable immediately."],
        ["Does Cheftrack work on my phone?", "Yes. Cheftrack runs as a web app directly in the browser on iPhone and Android. In most cases, no download is needed and you can get started immediately."],
        ["What types of businesses is Cheftrack built for?", "Cheftrack works well for restaurants, hotels, catering, buffets, and other businesses with recurring food planning. It is especially useful where quantities are often estimated under time pressure."],
        ["How quickly can I get started?", "Usually within a few minutes. You create your first event, enter leftovers after the service, and immediately see where optimization potential exists."],
        ["Is Cheftrack worth it for my business?", "In most cases, yes, often through very small adjustments. Just 1 kg of food waste avoided per month is worth around <span class=\"money-value\" data-currency-amount=\"24\"></span>. That is often just leftover cold cuts or a few buffet leftovers after service. Cheftrack helps you make these losses visible and reduce them in a targeted way, which means it often pays for itself in the first month."],
        ["What happens to my data?", "Your data is treated confidentially and is not shared with third parties. Cheftrack relies on secure processing and only shows the information you need to make better decisions in your business."],
        ["Can I cancel at any time?", "Yes. You stay flexible and can cancel at any time. There are no hidden costs, so you can test Cheftrack in your day-to-day business with very little risk."]
      ],
      cta: "Try for free"
    },
    about: {
      eyebrow: "About us",
      title: "Cheftrack was not created behind a desk, but in real operations.",
      desktop: [
        "Over the years, we kept seeing the same problem across different hospitality businesses: food gets purchased, prepared, and still too much is left over in the end. Not because people are careless, but because in a hectic day-to-day operation there is often no time to analyze actual demand accurately.",
        "At the same time, we know how tight margins are in hospitality. <span class=\"about-highlight\">Every unnecessary loss costs real money</span>, and that is exactly where Cheftrack comes in.",
        "The idea came from the desire to give kitchens a simple way to understand their processes better and optimize them more precisely.",
        "Cheftrack helps answer exactly these questions in a clear and simple way without complicated systems. You gain a better understanding of actual consumption, buy more precisely, and improve your calculations step by step.",
        "The result: <span class=\"about-highlight\">less food waste, more control over your costs, and a noticeably more efficient kitchen.</span>",
        "Cheftrack is a hands-on solution for businesses that think economically, take responsibility, and want to optimize their kitchen sustainably. It is for everyone who no longer wants to purchase blindly, but wants to make informed decisions.",
        "Those who know their numbers reduce losses, increase efficiency, and protect the long-term economic success of their business. Cheftrack helps you take exactly that next step."
      ],
      questions: [
        "How much is really needed?",
        "How can buffets or guest numbers be calculated more accurately?",
        "And how can purchasing be managed so that less is wasted?"
      ],
      mobile: [
        "Cheftrack was not created behind a desk, but in real operations.",
        "Across different hospitality businesses, we kept seeing the same problem: too much food waste, inaccurate calculations, and unnecessary costs in daily operations.",
        "Especially in hospitality, where margins are often tight, every avoidable loss makes a difference.",
        "That is exactly why Cheftrack was created: to help kitchens understand their actual consumption better, buy more precisely, and plan operations more economically.",
        "That means less waste, more control over costs, and a more efficient kitchen.",
        "Cheftrack is a practical solution for businesses that no longer want to operate blindly, but want to make informed decisions and improve their kitchen sustainably."
      ],
      cta: "Try for free"
    },
    finalCta: {
      eyebrow: "Ready",
      title: "Less food waste. More control. More profit.",
      copy: "Keep your costs under control and see immediately where your business is losing money, simply, quickly, and without complicated systems.",
      trust: ["14-day free trial", "Pay conveniently by credit card", "Cancel any time before renewal"],
      button: "Start for free",
      consent: 'I accept the <a href="/agb/">Terms</a> and <a href="/datenschutz/">Privacy Policy</a>',
      microcopy: "No charge during the trial period. You can cancel any time before the trial ends.",
      proof: "Built from real hands-on hospitality experience"
    },
    footer: {
      tagline: "Track your kitchen. Save real money.",
      headings: ["Navigation", "Legal", "Contact"],
      nav: ["Home", "Benefits", "Pricing", "FAQ", "Demo"],
      legal: ["Privacy", "Terms", "Imprint", "Contact"],
      contact: ["Zurich, Switzerland", "For restaurants, hotels, catering, and events across the DACH region."],
      bottom: "© 2026 Cheftrack. All rights reserved."
    },
        pricingSummary: {
          basic: {
            monthly: {
              title: "BASIC is currently selected. Ideal for smaller businesses that want to make food waste visible quickly and reduce initial costs.",
              note: "per month, cancel monthly."
        },
        yearly: {
          title: "BASIC yearly is currently selected. A sensible starting point for businesses that want more control over planning long term.",
          note: "2 months free"
        }
      },
      pro: {
        monthly: {
          title: "PRO is currently selected. The best choice for businesses that want to reduce losses continuously and actively protect margin.",
          note: "per month and often pays off after the first optimized events."
        },
        yearly: {
          title: "PRO yearly is currently selected. The strongest choice for maximum savings, planning confidence, and long-term cost control.",
          note: "Secure 2 months free"
        }
      },
      enterprise: {
        monthly: {
          title: "ENTERPRISE is currently selected. For businesses that want to manage multiple locations consistently and economically.",
          note: "Price on request with personal consultation."
        },
        yearly: {
          title: "ENTERPRISE is currently selected. For complex requirements with custom yearly agreements and long-term process security.",
          note: "Pricing and contract terms are tailored to your business."
        }
      }
    }
  }
};

function t() {
  return translations[currentLanguage];
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function detectCurrency() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "CHF" || stored === "EUR") return stored;

  const languages = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const language of languages) {
    const match = language.match(/[-_](CH|DE|AT)\b/i);
    if (match) return match[1].toUpperCase() === "CH" ? "CHF" : "EUR";
    try {
      const region = new Intl.Locale(language).region;
      if (region === "CH") return "CHF";
      if (region === "DE" || region === "AT") return "EUR";
    } catch {
      // Ignore locale parsing issues.
    }
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (timezone === "Europe/Zurich") return "CHF";
  return "EUR";
}

function detectLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "de" || stored === "en") return stored;
  const language = (navigator.language || "de").toLowerCase();
  return language.startsWith("de") ? "de" : "en";
}

function convertFromChf(amount) {
  return currentCurrency === "EUR" ? amount * CHF_TO_EUR : amount;
}

function formatMoney(amount, decimals = 0) {
  const locale = currentCurrency === "CHF" ? "de-CH" : "de-DE";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currentCurrency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(convertFromChf(amount));
}

function renderMoneyValues() {
  document.querySelectorAll(".money-value[data-currency-amount]").forEach((element) => {
    const amount = Number(element.dataset.currencyAmount);
    const decimals = Number(element.dataset.currencyDecimals || 0);
    const prefix = element.dataset.moneyPrefix || "";
    const suffix = element.dataset.moneySuffix || "";
    element.textContent = `${prefix}${formatMoney(amount, decimals)}${suffix}`;
  });
}

function updateLanguageSwitch() {
  languageOptions.forEach((option) => {
    const isActive = option.dataset.language === currentLanguage;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });
}

function updateCurrencySwitch() {
  currencyOptions.forEach((option) => {
    const isActive = option.dataset.currency === currentCurrency;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });
}

function updateTopbar() {
  topbar.classList.toggle("scrolled", window.scrollY > 24);
}

function applyTranslations() {
  const copy = t();
  document.documentElement.lang = currentLanguage === "de" ? "de-CH" : "en";

  document.querySelector(".brand")?.setAttribute("aria-label", copy.labels.brandAria);
  navToggle?.setAttribute("aria-label", copy.labels.navToggle);
  navLinks?.setAttribute("aria-label", copy.labels.navAria);
  document.querySelector(".language-switch")?.setAttribute("aria-label", copy.labels.languageAria);
  document.querySelector(".currency-switch")?.setAttribute("aria-label", copy.labels.currencyAria);

  queryAll("#navLinks a").forEach((item, index) => {
    item.textContent = copy.nav[index];
  });
  const navCta = document.querySelector(".nav-cta");
  if (navCta) navCta.textContent = copy.navCta;

  const heroEyebrow = document.querySelector(".hero-copy .eyebrow");
  if (heroEyebrow) heroEyebrow.textContent = copy.heroEyebrow;
  const heroTitle = document.querySelector(".hero-copy h1");
  if (heroTitle) heroTitle.innerHTML = copy.heroTitle;
  const heroText = document.querySelector(".hero-copy > p");
  if (heroText) heroText.textContent = copy.heroText;
  queryAll(".hero-actions a").forEach((item, index) => {
    item.textContent = copy.heroActions[index];
  });
  const socialProof = document.querySelector(".social-proof span:last-child");
  if (socialProof) socialProof.textContent = copy.socialProof;

  const previewTitle = document.querySelector(".preview-title");
  if (previewTitle) previewTitle.textContent = copy.previewTitle;
  queryAll(".hero-metrics .metric-card span").forEach((item, index) => {
    item.textContent = copy.metricLabels[index];
  });
  const bestEvent = document.querySelector(".metric-card.compact strong");
  if (bestEvent) bestEvent.innerHTML = copy.bestEvent;
  const eventButtonLabel = document.querySelector(".event-button span:last-child");
  if (eventButtonLabel) eventButtonLabel.textContent = copy.eventButton;
  const eventButton = document.querySelector(".event-button");
  if (eventButton) eventButton.setAttribute("aria-label", copy.eventButton);
  const eventListTitle = document.querySelector(".event-list-title");
  if (eventListTitle) eventListTitle.textContent = copy.eventListTitle;
  queryAll(".event-row").forEach((row, index) => {
    const data = copy.eventRows[index];
    if (!data) return;
    const title = row.querySelector("strong");
    const meta = row.querySelector(".event-meta");
    const status = row.querySelector(".event-status");
    if (title) title.textContent = data.title;
    if (meta) meta.textContent = data.meta;
    if (status) status.textContent = data.status;
  });
  queryAll(".bar-list .bar span").forEach((item, index) => {
    item.textContent = copy.barLabels[index];
  });
  const reportBadge = document.querySelector(".report-badge");
  if (reportBadge) reportBadge.textContent = copy.reportBadge;
  queryAll(".report-item span").forEach((item, index) => {
    item.textContent = copy.reportItems[index];
  });
  const reportTarget = queryAll(".report-item strong")[3];
  if (reportTarget) reportTarget.textContent = copy.reportTarget;
  queryAll(".bottom-nav-item").forEach((item, index) => {
    item.textContent = copy.bottomNav[index];
  });
  const heroCaption = document.querySelector(".hero-caption");
  if (heroCaption) heroCaption.textContent = copy.heroCaption;

  const sectionHeadings = queryAll(".section-heading");
  sectionHeadings[0].querySelector(".eyebrow").textContent = copy.problem.eyebrow;
  sectionHeadings[0].querySelector("h2").textContent = copy.problem.title;
  queryAll(".pain-card").forEach((card, index) => {
    card.querySelector("strong").innerHTML = copy.problem.cards[index].title;
    card.querySelector("p").textContent = copy.problem.cards[index].text;
  });
  const painStat = document.querySelector(".pain-stat");
  if (painStat) painStat.textContent = copy.problem.stat;

  sectionHeadings[1].querySelector(".eyebrow").textContent = copy.solution.eyebrow;
  sectionHeadings[1].querySelector("h2").textContent = copy.solution.title;
  sectionHeadings[1].querySelector("p").textContent = copy.solution.text;
  queryAll(".step-card").forEach((card, index) => {
    card.querySelector("strong").textContent = copy.solution.steps[index].title;
    card.querySelector("p").textContent = copy.solution.steps[index].text;
  });

  const wowEyebrow = document.querySelector(".wow-panel .eyebrow");
  if (wowEyebrow) wowEyebrow.textContent = copy.wow.eyebrow;
  const wowTitle = document.querySelector(".wow-panel h3");
  if (wowTitle) wowTitle.textContent = copy.wow.title;
  const wowText = document.querySelector(".wow-panel h3 + p");
  if (wowText) wowText.textContent = copy.wow.text;
  const wowKicker = document.querySelector(".wow-kicker");
  if (wowKicker) wowKicker.textContent = copy.wow.kicker;
  const wowSubtitle = document.querySelector(".wow-subtitle");
  if (wowSubtitle) wowSubtitle.textContent = copy.wow.subtitle;
  const wowNote = document.querySelector(".wow-note");
  if (wowNote) wowNote.textContent = copy.wow.note;
  const wowAnnualLabel = document.querySelector(".wow-annual-label");
  if (wowAnnualLabel) wowAnnualLabel.textContent = copy.wow.annualLabel;

  sectionHeadings[2].querySelector(".eyebrow").textContent = copy.features.eyebrow;
  sectionHeadings[2].querySelector("h2").textContent = copy.features.title;
  sectionHeadings[2].querySelector("p").textContent = copy.features.text;
  queryAll(".feature-card").forEach((card, index) => {
    card.querySelector("strong").textContent = copy.features.cards[index][0];
    card.querySelector("p").textContent = copy.features.cards[index][1];
  });

  sectionHeadings[3].querySelector(".eyebrow").textContent = copy.retention.eyebrow;
  sectionHeadings[3].querySelector("h2").textContent = copy.retention.title;
  sectionHeadings[3].querySelector("p").textContent = copy.retention.text;
  const retentionIntro = document.querySelector(".retention-intro");
  if (retentionIntro) {
    retentionIntro.querySelector("h3").textContent = copy.retention.introTitle;
    retentionIntro.querySelector("p").textContent = copy.retention.introText;
    retentionIntro.querySelector(".retention-statement").textContent = copy.retention.statement;
  }
  queryAll(".retention-card").forEach((card, index) => {
    card.querySelector("strong").textContent = copy.retention.cards[index][0];
    card.querySelector("p").textContent = copy.retention.cards[index][1];
  });

  sectionHeadings[4].querySelector(".eyebrow").textContent = copy.roi.eyebrow;
  sectionHeadings[4].querySelector("h2").textContent = copy.roi.title;
  sectionHeadings[4].querySelector("p").textContent = copy.roi.text;
  document.querySelector(".result-box .small").textContent = copy.roi.resultTitle;
  queryAll(".testimonial p").forEach((item, index) => {
    item.innerHTML = copy.testimonials[index];
  });
  queryAll(".testimonial .author").forEach((item, index) => {
    if (copy.testimonialAuthors) item.textContent = copy.testimonialAuthors[index];
  });

  sectionHeadings[5].querySelector(".eyebrow").textContent = copy.pricing.eyebrow;
  sectionHeadings[5].querySelector("h2").textContent = copy.pricing.title;
  sectionHeadings[5].querySelector("p").textContent = copy.pricing.text;
  billingOptions[0].childNodes[0].textContent = copy.pricing.billing[0];
  billingOptions[1].childNodes[0].textContent = copy.pricing.billing[1];
  const billingBadge = document.querySelector(".billing-badge");
  if (billingBadge) billingBadge.textContent = copy.pricing.billing[2];
  queryAll(".plan-option").forEach((item, index) => {
    item.querySelector("strong").textContent = copy.pricing.picker[index][0];
    item.querySelector("span").textContent = copy.pricing.picker[index][1];
  });
  const popularBadge = document.querySelector(".popular-badge");
  if (popularBadge) popularBadge.textContent = copy.pricing.popularBadge;
  const planHighlight = document.querySelector(".plan-highlight");
  if (planHighlight) planHighlight.textContent = copy.pricing.planHighlight;
  queryAll(".plan-tag").forEach((item, index) => {
    item.textContent = copy.pricing.tags[index];
  });
  queryAll(".pricing-card").forEach((card, cardIndex) => {
    const key = cardIndex === 0 ? "basic" : cardIndex === 1 ? "pro" : "enterprise";
    const priceBlock = card.querySelector(".price");
    if (key === "enterprise" && priceBlock) {
      priceBlock.textContent = currentLanguage === "de" ? "Auf Anfrage" : "Price on request";
    }
    Array.from(card.querySelectorAll("li")).forEach((li, index) => {
      const label = copy.pricing.bullets[key][index];
      const nodes = li.childNodes;
      if (nodes[1]) nodes[1].textContent = ` ${label}`;
    });
  });
  const pricingRoi = document.querySelector(".pricing-roi");
  if (pricingRoi) pricingRoi.textContent = copy.pricing.roi;
  const pricingFootnote = document.querySelector(".pricing-footnote");
  if (pricingFootnote) pricingFootnote.textContent = copy.pricing.footnote;
  queryAll(".plan-cta").forEach((item, index) => {
    const text = index === 0 ? copy.pricing.ctas.basic : index === 1 ? copy.pricing.ctas.pro : copy.pricing.ctas.enterprise;
    item.textContent = text;
    item.setAttribute("data-cta-monthly", text);
    item.setAttribute("data-cta-yearly", text);
  });

  sectionHeadings[6].querySelector(".eyebrow").textContent = copy.stats.eyebrow;
  sectionHeadings[6].querySelector("h2").textContent = copy.stats.title;
  sectionHeadings[6].querySelector("p").textContent = copy.stats.text;
  queryAll(".stat-card p").forEach((item, index) => {
    item.textContent = copy.stats.cards[index];
  });
  queryAll(".stat-card strong").forEach((item, index) => {
    item.textContent = copy.stats.values[index];
  });
  const sources = document.querySelector(".stats-sources");
  if (sources && sources.childNodes[0]) {
    sources.childNodes[0].textContent = `${copy.stats.sources} `;
  }

  sectionHeadings[7].querySelector(".eyebrow").textContent = copy.faq.eyebrow;
  sectionHeadings[7].querySelector("h2").textContent = copy.faq.title;
  queryAll(".faq-item").forEach((item, index) => {
    item.querySelector(".faq-question span").textContent = copy.faq.qa[index][0];
    item.querySelector(".faq-answer p").innerHTML = copy.faq.qa[index][1];
  });
  const faqCta = document.querySelector(".faq-cta a");
  if (faqCta) faqCta.textContent = copy.faq.cta;

  sectionHeadings[8].querySelector(".eyebrow").textContent = copy.about.eyebrow;
  sectionHeadings[8].querySelector("h2").textContent = copy.about.title;
  queryAll(".about-desktop > p").forEach((item, index) => {
    item.innerHTML = copy.about.desktop[index];
  });
  queryAll(".about-questions p").forEach((item, index) => {
    item.textContent = copy.about.questions[index];
  });
  queryAll(".about-mobile p").forEach((item, index) => {
    item.textContent = copy.about.mobile[index];
  });
  const aboutCta = document.querySelector(".about-cta a");
  if (aboutCta) aboutCta.textContent = copy.about.cta;

  const finalSection = document.querySelector("#final-cta");
  if (finalSection) {
    finalSection.querySelector(".eyebrow").textContent = copy.finalCta.eyebrow;
    finalSection.querySelector("h2").textContent = copy.finalCta.title;
    finalSection.querySelector(".final-cta-copy").textContent = copy.finalCta.copy;
    queryAll(".final-cta-trust span").forEach((item, index) => {
      item.textContent = copy.finalCta.trust[index];
    });
    finalSection.querySelector(".btn-primary").textContent = copy.finalCta.button;
    finalSection.querySelector(".final-cta-consent span").innerHTML = copy.finalCta.consent;
    finalSection.querySelector(".final-cta-microcopy").textContent = copy.finalCta.microcopy;
    finalSection.querySelector(".final-cta-proof").textContent = copy.finalCta.proof;
  }

  const footer = document.querySelector(".footer");
  if (footer) {
    footer.querySelector("p").textContent = copy.footer.tagline;
    queryAll(".footer h3").forEach((item, index) => {
      item.textContent = copy.footer.headings[index];
    });
    queryAll(".footer-grid > div:nth-child(2) .footer-links a").forEach((item, index) => {
      item.textContent = copy.footer.nav[index];
    });
    queryAll(".footer-grid > div:nth-child(3) .footer-links a").forEach((item, index) => {
      item.textContent = copy.footer.legal[index];
    });
    queryAll(".footer-grid > div:nth-child(4) .footer-links p").forEach((item, index) => {
      item.textContent = copy.footer.contact[index];
    });
    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) footerBottom.textContent = copy.footer.bottom;
  }

  renderMoneyValues();
}

function updateCalculator() {
  const copy = t();
  const events = Number(eventsRange.value);
  const guests = Number(guestsRange.value);
  const reductionPercent = Number(reductionRange.value);
  const monthlyWasteKg = events * guests * AVG_FOOD_WASTE_KG_PER_GUEST;
  const monthlyWasteCostChf = monthlyWasteKg * FOOD_WASTE_COST_PER_KG_CHF;
  const annualAvoidedWasteKg = Math.round(monthlyWasteKg * (reductionPercent / 100) * 12);
  const annualSavingsChf = Math.round(monthlyWasteCostChf * (reductionPercent / 100) * 12);
  const monthlyPlanPriceChf = currentPlan === "basic" ? 19 : currentPlan === "pro" ? 49 : 0;
  const annualCostChf = currentPlan === "enterprise"
    ? 0
    : currentBilling === "yearly"
      ? currentPlan === "basic" ? 190 : 490
      : monthlyPlanPriceChf * 12;
  const roi = currentPlan === "enterprise" || annualCostChf === 0 ? null : (annualSavingsChf / annualCostChf).toFixed(1);

  eventsValue.textContent = String(events);
  guestsValue.textContent = String(guests);
  reductionValue.textContent = `${reductionPercent}%`;

  const sliderLabels = queryAll(".slider-group label");
  sliderLabels[0].innerHTML = `${copy.roi.labels[0]} <span id="eventsValue">${events}</span>`;
  sliderLabels[1].innerHTML = `${copy.roi.labels[1]} <span id="guestsValue">${guests}</span>`;
  sliderLabels[2].innerHTML = `${copy.roi.labels[2]} <span id="reductionValue">${reductionPercent}%</span>`;

  savingsValue.textContent = currentLanguage === "de"
    ? `Bis zu ${formatMoney(annualSavingsChf)} pro Jahr`
    : `Up to ${formatMoney(annualSavingsChf)} per year`;
  savingsContext.textContent = currentLanguage === "de"
    ? `Bei bis zu ${reductionPercent}% weniger Food Waste`
    : `With up to ${reductionPercent}% less food waste`;
  calculatorCompareValue.textContent = currentLanguage === "de"
    ? `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`
    : `That equals around ${annualAvoidedWasteKg} kg of food waste avoided per year.`;
  const calculatorNote = document.querySelector(".calculator-note");
  if (calculatorNote) {
    calculatorNote.textContent = currentLanguage === "de"
      ? "Basierend auf durchschnittlichen Branchenwerten und Ihren Eingaben."
      : "Based on industry averages and your inputs.";
  }
  wowSavingsValue.textContent = formatMoney(annualSavingsChf);
  wowCompareValue.textContent = currentLanguage === "de"
    ? `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`
    : `That equals around ${annualAvoidedWasteKg} kg of food waste avoided per year.`;
  wowAnnualValue.textContent = `+ ${formatMoney(annualSavingsChf)}`;
  wowAnnualNote.textContent = currentLanguage === "de"
    ? `Bei bis zu ${reductionPercent}% weniger Food Waste`
    : `With up to ${reductionPercent}% less food waste`;
  wowEventsBadge.textContent = currentLanguage === "de" ? `${events} Events / Monat` : `${events} events / month`;
  wowGuestsBadge.textContent = currentLanguage === "de" ? `${guests} Gäste / Event` : `${guests} guests / event`;
  wowReductionBadge.textContent = currentLanguage === "de"
    ? `${reductionPercent}% weniger Food Waste`
    : `${reductionPercent}% less food waste`;
  roiValue.textContent = currentPlan === "enterprise"
    ? currentLanguage === "de"
      ? "Preis auf Anfrage. Wir zeigen Ihnen den ROI gerne im persönlichen Gespräch."
      : "Price on request. We will gladly walk you through the ROI in a personal conversation."
    : currentLanguage === "de"
      ? `Basierend auf durchschnittlichen Branchenwerten liegt Ihr Potenzial bei rund ${roi}x des gewählten Cheftrack-Plans.`
      : `Based on industry averages, your potential comes to around ${roi}x the value of the selected Cheftrack plan.`;
  savingsCta.textContent = currentLanguage === "de" ? "Potenzial kostenlos berechnen →" : "Calculate your potential →";
}

function updatePrices() {
  const copy = t();

  priceElements.forEach((element) => {
    const monthlyChf = Number(element.dataset.priceMonthlyChf);
    const yearlyChf = Number(element.dataset.priceYearlyChf);
    if (currentBilling === "yearly") {
      element.innerHTML = `${formatMoney(yearlyChf)}<span style="font-size: 1rem; color: var(--muted);">${currentLanguage === "de" ? "/Jahr" : "/year"}</span>`;
    } else {
      element.innerHTML = `${formatMoney(monthlyChf)}<span style="font-size: 1rem; color: var(--muted);">${currentLanguage === "de" ? "/Monat" : "/month"}</span>`;
    }
  });

  priceNotes.forEach((note) => {
    const card = note.closest(".pricing-card");
    if (!card) return;

    if (card.dataset.plan === "basic") {
      note.textContent = currentBilling === "yearly"
        ? currentLanguage === "de"
          ? `2 Monate geschenkt beim Jahresplan, insgesamt ${formatMoney(190)} pro Jahr`
          : `2 months free on the yearly plan, ${formatMoney(190)} per year total`
        : currentLanguage === "de"
          ? "Monatlich kündbar"
          : "Cancel monthly";
    } else if (card.dataset.plan === "pro") {
      note.textContent = currentBilling === "yearly"
        ? currentLanguage === "de"
          ? `2 Monate kostenlos sichern, insgesamt ${formatMoney(490)} pro Jahr`
          : `Secure 2 months free, ${formatMoney(490)} per year total`
        : currentLanguage === "de"
          ? "Monatlich kündbar"
          : "Cancel monthly";
    } else {
      note.textContent = currentLanguage === "de" ? "Preis auf Anfrage" : "Price on request";
    }
  });

  planCtas.forEach((cta, index) => {
    const text = index === 0 ? copy.pricing.ctas.basic : index === 1 ? copy.pricing.ctas.pro : copy.pricing.ctas.enterprise;
    cta.textContent = text;
  });
}

function updatePricingSummary() {
  const content = t().pricingSummary;
  const selected = content[currentPlan][currentBilling];
  let note = selected.note;

  if (currentPlan === "basic" && currentBilling === "monthly") {
    note = `${formatMoney(19)} ${selected.note}`;
  } else if (currentPlan === "pro" && currentBilling === "monthly") {
    note = `${formatMoney(49)} ${selected.note}`;
  } else if (currentPlan === "basic" && currentBilling === "yearly") {
    note = currentLanguage === "de"
      ? `${selected.note}, insgesamt ${formatMoney(190)} pro Jahr.`
      : `${selected.note}, ${formatMoney(190)} per year total.`;
  } else if (currentPlan === "pro" && currentBilling === "yearly") {
    note = currentLanguage === "de"
      ? `${selected.note}, insgesamt ${formatMoney(490)} pro Jahr.`
      : `${selected.note}, ${formatMoney(490)} per year total.`;
  }

  pricingSummary.innerHTML = `${selected.title}<small>${note}</small>`;
}

function selectPlan(plan) {
  currentPlan = plan;
  planOptions.forEach((option) => {
    const isActive = option.dataset.planTarget === plan;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  pricingCards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.plan === plan);
  });

  updateCalculator();
  updatePricingSummary();
}

function selectBilling(billing) {
  currentBilling = billing;
  billingOptions.forEach((option) => {
    const isActive = option.dataset.billing === billing;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  updatePrices();
  planCtas.forEach((cta) => {
    cta.textContent = billing === "yearly" ? cta.dataset.ctaYearly : cta.dataset.ctaMonthly;
  });
  updatePricingSummary();
  updateCalculator();
}

function selectCurrency(currency) {
  currentCurrency = currency;
  localStorage.setItem(STORAGE_KEY, currency);
  updateCurrencySwitch();
  renderMoneyValues();
  updatePrices();
  updatePricingSummary();
  updateCalculator();
}

function selectLanguage(language) {
  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  updateLanguageSwitch();
  applyTranslations();
  updatePrices();
  updatePricingSummary();
  updateCalculator();
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      faq.querySelector(".faq-answer").style.maxHeight = "0px";
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

planOptions.forEach((option) => {
  option.addEventListener("click", () => selectPlan(option.dataset.planTarget));
});

billingOptions.forEach((option) => {
  option.addEventListener("click", () => selectBilling(option.dataset.billing));
});

currencyOptions.forEach((option) => {
  option.addEventListener("click", () => selectCurrency(option.dataset.currency));
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => selectLanguage(option.dataset.language));
});

pricingCards.forEach((card) => {
  card.addEventListener("click", () => selectPlan(card.dataset.plan));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectPlan(card.dataset.plan);
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener("scroll", updateTopbar);
eventsRange.addEventListener("input", updateCalculator);
guestsRange.addEventListener("input", updateCalculator);
reductionRange.addEventListener("input", updateCalculator);

updateTopbar();
updateLanguageSwitch();
updateCurrencySwitch();
applyTranslations();
renderMoneyValues();
selectPlan("pro");
selectBilling("monthly");
updateCalculator();
