# PlantCare 🌿

PlantCare: Die App, die deiner Pflanze erzählt, sie sei ein WLAN-Router. Sie misst Blatt-Launen, sendet Wurzelhoroskope und erinnert dich mit „Gieß mich vielleicht… oder nicht." Einmal tippen, zweimal verwirren. Funktioniert nur, wenn die Pflanze zustimmt. 🌿🤪

## React Native Expo App

Dies ist eine mobile App für die Pflanzenpflege, entwickelt mit React Native und Expo.

## Voraussetzungen

- Node.js (v20 oder höher)
- npm oder yarn
- Expo Go App auf deinem Smartphone (für Live-Testing)

## Installation

1. Klone das Repository:
```bash
git clone https://github.com/Kenji839/plantCare.git
cd plantCare
```

2. Installiere die Abhängigkeiten:
```bash
npm install
```

## Entwicklung

### App starten

```bash
npm start
```

Dies öffnet den Expo Developer Tools. Du kannst die App dann auf verschiedenen Plattformen testen:

- **iOS**: Drücke `i` oder scanne den QR-Code mit der Expo Go App
- **Android**: Drücke `a` oder scanne den QR-Code mit der Expo Go App
- **Web**: Drücke `w` um die App im Browser zu öffnen

### Verfügbare Scripts

- `npm start` - Startet den Expo Development Server
- `npm run android` - Startet die App auf Android
- `npm run ios` - Startet die App auf iOS (nur macOS)
- `npm run web` - Startet die App im Browser

## Projektstruktur

```
plantCare/
├── App.js                 # Hauptkomponente der App
├── app.json              # Expo-Konfiguration
├── package.json          # npm-Abhängigkeiten
├── babel.config.js       # Babel-Konfiguration
├── assets/               # Bilder, Icons, etc.
├── src/
│   ├── components/       # Wiederverwendbare Komponenten
│   ├── screens/          # App-Bildschirme
│   └── utils/            # Hilfsfunktionen
└── README.md
```

## Technologie-Stack

- **React Native**: Framework für mobile Apps
- **Expo**: Entwicklungsplattform für React Native
- **JavaScript/ES6+**: Programmiersprache

## Nächste Schritte

- [ ] Navigation hinzufügen (React Navigation)
- [ ] State Management implementieren (Context API oder Redux)
- [ ] Backend-Integration
- [ ] UI-Komponenten-Bibliothek integrieren
- [ ] Authentifizierung
- [ ] Pflanzendatenbank

## Beitragen

Contributions sind willkommen! Bitte erstelle einen Pull Request.

## Lizenz

Siehe LICENSE Datei für Details.
