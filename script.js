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
const currencyOptions = document.querySelectorAll(".currency-option");
const planOptions = document.querySelectorAll(".plan-option");
const pricingCards = document.querySelectorAll(".pricing-card[data-plan]");
const priceElements = document.querySelectorAll(".price[data-price-monthly-chf]");
const priceNotes = document.querySelectorAll(".price-note");
const planCtas = document.querySelectorAll(".plan-cta");
const moneyValues = document.querySelectorAll(".money-value[data-currency-amount]");

const STORAGE_KEY = "cheftrack_currency";
const CHF_TO_EUR = 1.04;
const FOOD_WASTE_COST_PER_KG_CHF = 24;
const AVG_FOOD_WASTE_KG_PER_GUEST = 0.18;

let currentPlan = "pro";
let currentBilling = "monthly";
let currentCurrency = detectCurrency();

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
      // Ignore locale parsing issues and continue with fallbacks.
    }
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (timezone === "Europe/Zurich") return "CHF";
  return "EUR";
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
  const annualCostChf = currentPlan === "enterprise"
    ? 0
    : currentBilling === "yearly"
      ? currentPlan === "basic" ? 190 : 490
      : monthlyPlanPriceChf * 12;
  const roi = currentPlan === "enterprise" || annualCostChf === 0 ? null : (annualSavingsChf / annualCostChf).toFixed(1);

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
  roiValue.textContent = currentPlan === "enterprise"
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
    const card = note.closest(".pricing-card");
    if (!card) return;

    if (card.dataset.plan === "basic") {
      note.textContent = currentBilling === "yearly"
        ? `2 Monate geschenkt beim Jahresplan, insgesamt ${formatMoney(190)} pro Jahr`
        : "Monatlich kündbar";
    } else if (card.dataset.plan === "pro") {
      note.textContent = currentBilling === "yearly"
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
        title: "BASIC ist aktuell ausgewählt. Ideal für kleinere Betriebe, die Food Waste schnell sichtbar machen und erste Kosten senken möchten.",
        note: `${formatMoney(19)} pro Monat, monatlich kündbar.`
      },
      yearly: {
        title: "BASIC im Jahresmodell ist aktuell ausgewählt. Ein sinnvoller Einstieg für Betriebe, die dauerhaft kontrollierter planen möchten.",
        note: `2 Monate geschenkt, insgesamt ${formatMoney(190)} pro Jahr.`
      }
    },
    pro: {
      monthly: {
        title: "PRO ist aktuell ausgewählt. Die beste Wahl für Betriebe, die Verluste laufend reduzieren und ihre Marge aktiv absichern wollen.",
        note: `${formatMoney(49)} pro Monat und oft schon nach den ersten optimierten Events amortisiert.`
      },
      yearly: {
        title: "PRO im Jahresmodell ist aktuell ausgewählt. Die stärkste Wahl für maximale Einsparung, Planungssicherheit und nachhaltige Kostenkontrolle.",
        note: `2 Monate kostenlos sichern, insgesamt ${formatMoney(490)} pro Jahr.`
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
  };

  const selected = content[currentPlan][currentBilling];
  pricingSummary.innerHTML = `${selected.title}<small>${selected.note}</small>`;
}

function selectPlan(plan) {
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
updateCurrencySwitch();
renderMoneyValues();
selectPlan("pro");
selectBilling("monthly");
updateCalculator();
