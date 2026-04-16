"use client";

import { useEffect, useRef } from "react";

type LandingPageProps = {
  html: string;
};

export function LandingPage({ html }: LandingPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const topbar = root.querySelector<HTMLElement>("#topbar");
    const navToggle = root.querySelector<HTMLButtonElement>("#navToggle");
    const navLinks = root.querySelector<HTMLElement>("#navLinks");
    const eventsRange = root.querySelector<HTMLInputElement>("#eventsRange");
    const guestsRange = root.querySelector<HTMLInputElement>("#guestsRange");
    const reductionRange = root.querySelector<HTMLInputElement>("#reductionRange");
    const eventsValue = root.querySelector<HTMLElement>("#eventsValue");
    const guestsValue = root.querySelector<HTMLElement>("#guestsValue");
    const reductionValue = root.querySelector<HTMLElement>("#reductionValue");
    const savingsValue = root.querySelector<HTMLElement>("#savingsValue");
    const savingsContext = root.querySelector<HTMLElement>("#savingsContext");
    const roiValue = root.querySelector<HTMLElement>("#roiValue");
    const savingsCta = root.querySelector<HTMLElement>("#savingsCta");
    const pricingSummary = root.querySelector<HTMLElement>("#pricingSummary");
    const wowSavingsValue = root.querySelector<HTMLElement>("#wowSavingsValue");
    const wowCompareValue = root.querySelector<HTMLElement>("#wowCompareValue");
    const wowAnnualValue = root.querySelector<HTMLElement>("#wowAnnualValue");
    const wowAnnualNote = root.querySelector<HTMLElement>("#wowAnnualNote");
    const wowEventsBadge = root.querySelector<HTMLElement>("#wowEventsBadge");
    const wowGuestsBadge = root.querySelector<HTMLElement>("#wowGuestsBadge");
    const wowReductionBadge = root.querySelector<HTMLElement>("#wowReductionBadge");
    const calculatorCompareValue = root.querySelector<HTMLElement>("#calculatorCompareValue");
    const languageSwitch = root.querySelector<HTMLElement>(".language-switch");

    if (
      !topbar ||
      !navToggle ||
      !navLinks ||
      !eventsRange ||
      !guestsRange ||
      !reductionRange ||
      !eventsValue ||
      !guestsValue ||
      !reductionValue ||
      !savingsValue ||
      !savingsContext ||
      !roiValue ||
      !savingsCta ||
      !pricingSummary ||
      !wowSavingsValue ||
      !wowCompareValue ||
      !wowAnnualValue ||
      !wowAnnualNote ||
      !wowEventsBadge ||
      !wowGuestsBadge ||
      !wowReductionBadge ||
      !calculatorCompareValue
    ) {
      return;
    }

    const billingOptions = root.querySelectorAll<HTMLElement>(".billing-option");
    const languageOptions = root.querySelectorAll<HTMLElement>(".language-option");
    const currencyOptions = root.querySelectorAll<HTMLElement>(".currency-option");
    const planOptions = root.querySelectorAll<HTMLElement>(".plan-option");
    const pricingCards = root.querySelectorAll<HTMLElement>(".pricing-card[data-plan]");
    const priceElements = root.querySelectorAll<HTMLElement>(".price[data-price-monthly-chf]");
    const priceNotes = root.querySelectorAll<HTMLElement>(".price-note");
    const planCtas = root.querySelectorAll<HTMLElement>(".plan-cta");
    const faqItems = root.querySelectorAll<HTMLElement>(".faq-item");
    const revealItems = root.querySelectorAll<HTMLElement>(".reveal");

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
          navAria: "Hauptnavigation",
          brandAria: "Cheftrack Startseite",
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
          title: "Nicht nur einmal optimieren, sondern dauerhaft Kosten im Griff behalten",
          text: "Gastronomie ist dynamisch: Gästezahlen, Personal, Nachfrage und Abläufe verändern sich laufend. Genau deshalb braucht es kontinuierliche Kontrolle statt einmaliger Schätzungen.",
          introTitle: "Cheftrack begleitet nicht nur einzelne Events, sondern Ihre laufende Küchensteuerung.",
          introText: "Die App hilft Ihnen dabei, Entwicklungen sichtbar zu machen, Abweichungen früh zu erkennen und Ihre Planung Schritt für Schritt belastbarer zu machen.",
          statement: "Damit Ihre Kalkulation nicht nur einmal stimmt – sondern jeden Tag.",
          cards: [
            ["Verlauf & Trends", "Behalten Sie Ihre Entwicklung im Blick und erkennen Sie sofort Verbesserungen oder Rückschritte."],
            ["Warnsystem", "Erhalten Sie Hinweise, wenn Food Waste oder Kosten wieder steigen."],
            ["Event-Vergleich", "Vergleichen Sie Events und optimieren Sie Ihre Planung kontinuierlich."],
            ["Smarte Empfehlungen", "Erhalten Sie konkrete Vorschläge zur Mengenoptimierung basierend auf Ihren Daten."],
            ["Team-Nutzung", "Standardisieren Sie Abläufe und sorgen Sie für konsistente Ergebnisse, unabhängig vom Personal."]
          ]
        },
        roi: {
          eyebrow: "ROI-Rechner",
          title: "Wie viel sparen Sie mit Cheftrack?",
          text: "Bewegen Sie die Regler und sehen Sie sofort Ihre geschätzte jährliche Einsparung sowie Ihren möglichen Return on Investment.",
          labels: ["Wie viele Events pro Monat?", "Durchschnittliche Gästezahl?", "Reduktionspotenzial?"],
          resultTitle: "Potenzielle Einsparung pro Jahr:"
        },
        testimonials: [
          "„Nach dem ersten Event hat Cheftrack gezeigt, dass wir <span class=\"money-value\" data-currency-amount=\"240\"></span> verschwendet haben. Jetzt haben wir das auf unter <span class=\"money-value\" data-currency-amount=\"50\"></span> reduziert.“",
          "„Die automatischen Mengenempfehlungen sind Gold wert. Ich spare bei jeder Hochzeit mindestens <span class=\"money-value\" data-currency-amount=\"300\"></span>.“",
          "„Endlich eine App, die ein Koch wirklich versteht. In zwei Minuten eingetragen und sofort weiss ich, was ich falsch gemacht habe.“"
        ],
        pricing: {
          eyebrow: "Preise",
          title: "Cheftrack kostet weniger, als ungenaue Planung jeden Monat vernichtet",
          text: "Wählen Sie den Tarif, der zu Ihrem Betrieb passt, und machen Sie aus laufenden Verlusten eine kontrollierbare Einsparung.",
          billing: ["Monatlich", "Jährlich", "2 Monate geschenkt"],
          picker: [
            ["BASIC", "Für Einsteiger mit bis zu 10 Events"],
            ["PRO", "Für wachsende Betriebe mit vollem Funktionsumfang"],
            ["ENTERPRISE", "Für mehrere Standorte, Teams und individuelle Anforderungen"]
          ],
          popularBadge: "Beliebteste Wahl",
          planHighlight: "Rechnet sich bereits ab dem ersten Monat",
          tags: ["Für Einsteiger", "Für wachsende Betriebe", "Für Ketten & Hotels"],
          bullets: {
            basic: [
              "Bis zu 10 Events pro Monat",
              "Schneller Einstieg in weniger Food Waste",
              "Bessere Planung für wiederkehrende Events",
              "Klare Kostenübersicht in Ihrer Währung",
              "Mobile Nutzung direkt im Küchenalltag",
              "Keine PDF Reports",
              "Keine Jahresübersicht"
            ],
            pro: [
              "Unbegrenzte Möglichkeiten zur Kostenoptimierung",
              "Präzisere Planung für Buffet, Events und Einkauf",
              "Weniger Food Waste durch klare Mengenempfehlungen",
              "Währungs-Auswertung und Jahresübersicht auf einen Blick",
              "Reports für Nachkalkulation und Kostenkontrolle",
              "Ideal für Betriebe, die aktiv Marge sichern wollen",
              "Prioritäts-Support"
            ],
            enterprise: [
              "Alles aus Pro für komplexe Betriebsstrukturen",
              "Mehrere Standorte zentral im Blick",
              "Einheitliche Prozesse für Teams und Küchen",
              "Individuelle Anbindung an Ihre Abläufe",
              "Persönlicher Onboarding-Call",
              "Dedizierter Support"
            ]
          },
          roi: "Schon bei 1 bis 2 optimierten Events pro Monat hat sich Cheftrack bezahlt gemacht.",
          footnote: "✓ 14 Tage kostenlos testen   ✓ Zahlung per Kreditkarte möglich   ✓ Jederzeit vor Ablauf kündbar",
          ctas: {
            basic: "Jetzt kostenlos testen",
            pro: "Jetzt Kosten reduzieren",
            enterprise: "Jetzt Food Waste senken"
          }
        },
        stats: {
          eyebrow: "Markt & Vertrauen",
          title: "Food Waste kostet mehr, als man auf den ersten Blick sieht.",
          text: "Klare Kennzahlen zeigen, warum präzisere Planung in der Gastronomie wirtschaftlich sofort relevant ist.",
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
            ["Brauche ich technische Kenntnisse, um Cheftrack zu nutzen?", "In der Regel nicht. Cheftrack ist so aufgebaut, dass Sie sich in wenigen Minuten zurechtfinden und direkt mit der Erfassung starten können. Wenn Sie ein Smartphone nutzen, kommen Sie meist sofort klar."],
            ["Funktioniert Cheftrack auf meinem Handy?", "Ja. Cheftrack läuft als Web-App direkt im Browser auf iPhone und Android. In den meisten Fällen ist kein Download nötig und Sie können sofort loslegen."],
            ["Für welche Betriebe eignet sich Cheftrack?", "Cheftrack eignet sich für Restaurants, Hotels, Catering, Buffets und andere Betriebe mit wiederkehrender Speisenplanung. Besonders hilfreich ist es dort, wo Mengen oft unter Zeitdruck geschätzt werden."],
            ["Wie schnell kann ich starten?", "In der Regel in wenigen Minuten. Sie erfassen Ihr erstes Event, tragen nach dem Anlass die Reste ein und sehen direkt, wo Optimierungspotenzial liegt."],
            ["Lohnt sich Cheftrack für meinen Betrieb?", "In den meisten Fällen ja, oft schon durch sehr kleine Anpassungen. Bereits etwa 1 kg vermiedener Food Waste pro Monat entspricht rund <span class=\"money-value\" data-currency-amount=\"24\"></span>. Das sind häufig nur übrig gebliebener Aufschnitt oder wenige Buffet-Reste nach dem Service. Cheftrack hilft Ihnen, genau diese Verluste sichtbar zu machen und gezielt zu reduzieren und macht sich dadurch oft bereits im ersten Monat bezahlt."],
            ["Was passiert mit meinen Daten?", "Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben. Cheftrack setzt auf eine sichere Verarbeitung und zeigt nur die Informationen, die Sie für bessere Entscheidungen im Betrieb brauchen."],
            ["Kann ich jederzeit kündigen?", "Ja. Sie bleiben flexibel und können jederzeit kündigen. Es gibt keine versteckten Kosten, sodass Sie Cheftrack ohne großes Risiko im Alltag testen können."]
          ],
          cta: "Jetzt kostenlos testen"
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
          copy: "Behalten Sie Ihre Kosten im Griff und erkennen Sie sofort, wo Ihr Betrieb Geld verliert, einfach, schnell und ohne komplizierte Systeme.",
          trust: ["14 Tage kostenlos testen", "Zahlung bequem per Kreditkarte", "Jederzeit vor Ablauf kündbar"],
          button: "Jetzt kostenlos starten",
          consent: 'Ich akzeptiere <a href="/agb/">AGB</a> und <a href="/datenschutz/">Datenschutzerklärung</a>',
          microcopy: "Keine Abbuchung während der Testphase. Kündigung jederzeit vor Ablauf möglich.",
          proof: "Entstanden aus echter Praxiserfahrung in der Gastronomie"
        },
        footer: {
          tagline: "Tracke deine Küche. Spare bares Geld.",
          headings: ["Navigation", "Rechtliches", "Kontakt"],
          nav: ["Startseite", "Vorteile", "Preise", "FAQ", "Demo"],
          legal: ["Datenschutz", "AGB", "Impressum", "Kontakt"],
          contact: ["Zürich, Schweiz", "Für Restaurants, Hotels, Catering und Events im DACH-Raum."],
          bottom: "© 2026 Cheftrack. Alle Rechte vorbehalten."
        },
        pricingSummary: {
          basic: {
            monthly: {
              title: "BASIC ist aktuell ausgewählt. Ideal für kleinere Betriebe, die Food Waste schnell sichtbar machen und erste Kosten senken möchten.",
              note: "pro Monat, monatlich kündbar."
            },
            yearly: {
              title: "BASIC im Jahresmodell ist aktuell ausgewählt. Ein sinnvoller Einstieg für Betriebe, die dauerhaft kontrollierter planen möchten.",
              note: "2 Monate geschenkt"
            }
          },
          pro: {
            monthly: {
              title: "PRO ist aktuell ausgewählt. Die beste Wahl für Betriebe, die Verluste laufend reduzieren und ihre Marge aktiv absichern wollen.",
              note: "pro Monat und oft schon nach den ersten optimierten Events amortisiert."
            },
            yearly: {
              title: "PRO im Jahresmodell ist aktuell ausgewählt. Die stärkste Wahl für maximale Einsparung, Planungssicherheit und nachhaltige Kostenkontrolle.",
              note: "2 Monate kostenlos sichern"
            }
          },
          enterprise: {
            monthly: {
              title: "ENTERPRISE ist aktuell ausgewählt. Für Betriebe, die mehrere Standorte wirtschaftlich einheitlich steuern möchten.",
              note: "Preis auf Anfrage mit persönlicher Beratung."
            },
            yearly: {
              title: "ENTERPRISE ist aktuell ausgewählt. Für komplexe Anforderungen mit individueller Jahresvereinbarung und langfristiger Prozesssicherheit.",
              note: "Preis und Laufzeit werden individuell mit Ihrem Betrieb abgestimmt."
            }
          }
        }
      },
      en: {
        labels: {
          navAria: "Main navigation",
          brandAria: "Cheftrack home",
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
            ["BASIC", "For starters with up to 10 events"],
            ["PRO", "For growing businesses with the full feature set"],
            ["ENTERPRISE", "For multiple locations, teams, and custom requirements"]
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
    } as const;

    function detectCurrency() {
      const stored = window.localStorage.getItem(STORAGE_KEY);
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
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "de" || stored === "en") return stored;
      const language = navigator.language?.toLowerCase() || "de";
      return language.startsWith("de") ? "de" : "en";
    }

    function t() {
      return translations[currentLanguage as "de" | "en"];
    }

    function queryAll<T extends Element>(selector: string) {
      return root ? Array.from(root.querySelectorAll<T>(selector)) : [];
    }

    function updateLanguageSwitch() {
      languageOptions.forEach((option) => {
        const isActive = option.dataset.language === currentLanguage;
        option.classList.toggle("active", isActive);
        option.setAttribute("aria-pressed", String(isActive));
      });
    }

    function applyTranslations() {
      const copy = t();
      root.ownerDocument.documentElement.lang = currentLanguage === "de" ? "de-CH" : "en";
      root.querySelector<HTMLAnchorElement>(".brand")?.setAttribute("aria-label", copy.labels.brandAria);
      navToggle.setAttribute("aria-label", copy.labels.navToggle);
      navLinks.setAttribute("aria-label", copy.labels.navAria);
      languageSwitch?.setAttribute("aria-label", copy.labels.languageAria);
      root.querySelector<HTMLElement>(".currency-switch")?.setAttribute("aria-label", copy.labels.currencyAria);

      queryAll<HTMLAnchorElement>("#navLinks a").forEach((item, index) => {
        item.textContent = copy.nav[index];
      });
      const navCta = root.querySelector<HTMLAnchorElement>(".nav-cta");
      if (navCta) navCta.textContent = copy.navCta;

      const heroEyebrow = root.querySelector<HTMLElement>(".hero-copy .eyebrow");
      if (heroEyebrow) heroEyebrow.textContent = copy.heroEyebrow;
      const heroTitle = root.querySelector<HTMLElement>(".hero-copy h1");
      if (heroTitle) heroTitle.innerHTML = copy.heroTitle;
      const heroText = root.querySelector<HTMLElement>(".hero-copy p");
      if (heroText) heroText.textContent = copy.heroText;
      queryAll<HTMLAnchorElement>(".hero-actions a").forEach((item, index) => {
        item.textContent = copy.heroActions[index];
      });
      const socialProof = root.querySelector<HTMLElement>(".social-proof span:last-child");
      if (socialProof) socialProof.textContent = copy.socialProof;

      const previewTitle = root.querySelector<HTMLElement>(".preview-title");
      if (previewTitle) previewTitle.textContent = copy.previewTitle;
      queryAll<HTMLElement>(".hero-metrics .metric-card span").forEach((item, index) => {
        item.textContent = copy.metricLabels[index];
      });
      const bestEvent = root.querySelector<HTMLElement>(".metric-card.compact strong");
      if (bestEvent) bestEvent.innerHTML = copy.bestEvent;
      const eventButtonLabel = root.querySelector<HTMLElement>(".event-button span:last-child");
      if (eventButtonLabel) eventButtonLabel.textContent = copy.eventButton;
      const eventButton = root.querySelector<HTMLElement>(".event-button");
      if (eventButton) eventButton.setAttribute("aria-label", copy.eventButton);
      const listTitle = root.querySelector<HTMLElement>(".event-list-title");
      if (listTitle) listTitle.textContent = copy.eventListTitle;
      queryAll<HTMLElement>(".event-row").forEach((row, index) => {
        const data = copy.eventRows[index];
        row.querySelector("strong")!.textContent = data.title;
        row.querySelector<HTMLElement>(".event-meta")!.textContent = data.meta;
        row.querySelector<HTMLElement>(".event-status")!.textContent = data.status;
      });
      queryAll<HTMLElement>(".bar-list .bar span").forEach((item, index) => {
        item.textContent = copy.barLabels[index];
      });
      const reportBadge = root.querySelector<HTMLElement>(".report-badge");
      if (reportBadge) reportBadge.textContent = copy.reportBadge;
      queryAll<HTMLElement>(".report-item span").forEach((item, index) => {
        item.textContent = copy.reportItems[index];
      });
      const reportTarget = queryAll<HTMLElement>(".report-item strong")[3];
      if (reportTarget) reportTarget.textContent = copy.reportTarget;
      queryAll<HTMLElement>(".bottom-nav-item").forEach((item, index) => {
        item.textContent = copy.bottomNav[index];
      });
      const heroCaption = root.querySelector<HTMLElement>(".hero-caption");
      if (heroCaption) heroCaption.textContent = copy.heroCaption;

      const sectionHeadings = queryAll<HTMLElement>(".section-heading");
      sectionHeadings[1].querySelector(".eyebrow")!.textContent = copy.problem.eyebrow;
      sectionHeadings[1].querySelector("h2")!.textContent = copy.problem.title;
      queryAll<HTMLElement>(".pain-card").forEach((card, index) => {
        card.querySelector("strong")!.innerHTML = copy.problem.cards[index].title;
        card.querySelector("p")!.textContent = copy.problem.cards[index].text;
      });
      const painStat = root.querySelector<HTMLElement>(".pain-stat");
      if (painStat) painStat.textContent = copy.problem.stat;

      sectionHeadings[2].querySelector(".eyebrow")!.textContent = copy.solution.eyebrow;
      sectionHeadings[2].querySelector("h2")!.textContent = copy.solution.title;
      sectionHeadings[2].querySelector("p")!.textContent = copy.solution.text;
      queryAll<HTMLElement>(".step-card").forEach((card, index) => {
        card.querySelector("strong")!.textContent = copy.solution.steps[index].title;
        card.querySelector("p")!.textContent = copy.solution.steps[index].text;
      });

      const wowEyebrow = root.querySelector<HTMLElement>(".wow-panel .eyebrow");
      if (wowEyebrow) wowEyebrow.textContent = copy.wow.eyebrow;
      const wowTitle = root.querySelector<HTMLElement>(".wow-panel h3");
      if (wowTitle) wowTitle.textContent = copy.wow.title;
      const wowText = root.querySelector<HTMLElement>(".wow-panel h3 + p");
      if (wowText) wowText.textContent = copy.wow.text;
      const wowKicker = root.querySelector<HTMLElement>(".wow-kicker");
      if (wowKicker) wowKicker.textContent = copy.wow.kicker;
      const wowSubtitle = root.querySelector<HTMLElement>(".wow-subtitle");
      if (wowSubtitle) wowSubtitle.textContent = copy.wow.subtitle;
      const wowNote = root.querySelector<HTMLElement>(".wow-note");
      if (wowNote) wowNote.textContent = copy.wow.note;
      const wowAnnualLabel = root.querySelector<HTMLElement>(".wow-annual-label");
      if (wowAnnualLabel) wowAnnualLabel.textContent = copy.wow.annualLabel;

      sectionHeadings[3].querySelector(".eyebrow")!.textContent = copy.features.eyebrow;
      sectionHeadings[3].querySelector("h2")!.textContent = copy.features.title;
      sectionHeadings[3].querySelector("p")!.textContent = copy.features.text;
      queryAll<HTMLElement>(".feature-card").forEach((card, index) => {
        card.querySelector("strong")!.textContent = copy.features.cards[index][0];
        card.querySelector("p")!.textContent = copy.features.cards[index][1];
      });

      sectionHeadings[4].querySelector(".eyebrow")!.textContent = copy.retention.eyebrow;
      sectionHeadings[4].querySelector("h2")!.textContent = copy.retention.title;
      sectionHeadings[4].querySelector("p")!.textContent = copy.retention.text;
      const retentionIntro = root.querySelector<HTMLElement>(".retention-intro");
      if (retentionIntro) {
        retentionIntro.querySelector("h3")!.textContent = copy.retention.introTitle;
        retentionIntro.querySelector("p")!.textContent = copy.retention.introText;
        retentionIntro.querySelector(".retention-statement")!.textContent = copy.retention.statement;
      }
      queryAll<HTMLElement>(".retention-card").forEach((card, index) => {
        card.querySelector("strong")!.textContent = copy.retention.cards[index][0];
        card.querySelector("p")!.textContent = copy.retention.cards[index][1];
      });

      sectionHeadings[5].querySelector(".eyebrow")!.textContent = copy.roi.eyebrow;
      sectionHeadings[5].querySelector("h2")!.textContent = copy.roi.title;
      sectionHeadings[5].querySelector("p")!.textContent = copy.roi.text;
      root.querySelector(".result-box .small")!.textContent = copy.roi.resultTitle;
      queryAll<HTMLElement>(".testimonial p").forEach((item, index) => {
        item.innerHTML = copy.testimonials[index];
      });

      sectionHeadings[6].querySelector(".eyebrow")!.textContent = copy.pricing.eyebrow;
      sectionHeadings[6].querySelector("h2")!.textContent = copy.pricing.title;
      sectionHeadings[6].querySelector("p")!.textContent = copy.pricing.text;
      billingOptions[0].childNodes[0].textContent = copy.pricing.billing[0];
      billingOptions[1].childNodes[0].textContent = copy.pricing.billing[1];
      const billingBadge = root.querySelector<HTMLElement>(".billing-badge");
      if (billingBadge) billingBadge.textContent = copy.pricing.billing[2];
      queryAll<HTMLElement>(".plan-option").forEach((item, index) => {
        item.querySelector("strong")!.textContent = copy.pricing.picker[index][0];
        item.querySelector("span")!.textContent = copy.pricing.picker[index][1];
      });
      const popularBadge = root.querySelector<HTMLElement>(".popular-badge");
      if (popularBadge) popularBadge.textContent = copy.pricing.popularBadge;
      const planHighlight = root.querySelector<HTMLElement>(".plan-highlight");
      if (planHighlight) planHighlight.textContent = copy.pricing.planHighlight;
      queryAll<HTMLElement>(".plan-tag").forEach((item, index) => {
        item.textContent = copy.pricing.tags[index];
      });
      const pricingCardsList = queryAll<HTMLElement>(".pricing-card");
      pricingCardsList.forEach((card, cardIndex) => {
        const key = cardIndex === 0 ? "basic" : cardIndex === 1 ? "pro" : "enterprise";
        const listItems = Array.from(card.querySelectorAll("li"));
        listItems.forEach((li, index) => {
          const label = copy.pricing.bullets[key][index];
          const nodes = li.childNodes;
          if (nodes[1]) nodes[1].textContent = ` ${label}`;
        });
      });
      const pricingRoi = root.querySelector<HTMLElement>(".pricing-roi");
      if (pricingRoi) pricingRoi.textContent = copy.pricing.roi;
      const pricingFootnote = root.querySelector<HTMLElement>(".pricing-footnote");
      if (pricingFootnote) pricingFootnote.textContent = copy.pricing.footnote;
      queryAll<HTMLAnchorElement>(".plan-cta").forEach((item, index) => {
        const text =
          index === 0 ? copy.pricing.ctas.basic : index === 1 ? copy.pricing.ctas.pro : copy.pricing.ctas.enterprise;
        item.textContent = text;
        item.setAttribute("data-cta-monthly", text);
        item.setAttribute("data-cta-yearly", text);
      });

      sectionHeadings[7].querySelector(".eyebrow")!.textContent = copy.stats.eyebrow;
      sectionHeadings[7].querySelector("h2")!.textContent = copy.stats.title;
      sectionHeadings[7].querySelector("p")!.textContent = copy.stats.text;
      queryAll<HTMLElement>(".stat-card p").forEach((item, index) => {
        item.textContent = copy.stats.cards[index];
      });
      const sources = root.querySelector<HTMLElement>(".stats-sources");
      if (sources) {
        const firstText = sources.childNodes[0];
        if (firstText) firstText.textContent = `${copy.stats.sources} `;
      }

      sectionHeadings[8].querySelector(".eyebrow")!.textContent = copy.faq.eyebrow;
      sectionHeadings[8].querySelector("h2")!.textContent = copy.faq.title;
      queryAll<HTMLElement>(".faq-item").forEach((item, index) => {
        item.querySelector(".faq-question span")!.textContent = copy.faq.qa[index][0];
        item.querySelector<HTMLElement>(".faq-answer p")!.innerHTML = copy.faq.qa[index][1];
      });
      const faqCta = root.querySelector<HTMLElement>(".faq-cta a");
      if (faqCta) faqCta.textContent = copy.faq.cta;

      sectionHeadings[9].querySelector(".eyebrow")!.textContent = copy.about.eyebrow;
      sectionHeadings[9].querySelector("h2")!.textContent = copy.about.title;
      queryAll<HTMLElement>(".about-desktop > p").forEach((item, index) => {
        item.innerHTML = copy.about.desktop[index];
      });
      queryAll<HTMLElement>(".about-questions p").forEach((item, index) => {
        item.textContent = copy.about.questions[index];
      });
      queryAll<HTMLElement>(".about-mobile p").forEach((item, index) => {
        item.textContent = copy.about.mobile[index];
      });
      const aboutCta = root.querySelector<HTMLElement>(".about-cta a");
      if (aboutCta) aboutCta.textContent = copy.about.cta;

      const finalSection = root.querySelector<HTMLElement>("#final-cta");
      if (finalSection) {
        finalSection.querySelector(".eyebrow")!.textContent = copy.finalCta.eyebrow;
        finalSection.querySelector("h2")!.textContent = copy.finalCta.title;
        finalSection.querySelector<HTMLElement>(".final-cta-copy")!.textContent = copy.finalCta.copy;
        queryAll<HTMLElement>(".final-cta-trust span").forEach((item, index) => {
          item.textContent = copy.finalCta.trust[index];
        });
        finalSection.querySelector<HTMLAnchorElement>(".btn-primary")!.textContent = copy.finalCta.button;
        finalSection.querySelector<HTMLElement>(".final-cta-consent span")!.innerHTML = copy.finalCta.consent;
        finalSection.querySelector<HTMLElement>(".final-cta-microcopy")!.textContent = copy.finalCta.microcopy;
        finalSection.querySelector<HTMLElement>(".final-cta-proof")!.textContent = copy.finalCta.proof;
      }

      const footer = root.querySelector<HTMLElement>(".footer");
      if (footer) {
        footer.querySelector("p")!.textContent = copy.footer.tagline;
        queryAll<HTMLElement>(".footer h3").forEach((item, index) => {
          item.textContent = copy.footer.headings[index];
        });
        queryAll<HTMLElement>(".footer-grid > div:nth-child(2) .footer-links a").forEach((item, index) => {
          item.textContent = copy.footer.nav[index];
        });
        queryAll<HTMLElement>(".footer-grid > div:nth-child(3) .footer-links a").forEach((item, index) => {
          item.textContent = copy.footer.legal[index];
        });
        const contactNodes = queryAll<HTMLElement>(".footer-grid > div:nth-child(4) .footer-links p");
        contactNodes.forEach((item, index) => {
          item.textContent = copy.footer.contact[index];
        });
        const footerBottom = root.querySelector<HTMLElement>(".footer-bottom");
        if (footerBottom) footerBottom.textContent = copy.footer.bottom;
      }

      renderMoneyValues();
    }

    function convertFromChf(amount: number) {
      return currentCurrency === "EUR" ? amount * CHF_TO_EUR : amount;
    }

    function formatMoney(amount: number, decimals = 0) {
      const locale = currentCurrency === "CHF" ? "de-CH" : "de-DE";
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currentCurrency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(convertFromChf(amount));
    }

    function renderMoneyValues() {
      root.querySelectorAll<HTMLElement>(".money-value[data-currency-amount]").forEach((element) => {
        const amount = Number(element.dataset.currencyAmount);
        const decimals = Number(element.dataset.currencyDecimals || 0);
        const prefix = element.dataset.moneyPrefix || "";
        const suffix = element.dataset.moneySuffix || "";
        element.textContent = `${prefix}${formatMoney(amount, decimals)}${suffix}`;
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
      const annualCostChf =
        currentPlan === "enterprise"
          ? 0
          : currentBilling === "yearly"
            ? currentPlan === "basic"
              ? 190
              : 490
            : monthlyPlanPriceChf * 12;
      const roi =
        currentPlan === "enterprise" || annualCostChf === 0
          ? null
          : (annualSavingsChf / annualCostChf).toFixed(1);

      eventsValue.textContent = String(events);
      guestsValue.textContent = String(guests);
      reductionValue.textContent = `${reductionPercent}%`;
      const sliderLabels = queryAll<HTMLLabelElement>(".slider-group label");
      sliderLabels[0].innerHTML = `${copy.roi.labels[0]} <span id="eventsValue">${events}</span>`;
      sliderLabels[1].innerHTML = `${copy.roi.labels[1]} <span id="guestsValue">${guests}</span>`;
      sliderLabels[2].innerHTML = `${copy.roi.labels[2]} <span id="reductionValue">${reductionPercent}%</span>`;
      savingsValue.textContent =
        currentLanguage === "de"
          ? `Bis zu ${formatMoney(annualSavingsChf)} pro Jahr`
          : `Up to ${formatMoney(annualSavingsChf)} per year`;
      savingsContext.textContent =
        currentLanguage === "de"
          ? `Bei bis zu ${reductionPercent}% weniger Food Waste`
          : `With up to ${reductionPercent}% less food waste`;
      calculatorCompareValue.textContent =
        currentLanguage === "de"
          ? `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`
          : `That equals around ${annualAvoidedWasteKg} kg of food waste avoided per year.`;
      wowSavingsValue.textContent = formatMoney(annualSavingsChf);
      wowCompareValue.textContent =
        currentLanguage === "de"
          ? `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`
          : `That equals around ${annualAvoidedWasteKg} kg of food waste avoided per year.`;
      wowAnnualValue.textContent = `+ ${formatMoney(annualSavingsChf)}`;
      wowAnnualNote.textContent =
        currentLanguage === "de"
          ? `Bei bis zu ${reductionPercent}% weniger Food Waste`
          : `With up to ${reductionPercent}% less food waste`;
      wowEventsBadge.textContent =
        currentLanguage === "de" ? `${events} Events / Monat` : `${events} events / month`;
      wowGuestsBadge.textContent =
        currentLanguage === "de" ? `${guests} Gäste / Event` : `${guests} guests / event`;
      wowReductionBadge.textContent =
        currentLanguage === "de"
          ? `${reductionPercent}% weniger Food Waste`
          : `${reductionPercent}% less food waste`;
      roiValue.textContent =
        currentPlan === "enterprise"
          ? currentLanguage === "de"
            ? "Preis auf Anfrage. Wir zeigen Ihnen den ROI gerne im persönlichen Gespräch."
            : "Price on request. We will gladly walk you through the ROI in a personal conversation."
          : currentLanguage === "de"
            ? `Basierend auf durchschnittlichen Branchenwerten liegt Ihr Potenzial bei rund ${roi}x des gewählten Cheftrack-Plans.`
            : `Based on industry averages, your potential comes to around ${roi}x the value of the selected Cheftrack plan.`;
      savingsCta.textContent =
        currentLanguage === "de" ? "Potenzial kostenlos berechnen →" : "Calculate your potential →";
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
        const card = note.closest<HTMLElement>(".pricing-card");
        if (!card) return;

        if (card.dataset.plan === "basic") {
          note.textContent =
            currentBilling === "yearly"
              ? currentLanguage === "de"
                ? `2 Monate geschenkt beim Jahresplan, insgesamt ${formatMoney(190)} pro Jahr`
                : `2 months free on the yearly plan, ${formatMoney(190)} per year total`
              : currentLanguage === "de"
                ? "Monatlich kündbar"
                : "Cancel monthly";
        } else if (card.dataset.plan === "pro") {
          note.textContent =
            currentBilling === "yearly"
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
        const text =
          index === 0 ? copy.pricing.ctas.basic : index === 1 ? copy.pricing.ctas.pro : copy.pricing.ctas.enterprise;
        cta.textContent = text;
      });
    }

    function updatePricingSummary() {
      const content = t().pricingSummary;

      const selected = content[currentPlan as keyof typeof content][
        currentBilling as "monthly" | "yearly"
      ];
      let note = selected.note;
      if (currentPlan === "basic" && currentBilling === "monthly") {
        note = `${formatMoney(19)} ${selected.note}`;
      } else if (currentPlan === "pro" && currentBilling === "monthly") {
        note = `${formatMoney(49)} ${selected.note}`;
      } else if (currentPlan === "basic" && currentBilling === "yearly") {
        note =
          currentLanguage === "de"
            ? `${selected.note}, insgesamt ${formatMoney(190)} pro Jahr.`
            : `${selected.note}, ${formatMoney(190)} per year total.`;
      } else if (currentPlan === "pro" && currentBilling === "yearly") {
        note =
          currentLanguage === "de"
            ? `${selected.note}, insgesamt ${formatMoney(490)} pro Jahr.`
            : `${selected.note}, ${formatMoney(490)} per year total.`;
      }
      pricingSummary.innerHTML = `${selected.title}<small>${note}</small>`;
    }

    function selectPlan(plan: string) {
      currentPlan = plan;
      planOptions.forEach((option) => {
        const isActive = option.dataset.planTarget === plan;
        option.classList.toggle("active", isActive);
        option.setAttribute("aria-selected", String(isActive));
      });

      pricingCards.forEach((card) => {
        const isSelected = card.dataset.plan === plan;
        card.classList.toggle("selected", isSelected);
      });

      updateCalculator();
      updatePricingSummary();
    }

    function selectBilling(billing: string) {
      currentBilling = billing;
      billingOptions.forEach((option) => {
        const isActive = option.dataset.billing === billing;
        option.classList.toggle("active", isActive);
        option.setAttribute("aria-selected", String(isActive));
      });

      updatePrices();
      planCtas.forEach((cta) => {
        cta.textContent =
          billing === "yearly"
            ? cta.getAttribute("data-cta-yearly") || ""
            : cta.getAttribute("data-cta-monthly") || "";
      });

      updatePricingSummary();
      updateCalculator();
    }

    function selectCurrency(currency: string) {
      currentCurrency = currency;
      window.localStorage.setItem(STORAGE_KEY, currency);
      updateCurrencySwitch();
      renderMoneyValues();
      updatePrices();
      updatePricingSummary();
      updateCalculator();
    }

    function selectLanguage(language: string) {
      currentLanguage = language;
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      updateLanguageSwitch();
      applyTranslations();
      updatePrices();
      updatePricingSummary();
      updateCalculator();
    }

    const handleNavToggle = () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    };

    navToggle.addEventListener("click", handleNavToggle);

    const anchorLinks = root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    faqItems.forEach((item) => {
      const button = item.querySelector<HTMLButtonElement>(".faq-question");
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      if (!button || !answer) return;

      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        faqItems.forEach((faq) => {
          faq.classList.remove("open");
          faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
          const faqAnswer = faq.querySelector<HTMLElement>(".faq-answer");
          if (faqAnswer) faqAnswer.style.maxHeight = "0px";
        });

        if (!isOpen) {
          item.classList.add("open");
          button.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });

    planOptions.forEach((option) => {
      option.addEventListener("click", () => selectPlan(option.dataset.planTarget || "pro"));
    });

    billingOptions.forEach((option) => {
      option.addEventListener("click", () => selectBilling(option.dataset.billing || "monthly"));
    });

    currencyOptions.forEach((option) => {
      option.addEventListener("click", () => selectCurrency(option.dataset.currency || "EUR"));
    });

    languageOptions.forEach((option) => {
      option.addEventListener("click", () => selectLanguage(option.dataset.language || "de"));
    });

    pricingCards.forEach((card) => {
      card.addEventListener("click", () => selectPlan(card.dataset.plan || "pro"));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectPlan(card.dataset.plan || "pro");
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

    revealItems.forEach((element) => {
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

    return () => {
      window.removeEventListener("scroll", updateTopbar);
      revealObserver.disconnect();
    };
  }, []);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
