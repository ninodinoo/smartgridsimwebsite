# Downloads zur aktuellen Smart-Grid-Website

Stand: 19.05.2026

Dieser Ordner enthält die aktuelle Datenbasis der Website. Alte Zwischenstände
mit nur 45 Läufen wurden ersetzt.

## Wichtigste Dateien

| Datei | Inhalt |
|---|---|
| `smartgrid_messreihen_aktuell_prueferpaket.zip` | Kompletter aktueller Prüferordner ohne alten Originalimport |
| `Seminararbeit_Teil_Modell_und_Messreihen_aktualisiert.docx` | Aktualisierter Seminararbeits-Teil mit Modell, Auswertung, Diagrammen und Tabellen |
| `Detailquellenblatt.xlsx` | Quellenblatt mit eigenen Primärquellen und externen Hintergrundquellen |
| `master_index.csv` | Eine Zeile pro Lauf, insgesamt 90 indexierte Läufe |
| `aggregate_by_series_controller.csv` | Mittelwerte und Standardabweichungen je Quelle/Reihe/Controller |
| `codex_all_rounds.csv` | Alle 45 Codex-Operator-Läufe aus drei Durchgängen |
| `wetterlage_pro_seed.csv` | Wetter-Tagessummen je Seed |
| `wetter_analyse.md` | Einordnung der synthetischen Wetterlage |
| `charts_aktuell.zip` | Alle aktuellen Diagramme als PNG |

## Datenumfang

- Baselines: 30 Läufe, 15 Seeds mal `naive` und `rule_based`
- Claude Live: 15 Läufe, CLI-Bedienung mit Claude-Subagents
- Codex Operator: 45 Läufe, 3 Durchgänge mal 15 Seeds
- Gesamt: 90 indexierte Läufe

## Kernergebnis

RuleBased bleibt im aktuellen Datensatz bei unversorgter Energie, Frequenz und
Kosten am stärksten. Codex liegt näher an RuleBased als Claude und hat den
geringsten Überschuss. Claude hat weniger Brownout-Ticks, aber deutlich tiefere
Defizite und höhere Kosten.
