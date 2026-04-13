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
    const currencyOptions = root.querySelectorAll<HTMLElement>(".currency-option");
    const planOptions = root.querySelectorAll<HTMLElement>(".plan-option");
    const pricingCards = root.querySelectorAll<HTMLElement>(".pricing-card[data-plan]");
    const priceElements = root.querySelectorAll<HTMLElement>(".price[data-price-monthly-chf]");
    const priceNotes = root.querySelectorAll<HTMLElement>(".price-note");
    const planCtas = root.querySelectorAll<HTMLElement>(".plan-cta");
    const moneyValues = root.querySelectorAll<HTMLElement>(".money-value[data-currency-amount]");
    const faqItems = root.querySelectorAll<HTMLElement>(".faq-item");
    const revealItems = root.querySelectorAll<HTMLElement>(".reveal");

    const STORAGE_KEY = "cheftrack_currency";
    const CHF_TO_EUR = 1.04;
    const FOOD_WASTE_COST_PER_KG_CHF = 24;
    const AVG_FOOD_WASTE_KG_PER_GUEST = 0.18;

    let currentPlan = "pro";
    let currentBilling = "monthly";
    let currentCurrency = detectCurrency();

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
      moneyValues.forEach((element) => {
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
      savingsValue.textContent = `Bis zu ${formatMoney(annualSavingsChf)} pro Jahr`;
      savingsContext.textContent = `Bei bis zu ${reductionPercent}% weniger Food Waste`;
      calculatorCompareValue.textContent = `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`;
      wowSavingsValue.textContent = formatMoney(annualSavingsChf);
      wowCompareValue.textContent = `Das entspricht rund ${annualAvoidedWasteKg} kg vermiedenem Food Waste pro Jahr.`;
      wowAnnualValue.textContent = `+ ${formatMoney(annualSavingsChf)}`;
      wowAnnualNote.textContent = `Bei bis zu ${reductionPercent}% weniger Food Waste`;
      wowEventsBadge.textContent = `${events} Events / Monat`;
      wowGuestsBadge.textContent = `${guests} Gäste / Event`;
      wowReductionBadge.textContent = `${reductionPercent}% weniger Food Waste`;
      roiValue.textContent =
        currentPlan === "enterprise"
          ? "Preis auf Anfrage. Wir zeigen Ihnen den ROI gerne im persönlichen Gespräch."
          : `Basierend auf durchschnittlichen Branchenwerten liegt Ihr Potenzial bei rund ${roi}x des gewählten Cheftrack-Plans.`;
      savingsCta.textContent = "Potenzial kostenlos berechnen →";
    }

    function updatePrices() {
      priceElements.forEach((element) => {
        const monthlyChf = Number(element.dataset.priceMonthlyChf);
        const yearlyChf = Number(element.dataset.priceYearlyChf);
        if (currentBilling === "yearly") {
          element.innerHTML = `${formatMoney(yearlyChf)}<span style="font-size: 1rem; color: var(--muted);">/Jahr</span>`;
        } else {
          element.innerHTML = `${formatMoney(monthlyChf)}<span style="font-size: 1rem; color: var(--muted);">/Monat</span>`;
        }
      });

      priceNotes.forEach((note) => {
        const card = note.closest<HTMLElement>(".pricing-card");
        if (!card) return;

        if (card.dataset.plan === "basic") {
          note.textContent =
            currentBilling === "yearly"
              ? `2 Monate geschenkt beim Jahresplan, insgesamt ${formatMoney(190)} pro Jahr`
              : "Monatlich kündbar";
        } else if (card.dataset.plan === "pro") {
          note.textContent =
            currentBilling === "yearly"
              ? `2 Monate kostenlos sichern, insgesamt ${formatMoney(490)} pro Jahr`
              : "Monatlich kündbar";
        } else {
          note.textContent = "Preis auf Anfrage";
        }
      });
    }

    function updatePricingSummary() {
      const content = {
        basic: {
          monthly: {
            title:
              "BASIC ist aktuell ausgewählt. Ideal für kleinere Betriebe, die Food Waste schnell sichtbar machen und erste Kosten senken möchten.",
            note: `${formatMoney(19)} pro Monat, monatlich kündbar.`
          },
          yearly: {
            title:
              "BASIC im Jahresmodell ist aktuell ausgewählt. Ein sinnvoller Einstieg für Betriebe, die dauerhaft kontrollierter planen möchten.",
            note: `2 Monate geschenkt, insgesamt ${formatMoney(190)} pro Jahr.`
          }
        },
        pro: {
          monthly: {
            title:
              "PRO ist aktuell ausgewählt. Die beste Wahl für Betriebe, die Verluste laufend reduzieren und ihre Marge aktiv absichern wollen.",
            note: `${formatMoney(49)} pro Monat und oft schon nach den ersten optimierten Events amortisiert.`
          },
          yearly: {
            title:
              "PRO im Jahresmodell ist aktuell ausgewählt. Die stärkste Wahl für maximale Einsparung, Planungssicherheit und nachhaltige Kostenkontrolle.",
            note: `2 Monate kostenlos sichern, insgesamt ${formatMoney(490)} pro Jahr.`
          }
        },
        enterprise: {
          monthly: {
            title:
              "ENTERPRISE ist aktuell ausgewählt. Für Betriebe, die mehrere Standorte wirtschaftlich einheitlich steuern möchten.",
            note: "Preis auf Anfrage mit persönlicher Beratung."
          },
          yearly: {
            title:
              "ENTERPRISE ist aktuell ausgewählt. Für komplexe Anforderungen mit individueller Jahresvereinbarung und langfristiger Prozesssicherheit.",
            note: "Preis und Laufzeit werden individuell mit Ihrem Betrieb abgestimmt."
          }
        }
      } as const;

      const selected = content[currentPlan as keyof typeof content][
        currentBilling as "monthly" | "yearly"
      ];
      pricingSummary.innerHTML = `${selected.title}<small>${selected.note}</small>`;
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
    updateCurrencySwitch();
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
