# sgsim - Projektwebsite

Statische Website für [`smartgridsim`](https://github.com/ninodinoo/smartgridsim).

**Live:** https://ninodinoo.github.io/smartgridsimwebsite/

## Inhalt

Die Website erklärt den aktuellen Stand der Smart-Grid-Simulation:

- 90 indexierte Simulationsläufe
- Baselines: Naive und RuleBased
- Claude-Live-Reihen als CLI-Bedienung mit Claude-Subagents
- Codex-Operator-Reihen als CLI-Bedienung mit drei Durchgängen
- aktuelle Diagramme, Seminararbeits-DOCX, Quellenblatt und Prüferpaket

## Tech

- Pures HTML/CSS/JS, kein Build-Step nötig
- Canvas-Animationen für Hero-Netz und Lastganglinie
- Interaktiver Strategievergleich in `dashboard.js`
- Statische Downloads im Ordner `downloads/`

## Lokal ansehen

```bash
python -m http.server 8000
```

Dann im Browser öffnen:

```text
http://localhost:8000
```

Die Seite funktioniert auch direkt per `index.html`, der lokale Server ist aber
praktischer für die Browserprüfung.

## Wichtige Dateien

- `index.html` - Hauptseite mit Ergebnis, Diagrammen, Vergleich, Daten und Methodik
- `styles.css` - Layout, Typografie und responsives Design
- `hero-canvas.js` - animiertes Smart-Grid-Netz im Hero
- `load-chart.js` - animierte Tageskurven für Last, PV und Wind
- `dashboard.js` - interaktiver Strategievergleich
- `downloads/` - aktuelle Messdaten, DOCX, Quellenblatt, Diagramme und Prüferpaket
