# Smart-Grid-Messreihen — Daten-Archiv

**Seminararbeit Physik (Abitur):** Vergleich KI-Steuerung vs. regelbasierte Heuristik in einem 100 %-erneuerbaren Stromnetz.

Stand: 2026-05-02 · sgsim 0.1.0 · 45 Simulationsläufe in 3 unabhängigen Replikations-Reihen.

---

## Ordnerstruktur

```
smartgrid_messreihen/
├── README.md                       ← diese Datei
├── full_metrics_n15.csv            ← alle 45 Läufe in einer Tabelle (für Excel)
├── full_metrics_combined.csv       ← R1 + R2 (30 Läufe)
├── aggregation_n15.txt             ← Konsolen-Aggregation aller 15 Seeds
├── aggregation_combined.txt        ← Konsolen-Aggregation R1 + R2
├── wetter_analyse.md               ← Wetterlage pro Seed + LLM-Wahrnehmungs-Bias
├── wetterlage_pro_seed.csv         ← Wetter-Tagessummen aller 15 Seeds
│
├── reihe_1/
│   ├── bericht.md                  ← Bericht Reihe 1
│   ├── aggregation.txt
│   ├── metrics_reihe_1.csv         ← nur R1-Läufe (15 Zeilen)
│   ├── seed_07/
│   │   ├── naive.csv               ← 96 Ticks, alle Komponenten
│   │   ├── naive.metrics.json      ← Aggregat, Hash, Economics
│   │   ├── rule_based.csv          ← gleiche Struktur
│   │   ├── rule_based.metrics.json
│   │   ├── claude_subagent.csv     ← Live-LLM-Lauf
│   │   ├── claude_subagent.metrics.json
│   │   └── claude_subagent.endstate.json   ← Grid-Endzustand (für Nachberechnungen)
│   ├── seed_13/  (gleiche 7 Dateien)
│   ├── seed_23/
│   ├── seed_42/  (zusätzlich Plots/-Unterordner mit 12 PNGs)
│   └── seed_99/
│
├── reihe_2/
│   ├── bericht2.md                 ← Bericht Reihe 2 + n=10 kombiniert
│   ├── aggregation_r2.txt
│   ├── metrics_reihe_2.csv
│   └── seed_03, seed_17, seed_31, seed_55, seed_73/   (je 7 Dateien)
│
└── reihe_3/
    ├── bericht3.md                 ← Bericht Reihe 3 + n=15 kombiniert
    ├── aggregation_r3.txt
    ├── metrics_reihe_3.csv
    └── seed_05, seed_19, seed_41, seed_67, seed_88/   (je 7 Dateien)
```

---

## Was ist was

### Datentypen pro Seed (immer 7 Dateien)

| Datei | Inhalt | Format |
|---|---|---|
| `naive.csv` | Tick-Zeitreihe (96 Zeilen × ~50 Spalten): Wirkleistung jeder Komponente, SoC, Wetter, Bilanz, Frequenz, CO₂ | CSV |
| `naive.metrics.json` | 24-h-Aggregate: Brownouts, Unserved, Surplus, CO₂, Renewable Share, Peak Defizit, max Δf, Economics-Block, Reproducibility-Hash | JSON |
| `rule_based.csv` + `.metrics.json` | dito für regelbasierten Controller | CSV+JSON |
| `claude_subagent.csv` + `.metrics.json` | dito für Live-LLM-Steuerung (Claude per CLI) | CSV+JSON |
| `claude_subagent.endstate.json` | Voller persistierter Grid-Endzustand des Subagent-Laufs (kann zur Nachberechnung von Metriken oder als Fortsetzungs-Startpunkt dienen) | JSON |

### Berichte

| Bericht | Stichprobe | Schwerpunkt |
|---|---|---|
| `reihe_1/bericht.md` | n=5 (Seeds 7,13,23,42,99) | Erstauswertung, alle Roh-Daten, Welch-t/Cohen's d für n=5 |
| `reihe_2/bericht2.md` | n=5 + n=10 kombiniert | Erste Replikation, R1-vs-R2-Vergleich, kombinierte Statistik |
| `reihe_3/bericht3.md` | n=5 + n=15 kombiniert | Zweite Replikation, Streuungs-Befund, finale Statistik |

### Aggregat-CSVs

| Datei | Zeilen | Spalten | Zweck |
|---|---:|---:|---|
| `metrics_reihe_1.csv` | 16 | 23 | Reihe 1 alleine |
| `metrics_reihe_2.csv` | 16 | 23 | Reihe 2 alleine |
| `metrics_reihe_3.csv` | 16 | 23 | Reihe 3 alleine |
| `full_metrics_combined.csv` | 31 | 23 | R1 + R2 (30 Läufe + Header) |
| `full_metrics_n15.csv` | 46 | 23 | **R1 + R2 + R3 (45 Läufe + Header) — die Datei für Excel-Auswertung** |

Spalten in den Aggregat-CSVs (Auszug): `series, controller, seed, brownouts, unserved_mwh, surplus_mwh, co2_kg, ren_share, peak_def_mw, max_freq_dev_hz, total_cost_eur, lcoe_eur_per_mwh, hash, ...`

---

## Wichtigste Ergebnisse (Schnell-Übersicht)

### Brownouts pro Strategie (Mittelwert ± Standardabweichung über 15 Seeds)

| Strategie | Brownout-Ticks |
|---|---|
| Naive | 59.87 ± 1.13 |
| RuleBased | 63.73 ± 2.58 |
| **ClaudeSubagent** | **55.47 ± 5.38** |

Welch-t-Test Claude vs. RuleBased (n = 15): t = −5.36, **p < 0.001**, Cohen's d = −1.96.

### Aber: in 6 von 7 anderen Dimensionen ist RuleBased besser

| Dimension | Sieger | |Cohen's d| (n=15) |
|---|---|---:|
| Brownout-Häufigkeit | Claude | 1.96 |
| Versorgungssicherheit (Unserved Energy) | RuleBased | ≈ 6 |
| Frequenzstabilität | RuleBased | 6.81 |
| Peak Defizit | RuleBased | 3.85 |
| CO₂-Emissionen | RuleBased | 3.50 |
| Energieverschwendung (Surplus) | RuleBased | 6.71 |
| Wirtschaftlichkeit | RuleBased | sehr groß |

### Der "R1-Muster"-Befund (alle 15 Subagent-Läufe)

In **15 von 15** unabhängigen Live-LLM-Läufen wurde der H₂-Saisonspeicher zu früh entleert (Start-SoC nur 47 %, leer ab Tick ~60–80) → die H₂-Gasturbine fiel als Backup für die Abendspitze aus → Brownout-Kaskade in den letzten 4–6 h. Die Kernursache: **Sprachmodelle planen reaktiv über 1–2-h-Horizonte und bilanzieren langfristige Saisonspeicher nicht.**

---

## Wie man die Daten benutzt

### Excel / LibreOffice
1. `full_metrics_n15.csv` öffnen
2. Filter auf `controller` + `series` setzen → beliebige Sub-Auswertungen
3. Pivot-Tabellen für eigene Aggregate

### Python
```python
import pandas as pd
df = pd.read_csv("full_metrics_n15.csv")
df.groupby(["controller"])[["brownouts","co2_kg","surplus_mwh"]].agg(["mean","std"])
```

### Plots für andere Seeds erzeugen
Bisher gibt es Plots nur für Seed 42. Für jeden anderen Seed im Original-Repo:
```bash
cd C:/Users/pnino/Desktop/smartgridsim
python3.12 scripts/plot_run.py <pfad-zur-tick-csv>
```
Das erzeugt 4 PNGs (Generation Mix, Storage SoC, Imbalance/CO₂, Tagesbilanz) im `plots/`-Unterordner neben der CSV.

### Reproducibility-Hash prüfen
Jede `*.metrics.json` enthält einen 16-Zeichen-Hash. Damit kann ein Lauf eindeutig zitiert werden:
> *"Der Lauf mit Hash `f6603a498ee63ab3` wurde mit sgsim 0.1.0, Szenario `stadt_mittel.yaml`, Controller `rule_based`, Seed 42, 96 Ticks erzeugt."*

Die Hashes sind in den Berichten (jeweils §3.4 / §8) tabelliert. Subagent-Hashes sind nachträglich aus dem `endstate.json` berechnet — das LLM-Sampling selbst ist nicht-deterministisch, aber die Eingangsbedingungen sind über den Hash dokumentiert.

---

## Seed-Zuordnung zu Reihen

| Reihe | Seeds | Datum (alle 2026-05-02) |
|---|---|---|
| Reihe 1 | 7, 13, 23, 42, 99 | ~02:30 Uhr |
| Reihe 2 | 3, 17, 31, 55, 73 | ~03:15 Uhr |
| Reihe 3 | 5, 19, 41, 67, 88 | ~03:30 Uhr |

Jeder Seed bestimmt deterministisch das **Wetter** (PV, Wind) und die **Lastprofile** des 24-h-Tages. Identischer Seed → identische Eingangsbedingungen für alle drei Strategien (Apples-to-Apples-Vergleich).

---

*Dieses Archiv enthält die vollständigen Roh- und Aggregat-Daten der Seminararbeit. Die Auswertungen in den Berichten sind aus diesen Dateien direkt nachvollziehbar.*
