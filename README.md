# sgsim — Projektwebsite

Statische Website für [`smartgridsim`](https://github.com/ninodinoo/smartgridsim).

**Live**: https://ninodinoo.github.io/smartgridsimwebsite/ (sobald GitHub
Pages aktiviert ist).

## Tech

- Pures HTML/CSS/JS (kein Build-Step nötig)
- TailwindCSS via CDN
- Eigene Canvas-Animationen für Hero und Lastganglinie
- JetBrains Mono / Inter Webfonts
- Dark Mode

## Lokal ansehen

```bash
# Beliebiger statischer Server, z. B.:
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

## Dateien

- `index.html` — Haupt-Seite mit allen Abschnitten
- `styles.css` — Eigene Styles ergänzend zu Tailwind
- `hero-canvas.js` — Animiertes Smart-Grid-Netz im Hero
- `load-chart.js` — Animierte Lastganglinien-Visualisierung
