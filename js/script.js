/* =========================================================
   FixMaster24 / SaarFix24 — Script
   --------------------------------------------------------
   👉 KONTAKTDATEN HIER ZENTRAL ÄNDERN:
   ========================================================= */
const CONFIG = {
  phone: "+4915112345678",          // Telefonnummer (international, ohne Leerzeichen) – für tel:
  phoneDisplay: "0151 1234 5678",   // Anzeige der Telefonnummer
  whatsapp: "4915112345678",        // WhatsApp-Nummer (nur Ziffern, mit Ländercode, ohne +)
  email: "kontakt@fixmaster24.de",  // E-Mail-Adresse
  whatsappText:
    "Hallo, ich brauche schnelle Hilfe. Mein Problem ist: … Meine Adresse/Stadtteil: … Fotos sende ich gleich."
};

/* --- Links generieren --- */
function buildLinks() {
  const waHref = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappText)}`;
  const telHref = `tel:${CONFIG.phone}`;
  const mailHref = `mailto:${CONFIG.email}`;

  document.querySelectorAll("[data-wa]").forEach(a => { a.href = waHref; });
  document.querySelectorAll("[data-tel]").forEach(a => { a.href = telHref; });
  document.querySelectorAll("[data-mail]").forEach(a => { a.href = mailHref; });
  document.querySelectorAll("[data-phone-display]").forEach(el => { el.textContent = CONFIG.phoneDisplay; });
  document.querySelectorAll("[data-email-display]").forEach(el => { el.textContent = CONFIG.email; });
}

/* --- Mobile-Navigation --- */
function initNav() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* --- AI Sofort-Check Daten --- */
const AICHECK = {
  wasser: {
    title: "Wasser läuft / Leck",
    steps: [
      "Wasserzufuhr (Eckventil oder Haupthahn) schließen.",
      "Eimer oder Handtücher unter die undichte Stelle legen.",
      "Stelle aus der Nähe fotografieren.",
      "Wasser an dieser Stelle vorerst nicht mehr benutzen.",
      "Foto und kurze Beschreibung per WhatsApp senden."
    ],
    warn: "Bei starkem Wasseraustritt oder Wasser in der Nähe von Elektrogeräten: Sicherung im Raum abschalten und Abstand halten."
  },
  strom: {
    title: "Sicherung raus / Steckdose tot",
    steps: [
      "Betroffenes Gerät ausschalten und vom Strom trennen.",
      "Sicherung nicht mehrfach hintereinander wieder einschalten.",
      "Keine nassen Hände benutzen, nichts an offenen Kontakten berühren.",
      "Foto vom Sicherungskasten machen (welcher Schalter ist gefallen?).",
      "Foto per WhatsApp senden – wir leiten bei Bedarf an einen Elektro-Partner weiter."
    ],
    warn: "Bei Brandgeruch, Rauch oder heißen Steckdosen: sofort Abstand halten und im Notfall die 112 anrufen."
  },
  geraet: {
    title: "Gerät funktioniert nicht",
    steps: [
      "Tür bzw. Klappe geschlossen halten (besonders beim Kühlschrank).",
      "Geräusche oder angezeigten Fehlercode notieren.",
      "Foto vom Typenschild (Modell-/Seriennummer) machen.",
      "Beim Kühlschrank: Lebensmittel möglichst kühl lagern.",
      "Fotos und Fehlerbeschreibung per WhatsApp senden."
    ],
    warn: "Reparieren Sie keine internen Bauteile selbst. Wir geben zuerst eine Einschätzung, ob sich eine Reparatur lohnt."
  },
  moebel: {
    title: "Möbel beschädigt / locker",
    steps: [
      "Lose oder scharfe Teile sichern, damit niemand sich verletzt.",
      "Vorhandene Schrauben oder Beschläge nicht wegwerfen.",
      "Gesamtsituation und Detail fotografieren.",
      "Maße grob notieren (z. B. Regalbreite, Bohrtiefe).",
      "Fotos per WhatsApp senden – wir bringen passendes Material mit."
    ],
    warn: "Bei schweren Hängeschränken oder Lasten über Kopf: nicht selbst nachbohren, wir prüfen die sichere Befestigung."
  },
  unklar: {
    title: "Unklarer Notfall",
    steps: [
      "Ruhe bewahren und die Situation aus sicherer Entfernung anschauen.",
      "Strom oder Wasser im betroffenen Bereich abschalten, wenn gefahrlos möglich.",
      "Situation fotografieren oder kurzes Video aufnehmen.",
      "Kurz beschreiben, was passiert ist und seit wann.",
      "Alles per WhatsApp senden – wir melden uns schnell mit der nächsten Empfehlung."
    ],
    warn: "Bei Gasgeruch: keine Schalter betätigen, Fenster öffnen, Gebäude verlassen und 112 / Gasnotruf anrufen."
  }
};

function initAiCheck() {
  const tabs = document.querySelectorAll(".tab");
  const panel = document.getElementById("aicheck-panel");
  if (!tabs.length || !panel) return;

  const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  function render(key) {
    const d = AICHECK[key];
    if (!d) return;
    panel.innerHTML = `
      <span class="badge-safe">✓ Sichere erste Schritte</span>
      <h3>${d.title}</h3>
      <ul class="aicheck__steps">
        ${d.steps.map(s => `<li><span class="chk">${check}</span><span>${s}</span></li>`).join("")}
      </ul>
      <div class="warn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span>${d.warn}</span>
      </div>`;
  }

  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("is-active"));
    t.classList.add("is-active");
    render(t.dataset.check);
  }));
  render("wasser");
}

/* --- FAQ Accordion --- */
function initFaq() {
  document.querySelectorAll(".faq__item").forEach(item => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq__item").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* --- Formular-Validierung --- */
function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const ok = form.querySelector(".form__ok");

  function setError(field, on) {
    field.closest(".field").classList.toggle("invalid", on);
    field.classList.toggle("err", on);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const name = form.elements["name"];
    const phone = form.elements["telefon"];
    const ort = form.elements["ort"];
    const problem = form.elements["problem"];
    const ds = form.elements["datenschutz"];

    if (!name.value.trim()) { setError(name, true); valid = false; } else setError(name, false);

    const phoneOk = /^[\d\s+()/-]{6,}$/.test(phone.value.trim());
    if (!phoneOk) { setError(phone, true); valid = false; } else setError(phone, false);

    if (!ort.value.trim()) { setError(ort, true); valid = false; } else setError(ort, false);
    if (!problem.value) { setError(problem, true); valid = false; } else setError(problem, false);
    if (!ds.checked) { setError(ds, true); valid = false; } else setError(ds, false);

    if (!valid) {
      form.querySelector(".invalid input, .invalid select")?.focus();
      return;
    }

    // Erfolgsmeldung anzeigen + WhatsApp-Vorbefüllung anbieten
    ok.style.display = "block";
    ok.scrollIntoView({ behavior: "smooth", block: "center" });

    const msg =
      `Hallo, ich brauche schnelle Hilfe.%0A` +
      `Name: ${encodeURIComponent(name.value.trim())}%0A` +
      `Telefon: ${encodeURIComponent(phone.value.trim())}%0A` +
      `Ort/Stadtteil: ${encodeURIComponent(ort.value.trim())}%0A` +
      `Problem: ${encodeURIComponent(problem.options[problem.selectedIndex].text)}%0A` +
      `Beschreibung: ${encodeURIComponent((form.elements["beschreibung"].value || "").trim())}%0A` +
      `Wunschzeit: ${encodeURIComponent((form.elements["wunschzeit"].value || "").trim())}`;

    const waBtn = form.querySelector(".form__wa");
    if (waBtn) waBtn.href = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;

    form.reset();
  });

  // Fehler beim Tippen entfernen
  form.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", () => { el.closest(".field").classList.remove("invalid"); el.classList.remove("err"); });
    el.addEventListener("change", () => { el.closest(".field").classList.remove("invalid"); el.classList.remove("err"); });
  });
}

/* --- Reveal beim Scrollen --- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(e => e.classList.add("in"));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(e => obs.observe(e));
}

/* --- Jahr im Footer --- */
function initYear() {
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
}

document.addEventListener("DOMContentLoaded", () => {
  buildLinks();
  initNav();
  initAiCheck();
  initFaq();
  initForm();
  initReveal();
  initYear();
});
