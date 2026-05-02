# sgsim - Projektwebsite

Statische Website für [`smartgridsim`](https://github.com/ninodinoo/smartgridsim).

**Live**: https://ninodinoo.github.io/smartgridsimwebsite/ (sobald GitHub
Pages aktiviert ist).

## Tech

- Pures HTML/CSS/JS (kein Build-Step nötig)
- Eigene Canvas-Animationen für Hero-Netz und Lastganglinie
- IBM Plex Mono / Inter Webfonts
- Responsive Forschungs-/Leitstand-Layout

## Lokal ansehen

```bash
# Beliebiger statischer Server, z. B.:
python -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

Die Seite funktioniert auch direkt per `index.html`, weil sie keine Build- oder Backend-Abhängigkeit hat.

## Dateien

- `index.html` - Hauptseite mit allen Abschnitten
- `styles.css` - Layout, Typografie und responsives Design
- `hero-canvas.js` - Animiertes Smart-Grid-Netz im Hero
- `load-chart.js` - Animierte Lastganglinien-Visualisierung
- `dashboard.js` - Interaktiver Strategievergleich
- `downloads/` - Prüferpaket, Word-Zusammenfassung, Aggregat-CSVs, Wetteranalyse und ZIPs der drei Messreihen
