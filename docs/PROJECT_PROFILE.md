# Projektprofil – zf2

Stand: 25.10.2026 · Repository: `dasann/zf2` · Basisbranch: `master`

## Geprüfte Ausgangslage

Zend Framework 2, PHP >=5.3.23, historischer Bibliotheksstand. Die Konfiguration wurde aus dem aktuellen Repository gelesen. Das ist kein Nachweis des produktiven Betriebs.

## Einführung und Geltungsbereich

Die gemeinsamen Regeln gelten für neue und geänderte eigene Dateien. Der neue CI-Job **Coding standards / changed-files** prüft vollständige geänderte Dateien im PR-Diff; er formatiert keinen Altbestand automatisch. Eine Änderung an einer alten Datei kann deshalb zunächst deren vorhandene Stilbefunde sichtbar machen. Es wird keine pauschale Fehler-Baseline angelegt.

Vorhandene Anwendungsprüfungen bleiben zusätzlich erforderlich. Die Einführung ist keine vollständige Strict-/Framework-Migration und keine fachliche Abnahme. Einstellungen der GitHub-Merge-Regeln und automatische Codex-Reviews sind außerhalb dieses Datei-PRs zu aktivieren beziehungsweise zu verifizieren.

## Projektbezogene Präzisierungen und offene Punkte

- PHP 5.3.23 bleibt die deklarierte Zielkompatibilität. strict_types, native skalare/Rückgabe-Typen und moderne Syntax nicht in diesen historischen Code einführen. PHP-02/03 gelten nur soweit die deklarierte Laufzeit sie unterstützt (G-02).
- Die bestehende .php_cs-Datei und der historische Upstream-Stil bleiben erhalten. Der zusätzliche PSR-12-Check gilt für angefasste eigene Dateien. Kein Gesamtumbau, keine PHP-Upgrade-Freigabe.
- TestAsset- und _files-Verzeichnisse enthalten absichtlich spezielle Testeingaben; die bestehende Fixture-Ausnahme wird für Stilchecks erhalten. Tests auf PHP 5.x/HHVM sind hier nicht ausgeführt.

## Prüfkommandos

```sh
npm ci --prefix .quality --ignore-scripts
# BASE_SHA durch den konkreten Vergleichscommit ersetzen:
node .quality/check.mjs --base BASE_SHA
# Gezielt alle getrackten Dateien prüfen (kann Altbefunde zeigen):
node .quality/check.mjs --all
```

Der Vergleichscommit muss als echter SHA übergeben werden. `--base` prüft den eingecheckten Diff bis HEAD; uncommittete Änderungen bei Bedarf explizit mit `--files pfad/zur/datei` prüfen. Der neue Job benötigt Node 24.19 oder neuer innerhalb der 24er-Reihe; die Produktionslaufzeit bleibt unverändert.

Für PHP-Dateien ist zusätzlich PHP_CodeSniffer 4.0.4 nötig (`phpcs` im PATH oder `PHPCS_BIN`). CI installiert ihn isoliert. Warnungen bleiben sichtbar; PSR-12-Fehler blockieren.

Vorhandene ergänzende Kommandos:

- Keine vollständige automatisierte App-Testpipeline im geprüften Standardbranch nachgewiesen; im Review ausdrücklich offen halten.

Vorhandene Workflows: keine.

## Nachweis und Freigabe

Der Standards-Job liefert Belege für Anweisungsdateien, Format und anwendbare Sprachregeln im geänderten Umfang. Er ersetzt weder vollständige Typechecks/Builds noch fachliche Tests, Browserprüfungen, Kotlin-Tests oder Sicherheitsabnahmen. Fehlende Nachweise als „nicht geprüft“ ausweisen.

Codex folgt `docs/REVIEW_CHECKLIST.md`. Freigabe von Merge, Release und Livegang liegt bei David Sann. Neue Ausnahmen benötigen Regel-ID, engen Umfang, Begründung und echte Freigabereferenz; diese Einführung erfindet keine pauschal genehmigten Ausnahmen.
