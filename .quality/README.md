# Isolierte Qualitätswerkzeuge

Die Entwicklungswerkzeuge sind getrennt von den Anwendungsabhängigkeiten installiert. `npm ci --prefix .quality --ignore-scripts` verwendet das eingecheckte Tool-Lockfile. Änderungen an Versionen benötigen ein aktualisiertes Lockfile und Kontrollproben.

`node .quality/check.mjs --base <SHA>` prüft den eingecheckten PR-Diff; `--files <relative Pfade>` prüft explizite Dateien einschließlich uncommitteter Änderungen; `--all` prüft den Bestand. Dateinamen werden als Argumente übergeben, nicht als Shell-Code ausgeführt. Nur eigene, vorhandene Dateien werden berücksichtigt; gelöschte Dateien werden nicht an Linter übergeben.

Generierte Ordner, Fremdcode, Lockfiles und minifizierte Dateien sind von der Formatprüfung ausgenommen. Projektspezifische generierte Pfade stehen in `profile.json`. Änderungen daran und an der Prüflogik benötigen ein ausdrückliches Review. Ein grüner Diff-Check belegt keine Prüfung unveränderter Anwendungsdateien. Bei Regeländerungen gezielte positive und negative Kontrollproben sowie die betroffenen Nachbarprüfungen ausführen.

Bestehende Formatkonfigurationen werden gelesen. PHPCS arbeitet nur prüfend. Es gibt weder Auto-Fixes in CI noch Deployment, Veröffentlichung oder Kundennachrichten.
