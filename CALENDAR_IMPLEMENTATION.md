# Kalender-Funktion in der Pflanzen-Detailansicht

## Übersicht

Die Pflanzen-Detailansicht wurde mit einer vollständigen Kalenderfunktion erweitert, die dem Nutzer hilft, die Gießtermine und andere Pflegeaufgaben für seine Pflanzen zu planen und zu verfolgen.

## Funktionen

### 1. Kalender-Komponente (`Calendar.js`)

Der Kalender zeigt eine monatliche Ansicht mit folgenden Features:

- **Monatsnavigation**: Vor- und Zurück-Buttons zum Wechseln zwischen Monaten
- **Wochentage**: Deutsche Abkürzungen (Mo, Di, Mi, Do, Fr, Sa, So)
- **Tagesanzeige**: 
  - Aktuelle Monatstage werden normal angezeigt
  - Vorherige/Nächste Monatstage sind ausgegraut
  - Der heutige Tag hat einen grünen Rand
  - Der ausgewählte Tag hat einen grünen Hintergrund
- **Aufgaben-Indikatoren**: Kleine grüne Punkte unter Tagen, an denen Aufgaben fällig sind
- **Interaktivität**: Antippen eines Tages zeigt die Aufgaben für diesen Tag an

### 2. Aufgaben-Zusammenfassung (`TaskSummary.js`)

Die Aufgaben-Zusammenfassung zeigt:

- **Ausgewählter Tag**: Wenn ein Tag ausgewählt ist, werden alle Aufgaben für diesen Tag angezeigt
- **Kommende Woche**: Wenn kein Tag ausgewählt ist, werden alle Aufgaben der kommenden 7 Tage gruppiert nach Datum angezeigt
- **Aufgaben-Details**:
  - Symbol (💧 für Gießen, ☀️ für Licht, ✂️ für Beschneiden)
  - Aufgaben-Typ
  - Aufgaben-Titel
  - Zeitangabe ("Heute", "Morgen", "In X Tagen", "Überfällig")

### 3. Integration in PlantDetailScreen

Die Kalender- und Aufgaben-Komponenten wurden nahtlos in die Pflanzen-Detailansicht integriert:

```
┌─────────────────────────────────┐
│     Pflanzenbild (Header)       │
│  [← Zurück]        [⋮ Menü]     │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│         Kalenderansicht         │
│  [‹ November 2025 ›]            │
│  Mo Di Mi Do Fr Sa So           │
│   1  2  3  4  5  6  7          │
│   •     •           •           │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│    Anstehende Aufgaben          │
│  ┌───────────────────────────┐  │
│  │ Do, 7. Nov     Heute      │  │
│  │ 💧 Gießen                 │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│      Pflanzeninformationen      │
└─────────────────────────────────┘
```

## Technische Details

### Datumsberechnung

Der Kalender berechnet automatisch:
- Erste und letzte Tage des Monats
- Anzahl der Tage im Monat
- Platzierung der Tage (Montag-basierte Woche)
- Aufgaben, die an einem bestimmten Tag fällig sind

### Aufgaben-Filterung

Die Aufgaben werden nach dem `nextDueDate` Feld gefiltert:
```javascript
const tasksForDate = tasks.filter(task => {
  const taskDate = new Date(task.nextDueDate);
  return taskDate.getDate() === selectedDate.getDate();
});
```

### State Management

Die Komponenten verwenden React State für:
- `currentMonth`: Der aktuell angezeigte Monat
- `selectedDate`: Das aktuell ausgewählte Datum
- `tasks`: Die Liste der Aufgaben für die Pflanze

## Benutzerinteraktion

1. **Monat wechseln**: Nutzer können mit den ‹ und › Buttons zwischen Monaten navigieren
2. **Tag auswählen**: Antippen eines Tages zeigt die Aufgaben für diesen Tag
3. **Aufgabe erledigen**: Antippen einer Aufgabe öffnet einen Dialog zum Markieren als erledigt
4. **Visuelle Hinweise**: 
   - Grüne Punkte zeigen Tage mit Aufgaben
   - Grüner Rahmen markiert heute
   - Grüner Hintergrund markiert den ausgewählten Tag

## Beispiel-Szenarien

### Szenario 1: Monstera mit Gießintervall alle 7 Tage
- Pflanze wurde am 1. November hinzugefügt
- Nächster Gießtermin: 8. November
- Der Kalender zeigt einen grünen Punkt am 8., 15., 22., 29. November

### Szenario 2: Rose mit Gießintervall alle 3 Tage
- Pflanze wurde am 1. November hinzugefügt
- Gießtermine: 4., 7., 10., 13., 16., 19., 22., 25., 28. November
- Der Kalender zeigt grüne Punkte an allen diesen Tagen

## Erweiterungsmöglichkeiten

Zukünftige Verbesserungen könnten beinhalten:
- Verschiedene Farben für verschiedene Aufgabentypen
- Mehrere Aufgaben pro Tag (gestapelte Punkte)
- Wischgesten zum Monatswechsel
- Langzeitansicht (Jahresübersicht)
- Export der Aufgaben als Kalender-Datei (ICS)

## Code-Qualität

✅ Alle Dateien sind syntaktisch korrekt
✅ Keine Sicherheitsprobleme gefunden (CodeQL)
✅ Code-Review durchgeführt und Feedback umgesetzt
✅ Komponenten sind wiederverwendbar und gut dokumentiert
✅ Deutsche Lokalisierung für alle Benutzer-sichtbaren Texte
