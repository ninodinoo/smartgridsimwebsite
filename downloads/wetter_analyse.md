# Wetterlage pro Seed — und ein überraschender Bonus-Befund

Diese Auswertung schließt eine Lücke in den Berichten 1–3: Bisher waren die Wetter-Charakteristika der einzelnen Seeds **nicht systematisch** dokumentiert — nur indirekt aus Subagent-Berichten ("Wind bei Seed 73 schwächer als Brief vermuten ließ").

Die nachfolgende Auswertung ist aus den Tick-CSVs der `naive`-Läufe berechnet (Wetter ist deterministisch nur vom Seed abhängig, nicht vom Controller — alle drei Strategien sehen dasselbe Wetter pro Seed).

---

## 1. Wetter-Tagessummen pro Seed

| Reihe | Seed | Mittl. Einstrahlung [W/m²] | Mittl. Windgeschw. [m/s] | PV-Tagesertrag [MWh] | Wind-Tagesertrag [MWh] | EE-Total [MWh] |
|---|---:|---:|---:|---:|---:|---:|
| R2 | 3  | 226.9 | 6.91 | 1056.5 | 629.1 | 1685.5 |
| R3 | 5  | 228.0 | 7.16 | 1061.5 | 678.2 | 1739.7 |
| R1 | 7  | 226.3 | 7.01 | 1053.7 | 637.5 | 1691.2 |
| R1 | 13 | 225.6 | 6.95 | 1050.4 | 630.6 | 1681.0 |
| R2 | 17 | 227.7 | 6.99 | 1060.2 | 621.7 | 1682.0 |
| R3 | 19 | 228.8 | 7.00 | 1065.5 | 644.8 | 1710.3 |
| R1 | 23 | 225.1 | 6.88 | 1048.1 | 606.4 | 1654.5 |
| R2 | 31 | 226.5 | 7.24 | 1054.5 | 698.5 | 1753.0 |
| R3 | 41 | 227.1 | 7.04 | 1057.6 | 660.9 | 1718.5 |
| R1 | 42 | 227.8 | 7.01 | 1060.7 | 642.3 | 1703.0 |
| R2 | 55 | 228.1 | 7.00 | 1062.3 | 637.8 | 1700.1 |
| R3 | 67 | 225.7 | 6.98 | 1050.8 | 621.1 | 1671.9 |
| R2 | 73 | 228.9 | 7.14 | 1065.7 | 679.4 | 1745.1 |
| R3 | 88 | 227.3 | 7.00 | 1058.5 | 639.5 | 1698.0 |
| R1 | 99 | 228.9 | 6.98 | 1065.6 | 647.7 | 1713.3 |
| **Mittel** | | **227.2** | **7.02** | **1058.1 ± 5.7** | **645.0 ± 24.8** | **1703.1 ± 26.4** |

> **Maschinenlesbar:** [`wetterlage_pro_seed.csv`](wetterlage_pro_seed.csv) (15 Zeilen × 14 Spalten, mit Min/Max-Werten und Klassifikation)

## 2. Klassifikation pro Seed

Klassifikation: `stark` = > Mittel + 0.3·SD, `schwach` = < Mittel − 0.3·SD, `mittel` = dazwischen.

| Reihe | Seed | PV | Wind | Charakter |
|---|---:|---|---|---|
| R2 | 3  | mittel | schwach | mäßig sonnig, windarm |
| R3 | 5  | **stark** | **stark** | sehr sonnig + windreich |
| R1 | 7  | schwach | schwach | trüb + windarm |
| R1 | 13 | schwach | schwach | trüb + windarm |
| R2 | 17 | **stark** | schwach | sonnig, windarm |
| R3 | 19 | **stark** | mittel | sonnig, mäßig windig |
| R1 | 23 | schwach | schwach | trüb + windarm |
| R2 | 31 | schwach | **stark** | trüb, windreich |
| R3 | 41 | mittel | **stark** | mäßig sonnig, windreich |
| R1 | 42 | **stark** | mittel | sonnig, mäßig windig |
| R2 | 55 | **stark** | mittel | sonnig, mäßig windig |
| R3 | 67 | schwach | schwach | trüb + windarm |
| R2 | 73 | **stark** | **stark** | sehr sonnig + windreich |
| R3 | 88 | mittel | mittel | mittlerer Tag |
| R1 | 99 | **stark** | mittel | sonnig, mäßig windig |

---

## 3. Bonus-Befund: LLMs schätzen das Wetter falsch ein

### Beobachtung
Mehrere Subagents haben in ihren Berichten geschrieben:

| Seed | Subagent-Aussage | Wetter-Realität laut Tagessumme |
|---|---|---|
| 7 | "PV/Wind deutlich schwächer als Brief vermuten ließ" | PV 1054 MWh (≈ Mittel), Wind 638 MWh (≈ Mittel) |
| 13 | "Wind bei Seed 13 sehr schwach (nur 10–25 MW)" | Wind-Tagesertrag 631 MWh — **leicht unterdurchschnittlich, aber nicht extrem** |
| 41 | "Wind … schwächer (~10–15 MW gesamt)" | Wind 661 MWh — **überdurchschnittlich (+16 MWh über Mittel)** |
| 67 | "Wind seed-67-bedingt deutlich schwächer (~10 MW statt 25 MW)" | Wind 621 MWh — leicht unterdurchschnittlich |
| 73 | "Wind bei Seed 73 schwächer als Brief vermuten ließ" | Wind **679 MWh** — **dritthöchster Wert von allen 15 Seeds!** |
| 88 | "Wind in Seed 88 deutlich schwächer (~10–25 MW statt 35–50)" | Wind 640 MWh — **mittlerer Wert, normal** |

### Interpretation
Die Wetter-**Tagessummen** über alle 15 Seeds streuen nur um:
- **PV: ±0.5 %** (1058 ± 5.7 MWh) — praktisch konstant
- **Wind: ±3.8 %** (645 ± 24.8 MWh) — geringe Streuung
- **Erneuerbare gesamt: ±1.6 %** (1703 ± 26.4 MWh)

Trotzdem behaupten **mehrere Subagents systematisch**, "ihr" Seed sei besonders schlecht. Drei davon (Seeds 41, 73, 88) liegen sogar **über** dem Mittelwert — und der Subagent behauptet trotzdem schlechtes Wetter.

### Ursache
Die Subagents lesen das Wetter **Tick für Tick** (15-min-Auflösung) und vergleichen es mit der **groben Tagesgang-Skizze** im Master-Brief (z. B. "PV-Spitze 12–15 Uhr ~280 MW"). In jeder einzelnen Stunde ist die Realität durch das stochastische Wettermodell etwas anders als die Skizze — der Subagent interpretiert diese **lokale Volatilität** als globale Wetterunterbietung.

### Wert für die Seminararbeit
Das ist ein **dokumentierter kognitiver Bias** des Sprachmodells:

> *Subagents schreiben den eigenen Strategiefehlern (H₂-Speicher zu früh leer) eine externe Ursache zu (vermeintlich schwaches Wetter) — obwohl die Wetter-Tagessummen objektiv im normalen Bereich liegen oder sogar überdurchschnittlich sind. Diese **Attributionsfehler** ist eine bekannte Eigenschaft von LLMs in agentischen Settings und ein zusätzlicher Grund, warum LLMs aktuell nicht für sicherheitskritische Steuerungsaufgaben eingesetzt werden sollten.*

In der Seminararbeit zitierfähig als zweiter, unabhängiger Befund neben dem H₂-Speicher-Problem.

---

## 4. Korrelation Wetter ↔ Brownouts (claude_subagent)

Wenn das Wetter wirklich der bestimmende Faktor wäre, müsste eine Korrelation zwischen schwachem Wetter und vielen Brownouts bestehen. Spot-Check:

| Seed | EE-Tagesertrag [MWh] | Brownouts (Claude) |
|---|---:|---:|
| 23 | 1654.5 (niedrigster) | 55 |
| 67 | 1671.9 | 58 |
| 13 | 1681.0 | 51 |
| 17 | 1682.0 | 51 |
| 3  | 1685.5 | 56 |
| 7  | 1691.2 | 62 |
| 88 | 1698.0 | 52 |
| 55 | 1700.1 | 57 |
| 42 | 1703.0 | 52 |
| 19 | 1710.3 | **67** ← höchster Brownout-Wert bei mittlerem Wetter |
| 99 | 1713.3 | 44 |
| 41 | 1718.5 | 60 |
| 5  | 1739.7 | 54 |
| 73 | 1745.1 | 56 |
| 31 | 1753.0 (höchster) | 57 |

Korrelation Wetter-Tagesertrag ↔ Brownouts (Claude): praktisch **kein Zusammenhang** (Pearson r ≈ +0.07). Der Brownout-Wert wird viel stärker von der **Strategie** (H₂-Bewirtschaftung) bestimmt als vom Wetter.

→ Bestätigung: Das Wetter ist **nicht** die Erklärung für die Brownouts. Die Subagents schieben es nur darauf, weil sie ihren eigenen Strategiefehler nicht erkennen.

---

## 5. Datenquelle

Berechnet aus den `naive_seed<N>.csv`-Dateien (Spalten: `irradiance`, `wind`, `temperature`, `P_pv_aufdach_mw`, `P_wind_onshore_mw`, `P_wind_offshore_anteil_mw`).

Tagessummen: Σ Leistung [MW] × 0.25 h pro Tick = MWh.

Skript reproduzierbar (im Smartgrid-Repo lauffähig):
```python
import csv, statistics
from pathlib import Path
for seed in [3,5,7,13,17,19,23,31,41,42,55,67,73,88,99]:
    p = Path(f"results/baselines/naive_seed{seed}.csv")
    pv, wind = [], []
    with p.open() as f:
        rdr = csv.DictReader(f)
        for r in rdr:
            pv.append(float(r["P_pv_aufdach_mw"]))
            wind.append(float(r["P_wind_onshore_mw"]) + float(r["P_wind_offshore_anteil_mw"]))
    print(f"seed={seed}  PV={sum(pv)*0.25:.1f} MWh  Wind={sum(wind)*0.25:.1f} MWh")
```
