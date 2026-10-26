# Verbindlicher Review-Ablauf

## 1. Umfang feststellen

- Zielcommit, Vergleichsbasis, Arbeitsbaumänderungen und betroffene Funktionen benennen.
- Akzeptanzkriterien und Projektprofil lesen. Fehlende Anforderungen als offen kennzeichnen.
- Änderungen an Konfiguration, Abhängigkeiten, generiertem Code und Schnittstellen einbeziehen.

## 2. Nachweis führen

Diese Tabelle im vollständigen Review-Bericht verwenden. Status: **bestanden**, **fehlgeschlagen**, **blockiert**, **nicht geprüft** oder **nicht relevant**. Bei „nicht relevant“ den Grund nennen. CI-Ergebnisse müssen zum Zielcommit gehören; ein grüner älterer Lauf ist kein Nachweis.

| Prüfung                                             | Status | Beleg / Einschränkung                         |
| --------------------------------------------------- | ------ | --------------------------------------------- |
| Anwendbare Coding-Standards und Projektregeln       | Offen  | Relevante Regel-IDs                           |
| Format / PSR-12                                     | Offen  | Kommando, Exitcode oder CI-Link + SHA         |
| ESLint / PHPStan / Framework-Lint                   | Offen  | Kommando, Exitcode oder CI-Link + SHA         |
| TypeScript-Typecheck                                | Offen  | Kommando, Exitcode oder CI-Link + SHA         |
| Fachlicher Hauptablauf                              | Offen  | Testfall und Ergebnis                         |
| Relevante Fehlerfälle / Regression                  | Offen  | Testfall und Ergebnis                         |
| Öffentliche Schnittstellen / Laufzeitkompatibilität | Offen  | Geprüfte Aufrufer und Zielversion             |
| Validierung / Berechtigungen / Datenbehandlung      | Offen  | Konkrete Änderung und Nachweis                |
| Geänderte Ausnahmen, Baselines und CI-Grenzen       | Offen  | Diff-Befund                                   |
| UI / Tastatur / responsive Darstellung              | Offen  | Nur bei betroffener UI; tatsächliche Umgebung |

## 3. Findings dokumentieren

Pro Finding: kurzer Titel, Priorität, Regel-ID, Datei/Zeile, konkrete Voraussetzung beziehungsweise Reproduktion, erwartetes und tatsächliches Verhalten, Folge und gezielter Korrekturhinweis. Keine spekulative Ursache als Tatsache darstellen.

- **P0 / Blocker:** Zentraler Ablauf nicht nutzbar oder unmittelbar gravierendes Problem; Freigabe stoppen.
- **P1 / Hoch:** Wichtige Funktion oder Schutzmaßnahme deutlich beeinträchtigt.
- **P2 / Mittel:** Relevanter Fehler mit praktikabler Umgehung.
- **P3 / Niedrig:** Kleine Beeinträchtigung oder mechanischer Stil-/Formatverstoß.

Priorität beschreibt die Auswirkung. Ein fehlgeschlagener Pflichtcheck kann einen Merge auch bei P3 verhindern. Fehlende Nachweise separat als Prüflücke benennen. Optionale Präferenzen sind keine Fehler.

Ein mechanisches Problem einmal mit dem Check-Ergebnis dokumentieren; keine Reihe identischer Inline-Kommentare. Fehlende oder zu schwach konfigurierte Checks eigenständig beurteilen. Bestehende Probleme außerhalb des Diffs separat kennzeichnen.

## 4. Empfehlung abgeben

- **Freigabefähig:** Relevante Pflichtchecks und Anforderungen im genannten Umfang belegt; keine offenen verpflichtenden Verstöße.
- **Freigabefähig mit Einschränkungen:** Nur bei klar begrenzten, dokumentierten Restpunkten und nachvollziehbarer Ausnahme; eine fehlende kritische Prüfung nicht durch diese Formulierung verdecken.
- **Nicht freigabefähig:** Relevanter Pflichtcheck fehlgeschlagen, blockiert oder nicht geprüft; ungeklärtes wesentliches Risiko oder verpflichtender Verstoß.

Abschlussformat: Empfehlung; Version und Umfang; Check-Tabelle; Findings nach Priorität; verbleibende Risiken und nächste Schritte. Die endgültige Freigabe liegt bei David Sann.

## Review-Auftrag zum Kopieren

> Prüfe den aktuellen Diff gegen die festgelegte Vergleichsbasis. Lies AGENTS.md, CODING_STANDARDS.md und docs/PROJECT_PROFILE.md. Führe das vollständige Review nach docs/REVIEW_CHECKLIST.md durch. Prüfe die zugehörigen Pflichtchecks und die fachlichen Risiken unabhängig. Ändere keine Dateien. Dokumentiere echte Verstöße mit Regel-ID, Fundstelle und Auswirkung; kennzeichne fehlende Prüfungen ausdrücklich. Gib eine technische Freigabeempfehlung für den geprüften Umfang ab.
