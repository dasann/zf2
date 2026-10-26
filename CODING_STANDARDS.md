# Coding Standards – David Sann

Version 1.0 · 23.10.2026 · Gemeinsame Grundlage für Implementierung und Review

## 1. Geltung und Verbindlichkeit

**G-01 – Norm und Team-Konvention:** PHP folgt PSR-12. Die übrigen Regeln sind festgelegte Team-Konventionen, keine Behauptung eines universellen JavaScript- oder TypeScript-Standards. „Muss“ und „keine“ sind verbindlich; ausdrücklich als Empfehlung bezeichnete Punkte sind nicht allein freigabeblockierend.

**G-02 – Projektkontext:** Laufzeiten, Frameworks, unterstützte Browser, Quellpfade, Ausnahmen und Prüfkommandos stehen in `docs/PROJECT_PROFILE.md`. Verwende ausschließlich kompatible Sprachmerkmale und APIs. Framework-Vorgaben ergänzen diese Regeln; Konflikte erfordern eine dokumentierte Entscheidung.

**G-03 – Einführung:** Neue Projekte übernehmen die anwendbaren Regeln vollständig. Bestandsprojekte erfassen Altbefunde separat und migrieren kontrolliert. Neue oder verschärfte Verstöße sind unzulässig. Eine Baseline darf bestehende, konkret erfasste Befunde abdecken; sie darf neue Fehler nicht verdecken.

**G-04 – Ausnahmen:** Eine Ausnahme nennt Regel-ID, Datei oder engen Bereich, Grund, Verantwortlichen, Freigabereferenz und gegebenenfalls Ablaufdatum. Keine pauschalen Abschaltungen, unkommentierten Suppressions oder automatisch erweiterten Baselines.

## 2. Gemeinsame Codequalität

**C-01 – Format:** UTF-8 ohne BOM, LF, abschließender Zeilenumbruch, keine unnötigen Leerzeichen. Die eingecheckte Konfiguration entscheidet über mechanische Formatierung. PHP formatiert PHP_CodeSniffer/PHPCBF; Prettier formatiert die unterstützten anderen Dateitypen. Keine konkurrierenden Formatter für dieselbe Datei.

**C-02 – Benennung:** Bezeichner und neue technische Kommentare auf Englisch; UI-Texte in der Produktsprache beziehungsweise im vorhandenen Übersetzungssystem. Namen beschreiben Aufgabe und Bedeutung. Keine neuen Abkürzungen ohne etablierten Fachbezug. Öffentliche Namen, bestehende Datenbankschemas und externe Verträge nicht aus Stilgründen umbenennen.

**C-03 – Struktur:** Funktionen und Module haben eine erkennbare Verantwortung. Abhängigkeiten werden explizit übergeben; versteckte globale Zustände und doppelte Geschäftslogik vermeiden. Keine spekulativen Abstraktionen oder willkürlichen Grenzwerte für Funktionslängen. Bei unübersichtlichem Kontrollfluss vereinfachen, sofern Verhalten und Auftrag gewahrt bleiben.

**C-04 – Kommentare:** Erkläre fachliche Gründe, Invarianten und nicht offensichtliche Einschränkungen. Kein auskommentierter Altcode, keine redundanten Zeilenbeschreibungen. TODOs benötigen einen konkreten Bezug und dürfen notwendige Fehlerbehandlung nicht ersetzen.

**C-05 – Fehler und Grenzen:** Eingaben an Vertrauensgrenzen zur Laufzeit validieren. Fehler nicht verschlucken oder als scheinbaren Erfolg zurückgeben. Fehler sinnvoll behandeln oder mit Kontext weiterreichen; dem Nutzer eine geeignete Rückmeldung geben. Fehlermeldungen und Logs dürfen keine Geheimnisse oder unnötigen personenbezogenen Daten enthalten.

**C-06 – Sicherheit:** Keine Zugangsdaten im Repository. Datenbankzugriffe parametrisieren; Ausgabe passend zum Kontext escapen. Berechtigungen serverseitig prüfen. Zustandsändernde Web-Endpunkte gegen die für ihr Authentifizierungsmodell relevanten Angriffe absichern. Sichere Framework-Mechanismen verwenden. Das ersetzt keine gesonderte Sicherheitsprüfung.

**C-07 – Abhängigkeiten:** Vorhandenen Paketmanager verwenden und zugehörige Lockfiles aktualisieren. Installationen in CI reproduzierbar aus dem Lockfile ausführen. Keine inkompatiblen Versionen mit `--force` oder `--legacy-peer-deps` erzwingen. Updates getrennt vom eigentlichen Auftrag halten, wenn sie nicht notwendig sind.

**C-08 – Tests:** Verhaltensänderungen anhand relevanter Akzeptanzkriterien prüfen. Bei behobenen Fehlern einen passenden Regressionstest ergänzen, wenn er das Risiko sinnvoll absichert. Kritische Fehlerpfade und Seiteneffekte berücksichtigen. Keine willkürliche Coverage-Quote, keine wirkungslosen Tests oder Snapshots ohne überprüften Inhalt.

## 3. PHP

**PHP-01 – PSR-12:** PSR-12 einschließlich der eingebundenen PSR-1-Regeln ist verbindlich. Vier Leerzeichen, keine Tabs; Klassen- und Methodennamen gemäß PSR; Sichtbarkeiten explizit. Klassen- und Methodenklammern stehen in der nächsten Zeile, Kontrollstrukturklammern in derselben. Reine PHP-Dateien haben kein schließendes PHP-Tag. Für Details gilt die Originalnorm.

PSR-12 enthält **keine harte maximale Zeilenlänge**. 120 Zeichen sind eine weiche Grenze; möglichst etwa 80 Zeichen ist die Empfehlung. Lange, nicht sinnvoll teilbare Ausdrücke werden nicht allein deshalb blockiert. Ein Wechsel zu PER Coding Style erfolgt nicht automatisch.

**PHP-02 – Zusätzliche Team-Regel:** Neue, selbst verwaltete PHP-Quelldateien verwenden `declare(strict_types=1);`. Bei Änderungen an bestehenden Dateien zuerst Aufrufverhalten und mögliche Typumwandlungen prüfen; nicht blind ergänzen. Ausnahmen für Templates oder Framework-Schnittstellen werden im Profil beschrieben. Diese Vorgabe gehört nicht zu PSR-12.

**PHP-03 – Typen:** Parameter, Rückgaben und Properties erhalten möglichst präzise, zur Zielversion passende native Typen. `mixed` nur bei einer tatsächlichen offenen Grenze, anschließend prüfen und eingrenzen. PHPDoc ergänzt Informationen wie Generics, Array-Shapes oder fachliche Bedingungen; es dupliziert keine offensichtlich identischen Typen.

**PHP-04 – Vergleiche und Fehler:** Strikte Vergleiche bevorzugen; notwendige Typumwandlungen explizit und nachvollziehbar behandeln. Keine Fehlerunterdrückung mit `@`, kein `die`/`exit` in wiederverwendbarer Geschäftslogik, keine Debug-Ausgaben im Anwendungspfad. Exceptions nur dort abfangen, wo eine sinnvolle Reaktion möglich ist.

**PHP-05 – Architektur:** Projektkonformes Autoloading, üblicherweise PSR-4; Fachlogik nicht in Templates. Konstruktorinjektion nutzen, wenn Abhängigkeiten benötigt werden. `final`, `readonly`, Enums und neuere Syntax nach Semantik und Zielversion einsetzen, nicht pauschal auf jede Klasse anwenden.

**PHP-06 – Statische Analyse:** Für neue Projekte gilt PHPStan Level 8 als Team-Einstieg. Höhere bestehende Levels bleiben erhalten. In Bestandsprojekten das erreichte Level und einen begründeten Einführungsumfang dokumentieren; neue Befunde nicht durch eine größere Baseline verstecken. Framework-Erweiterungen gezielt ergänzen.

## 4. JavaScript und TypeScript

**JS-01 – Format:** Prettier mit zwei Leerzeichen, Semikolons, einfachen Anführungszeichen in JS/TS, nachgestellten Kommas und `printWidth: 100`. JSON und JSX verwenden die für ihren Parser passende Schreibweise. `printWidth` ist ein Formatierungsziel, kein starres Zeichenlimit. Diese Auswahl ist eine Team-Konvention.

**JS-02 – Sprache und Module:** `const` als Standard, `let` bei notwendiger Neuzuweisung, kein `var`. ESM für neue kompatible Module; bestehende CommonJS-Schnittstellen gezielt erhalten. Keine Änderung von `type`, Modulauflösung oder Importpfaden allein für Stilvereinheitlichung.

**JS-03 – Kontrollfluss:** Strikte Gleichheit `===`/`!==`, geschweifte Klammern bei Kontrollstrukturen, kein `eval`, kein `debugger`, keine ungenutzten Variablen oder Imports. Absichtlich ungenutzte, durch eine Schnittstelle vorgegebene Parameter dürfen mit `_` beginnen. Kein `console.log` im Anwendungspfad; strukturierte Projektlogger verwenden. CLI-Ausgaben und bewusste Fehlerprotokollierung sind gesondert geregelt.

**JS-04 – Namen:** Variablen und Funktionen in `camelCase`, Klassen, Typen und Komponenten in `PascalCase`. Boolesche Namen müssen als Bedingung verständlich sein. Dateinamen folgen dem dokumentierten Framework-/Projektmuster; keine neuen parallelen Namensschemata.

**JS-05 – Asynchronität:** Jede Promise wird zurückgegeben, erwartet oder mit einer wirksamen Fehlerbehandlung abgeschlossen. Ein bloßes `void promise` genügt nicht. Keine asynchronen `forEach`-Callbacks mit erwarteter Wartewirkung. Parallelität nur bei unabhängigen Aufgaben; bei Requests relevante Abbruch-, Timeout- und Zustandswechsel berücksichtigen.

**JS-06 – Umgebungen:** Browser- und Node-Globals nur für die jeweiligen Dateien freischalten. Bibliotheken dürfen keine zufälligen Umgebungsglobals voraussetzen. Browserkompatibilität anhand des Projektprofils prüfen; die erfolgreiche Verarbeitung durch ESLint beweist sie nicht.

**TS-01 – Compiler:** `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride` und `noFallthroughCasesInSwitch` aktivieren. Bestehende Projekte migrieren dokumentiert nach G-03. `target`, `module`, `moduleResolution`, `lib`, `jsx` und Ausgabeoptionen bleiben auf Framework und Laufzeit abgestimmt.

**TS-02 – Sichere Typen:** Kein neues explizites `any` ohne eng begründete Ausnahme. Unbekannte externe Daten als `unknown` behandeln und validieren. Keine Non-Null-Assertions oder Typbehauptungen, die fehlende Prüfungen verdecken. TypeScript-Typen ersetzen keine Laufzeitvalidierung; `as` prüft keine Daten.

**TS-03 – Lesbare Schnittstellen:** Exportierte Fach-APIs erhalten erkennbare Parameter- und Rückgabetypen; einfache, vollständig abgeleitete Framework-Callbacks benötigen keine unnötige Annotation. `import type` für reine Typimporte. `type` für Union-/Kompositionstypen; `interface` für sinnvoll erweiterbare Objektverträge. Bestehende konsistente Muster erhalten.

**TS-04 – Linting:** ESLint Flat Config mit empfohlenen JavaScript-Regeln und `typescript-eslint` `recommendedTypeChecked`. Für TS-Dateien typgestützte Analyse aktivieren und ihre Zuordnung zum TS-Projekt sicherstellen. Eine Datei darf nicht wegen einer fehlerhaften Projektzuordnung aus der Analyse verschwinden.

**TS-05 – Ausnahmen:** Kein `@ts-ignore` oder `@ts-nocheck` im neuen eigenen Code. Wenn eine eng belegte externe Typinkonsistenz vorliegt, kann ein beschriebenes `@ts-expect-error` mit Referenz eingesetzt werden. Den tatsächlichen Grund prüfen und die Ausnahme entfernen, sobald er entfällt.

## 5. HTML, CSS und Frameworks

**WEB-01 – HTML und Bedienung:** Semantische Elemente verwenden; Links navigieren und Buttons lösen Aktionen aus. Formulare benötigen zugeordnete Beschriftungen und verständliche Fehler. Tastaturbedienung und sichtbarer Fokus dürfen durch eine Änderung nicht verloren gehen. Bilder erhalten zum Zweck passende Alternativtexte. Automatische Linter ersetzen keine Bedienprüfung.

**WEB-02 – CSS:** Vorhandene Tokens, Komponenten und Layoutkonventionen verwenden. Responsive Zustände und langen Inhalt berücksichtigen. Keine unkommentierten `!important`-Ketten oder unnötig hohe Spezifität. CSS/SCSS mit Prettier formatieren; ein vorhandener Stylelint-Standard bleibt zusätzlich maßgeblich. Kein neues CSS-Framework nur wegen dieser Regeln einführen.

**WEB-03 – Framework-Profile:** React/Next, Vue/Nuxt, Svelte, Angular, WordPress und andere Frameworks ergänzen die Basis mit ihren passenden Regeln. Beispielsweise React-Hooks und stabile Listen-Keys, frameworkkonforme Template-Prüfung sowie Grenzen zwischen Server- und Client-Code kontrollieren. Die generische ESLint-Vorlage prüft diese Framework-Regeln nicht vollständig.

**WEB-04 – Datenformate:** JSON/YAML müssen valide sein. Keine Secrets in Konfigurationsdateien. Generierte Dateien und Lockfiles nicht manuell formatieren; Änderungen mit dem zuständigen Werkzeug erzeugen.

## 6. Nachweis und Freigabe

**QA-01 – Pflichtchecks:** Für jede eingesetzte Sprache werden die zutreffenden Format-, Lint- und Typprüfungen sowie risikogerechte Tests verbindlich in CI ausgeführt. Lint/Format allein belegen keine fachliche Korrektheit. Die konkrete Zuordnung steht im Projektprofil.

**QA-02 – Keine Umgehung:** Keine still übersprungenen Prüfungen, erfolgreichen Platzhalter, `|| true`, `continue-on-error` oder `--if-present` für Pflichtchecks. Neue Ignore-Muster, geänderte Testgrenzen und deaktivierte Regeln sind Bestandteil des Reviews.

**QA-03 – Ergebnis:** Für jeden Pflichtcheck Status und Beleg dokumentieren. Fehlender Zugang, fehlende Laufzeit oder nicht ausgeführter Test bedeutet „nicht geprüft“. Ein fehlgeschlagener oder blockierter Pflichtcheck verhindert die technische Freigabe im betroffenen Umfang; reine Formatverstöße sind deshalb nicht automatisch kritische Produktfehler.

**QA-04 – Entscheidung:** Der Reviewer gibt eine Empfehlung ab. Merge-Freigabe und Livegang bleiben getrennte Entscheidungen; endgültige Freigaben liegen bei David Sann.
