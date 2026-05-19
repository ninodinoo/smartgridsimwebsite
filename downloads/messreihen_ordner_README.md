# Smart-Grid-Messreihen - geordneter Ueberblick

Dieses Archiv trennt die Messdaten sauber nach Quelle: Baseline-Controller, Claude-Live-Laeufe und Codex-Operator-Laeufe. Der Ordner `99_original_import/` enthaelt den unveraenderten Originalimport, damit die Herkunft der Daten nachvollziehbar bleibt.

## Ordnerstruktur

```text
smartgrid_messreihen/
  00_ueberblick/        zentrale Index- und Aggregatdateien
  01_baselines/         naive und rule_based, je Seed getrennt
  02_claude_live/       Claude-Subagent-Messreihen R1-R3
  03_codex_operator/    Codex-Messdurchgaenge R1-R3
  04_wetter/            Wetteranalyse und Wetter-Tagessummen
  05_seminararbeit/     Charts/Dokument-Artefakte
  99_original_import/   unveraenderter Originalimport als Archiv
```

## Zentrale Dateien

- `00_ueberblick/master_index.csv`: jede einzelne Messung mit Pfaden zu CSV, Metrics und Endstate.
- `00_ueberblick/aggregate_by_series_controller.csv`: Mittelwert und Standardabweichung je Quelle/Reihe/Controller.
- `03_codex_operator/all_rounds.csv`: alle drei Codex-Durchgaenge in einer Tabelle.
- `04_wetter/wetterlage_pro_seed.csv`: Wetter-Tagessummen je Seed.

## Laufzahlen

- Baselines: 30 Laeufe (15 Seeds x naive/rule_based)
- Claude Live: 15 Laeufe (3 Reihen x 5 Seeds)
- Codex Operator: 45 Laeufe (3 Durchgaenge x 15 Seeds)
- Gesamt indexiert: 90 Laeufe

## Schnellvergleich

| Quelle | Reihe | Controller | n | Brownouts Durchschnitt | Unserved MWh Durchschnitt | Surplus MWh Durchschnitt | Kosten Mio. EUR Durchschnitt |
|---|---|---:|---:|---:|---:|---:|---:|
| baseline | baseline_n15 | naive | 15 | 59.87 | 1248.30 | 400.41 | 8.93 |
| baseline | baseline_n15 | rule_based | 15 | 63.73 | 233.25 | 20.88 | 1.82 |
| claude_live | reihe_01 | claude_subagent | 5 | 52.80 | 958.93 | 623.41 | 6.91 |
| claude_live | reihe_02 | claude_subagent | 5 | 55.40 | 1098.91 | 717.63 | 7.89 |
| claude_live | reihe_03 | claude_subagent | 5 | 58.20 | 1028.87 | 662.51 | 7.40 |
| codex_operator | round_01_codex_r1 | codex_operator | 15 | 57.00 | 304.14 | 10.21 | 2.31 |
| codex_operator | round_02_codex_r2 | codex_r2 | 15 | 56.53 | 300.01 | 10.21 | 2.29 |
| codex_operator | round_03_codex_r3 | codex_r3 | 15 | 57.13 | 300.01 | 10.21 | 2.29 |

## Interpretation in einem Satz

Claude reduziert zwar die Brownout-Anzahl gegenueber RuleBased, verursacht aber deutlich tiefere Defizite und hoehere Kosten. Codex liegt naeher an RuleBased: weniger Brownout-Ticks und weniger Surplus als RuleBased, aber mehr unversorgte Energie und hoehere Kosten.

## Hinweise zur Nutzung

1. Fuer Excel oder Python zuerst `00_ueberblick/master_index.csv` oeffnen.
2. Fuer eine kompakte Statistik `00_ueberblick/aggregate_by_series_controller.csv` verwenden.
3. Fuer Rohdaten je Strategie direkt in `01_baselines/`, `02_claude_live/` oder `03_codex_operator/` wechseln.
4. Den Ordner `99_original_import/` nur als Archiv verwenden, nicht fuer neue Auswertungen.
