# FixMaster24 / SaarFix24 — Website

Schnelle Hilfe bei kleinen Notfällen in Wohnung & Haus in **Saarbrücken und Umgebung**.
Statische, schnell ladende Website (HTML/CSS/JS, keine Build-Tools nötig).

## 📁 Dateien

```
saarfix24/
├── index.html          ← Hauptseite (Hero, Leistungen, AI-Check, Preise, FAQ, Kontakt …)
├── impressum.html      ← Impressum (Platzhalter ausfüllen!)
├── datenschutz.html    ← Datenschutzerklärung (Muster anpassen!)
├── agb.html            ← AGB (Muster, anwaltlich prüfen!)
├── robots.txt          ← SEO
├── sitemap.xml         ← SEO
├── css/styles.css      ← Design / Layout
└── js/script.js        ← Logik (Kontaktdaten, WhatsApp, Formular, AI-Check, FAQ)
```

## ⚙️ Kontaktdaten ändern (wichtig!)

Alle Telefon-, WhatsApp- und E-Mail-Angaben werden an **einer** zentralen Stelle gepflegt:
in [`js/script.js`](js/script.js) ganz oben im `CONFIG`-Objekt.

```js
const CONFIG = {
  phone: "+4915112345678",          // tel:-Link (international, ohne Leerzeichen)
  phoneDisplay: "0151 1234 5678",   // angezeigte Nummer
  whatsapp: "4915112345678",        // WhatsApp (nur Ziffern + Ländercode, ohne +)
  email: "kontakt@fixmaster24.de",  // E-Mail
  whatsappText: "Hallo, ich brauche schnelle Hilfe. ..."  // vorausgefüllte WhatsApp-Nachricht
};
```

Nach dem Ändern einfach speichern – alle Buttons, Links und Anzeigen auf allen Seiten
werden automatisch aktualisiert.

## 📝 Vor dem Livegang erledigen

1. **`CONFIG` in `js/script.js`** mit echten Daten füllen.
2. **`impressum.html`** vollständig ausfüllen (gesetzlich verpflichtend, § 5 DDG).
3. **`datenschutz.html`** und **`agb.html`** anpassen / rechtlich prüfen lassen.
4. In `index.html`, `robots.txt`, `sitemap.xml` und den Schema.org-Blöcken die
   Domain `www.fixmaster24.de` durch Ihre echte Domain ersetzen.
5. Optional: echtes `og-image.jpg` (1200×630 px) für Social-Media-Vorschau hinterlegen.

## 🚀 Lokal ansehen

Einfach `index.html` im Browser öffnen – oder ein kleiner lokaler Server:

```powershell
# Python
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

## ✅ Enthalten

- Vollständig responsiv (Desktop / Tablet / Mobil) mit Sticky-WhatsApp/Anruf-Leiste mobil
- SEO: Meta-Title/Description, Keywords, H1/H2/H3, Schema.org `LocalBusiness` + `FAQPage`, Sitemap, robots.txt
- WhatsApp-Link mit vorausgefüllter Nachricht, `tel:`-Anruf-Button
- Interaktiver **AI Sofort-Check** (sichere erste Schritte je Problem)
- Kontaktformular mit Validierung (+ optionale WhatsApp-Weiterleitung der Eingaben)
- Rechtlich vorsichtige Formulierungen (keine 24/7-Garantie, Facharbeiten nur über Partner)

## ⚠️ Hinweis Formular

Das Kontaktformular ist eine **Frontend-Demo** (kein Server-Versand). Für echten
E-Mail-Versand bitte ein Backend / einen Formular-Dienst (z. B. Formspree, eigener
PHP-/Node-Endpoint) anbinden. Die schnellste Kontaktaufnahme läuft ohnehin über WhatsApp/Telefon.
