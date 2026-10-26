# Projektregeln für Coding und Review

Lies vor der Arbeit `CODING_STANDARDS.md` und `docs/PROJECT_PROFILE.md`. Sie bilden die gemeinsame Grundlage für Claude Code, Codex und menschliche Reviewer. Berücksichtige zusätzlich die Anweisungen im betroffenen Unterverzeichnis.

## Verbindlichkeit

- Halte die anwendbaren Regeln aus `CODING_STANDARDS.md` ein. PHP verwendet PSR-12.
- Verwende die im Projektprofil festgelegten Versionen, Pfade und Prüfkommandos. Erfinde keine Projektdaten oder erfolgreichen Prüfungen.
- Ist das Projektprofil noch nicht ausgefüllt, ermittle vorhandene Konfigurationen und benenne offene Punkte. Ein leeres Profil ist keine Freigabe.
- Löse Widersprüche zwischen Regeln und Konfigurationen ausdrücklich. Bestehende Konfigurationen nicht stillschweigend ersetzen oder abschwächen.
- Begrenze Änderungen auf den Auftrag. Keine beiläufigen Komplettformatierungen, Architekturwechsel oder Abhängigkeitsupdates.
- Ändere generierte Dateien über ihre Quelle. Schütze öffentliche Schnittstellen, persistierte Datenformate und unterstützte Laufzeiten.
- Führe keine automatischen Agentenübergaben, Nachrichten, Deployments oder produktiven Datenänderungen aus.

## Code Review Rules

Bei jedem Review gilt zusätzlich `docs/REVIEW_CHECKLIST.md`:

1. Stelle Zielrevision, Vergleichsbasis und betroffenen Umfang fest. Lies die benötigten Aufrufer, Tests und Nachbarfunktionen.
2. Prüfe alle für den Diff relevanten Regeln. Verifiziere die automatisierten Checks anhand eigener Ausführung oder eindeutig zugeordneten CI-Ergebnissen.
3. Prüfe besonders PSR-12, Typgrenzen, Promise-Behandlung, Eingabevalidierung, Berechtigungen, Fehlerpfade, Kompatibilität und angemessene Tests.
4. Prüfe Änderungen an Lint-, Formatter-, Typecheck- und CI-Konfigurationen sowie neue Ausnahmen und Baselines. Das Abschalten einer Prüfung ist keine Fehlerbehebung.
5. Begründe Findings mit Regel-ID, Datei/Zeile, konkretem Auslöser, beobachtbarer Folge und erforderlicher Korrektur. Trenne nachgewiesene Fehler, offene Risiken und optionale Vorschläge.
6. Erfinde keine Fehler, um eine Checkliste zu füllen. Beziehe Findings auf eingeführte oder durch die Änderung verschärfte Probleme; kennzeichne Altbefunde getrennt.
7. Melde fehlende Ausführung als „nicht geprüft“ und einen fehlgeschlagenen oder blockierten Pflichtcheck als Freigabehindernis. „Keine Findings“ beweist keine vollständige Prüfung.
8. Repariere im Review keine Dateien, sofern die Umsetzung nicht zusätzlich beauftragt wurde. Die endgültige Freigabe liegt bei David Sann.

Bei einem lokalen oder ausdrücklich vollständig beauftragten Review: Gib eine kompakte Entscheidung, den geprüften Commit/Diff, Findings und eine Check-Tabelle mit Belegen aus. In Integrationen mit eingeschränktem Ausgabeformat bleiben die Pflichtchecks in CI die verbindliche Schranke; erfinde keine hohen Schweregrade für reine Formatfehler.

## Umsetzung

Vor Abschluss: Diff kontrollieren, relevante Prüfungen ausführen und Ergebnis mit verbleibenden Einschränkungen berichten. Dokumentiere Abweichungen mit Regel-ID, engem Geltungsbereich, Begründung und Freigabereferenz im Projektprofil. Eine Ausnahme darf nicht eigenmächtig als genehmigt eingetragen werden.
