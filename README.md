# 🎬 Paradoxon Film Generator v2.0

Vollautomatische KI-Filmproduktion - **Jetzt komplett lokal auf Ihrem Mac lauffähig!**

---

## 🚀 Schnellstart für Mac

```bash
# 1. Tools installieren
brew install python@3.11 node mongodb-community@7.0
npm install -g yarn

# 2. App starten
./start.sh
```

**Fertig!** → http://localhost:3000

📖 **Vollständige Anleitung:** [MAC_INSTALLATION.md](MAC_INSTALLATION.md)  
⚡ **Schnellstart:** [QUICKSTART.md](QUICKSTART.md)

---

## ✨ Was ist neu?

### 🖥️ Komplett lokale Installation
- ✅ Läuft vollständig auf Ihrem Mac
- ✅ Keine Abhängigkeit von Emergent-Plattform
- ✅ Eigene MongoDB-Datenbank
- ✅ Lokaler Backend-Server
- ✅ Lokales Frontend

### 🎬 Filmproduktions-Features
- ✅ 9 Film-Stile (Cinematic, Sci-Fi, Anime, etc.)
- ✅ 4 Qualitätsstufen (Low bis Ultra 4K)
- ✅ Drehbuch-Parsing mit INT./EXT.
- ✅ KI-Video-Generierung (Replicate)
- ✅ KI-Stimmen-Generierung (OpenAI TTS)

### 💰 Neue UI-Features
- ✅ Kostenschätzung in Echtzeit
- ✅ Einstellungen für API-Keys
- ✅ Download-Button für fertige Filme
- ✅ Credit-Management
- ✅ Demo-Modus (kostenlos)

---

## 📦 Installations-Optionen

### Option 1: Automatisches Setup (Empfohlen)

```bash
./start.sh
```

Das Script:
- ✅ Prüft alle Voraussetzungen
- ✅ Installiert fehlende Dependencies
- ✅ Startet alle Services automatisch
- ✅ Öffnet Browser

### Option 2: Docker

```bash
# API-Keys konfigurieren
cp .env.example .env
nano .env

# Starten
docker-compose up -d
```

### Option 3: Manuell

Siehe [MAC_INSTALLATION.md](MAC_INSTALLATION.md) für Schritt-für-Schritt Anleitung.

---

## 🎯 Features

| Feature | Beschreibung |
|---------|--------------|
| **9 Film-Stile** | Cinematic, Realistic, Animated, Noir, Sci-Fi, Horror, Fantasy, Documentary, Anime |
| **4 Qualitäten** | Low (768p), Medium (1024p), High (720p HD), Ultra (1080p Full HD) |
| **Kostenschätzung** | Automatische Berechnung der API-Kosten |
| **Einstellungen** | API-Key-Verwaltung für Replicate & OpenAI |
| **Download** | Alle generierten Videos herunterladen |
| **Demo-Modus** | Kostenlos testen ohne Credits |

---

## 🔧 Benötigte API-Keys

### Replicate (Video-Generierung)
- Registrierung: https://replicate.com
- Token: https://replicate.com/account/api-tokens
- Kosten: ~$0.01-0.10 pro Video

### OpenAI (TTS - Optional)
- Registrierung: https://platform.openai.com
- API-Key: https://platform.openai.com/api-keys
- Kosten: ~$0.015 pro 1000 Zeichen

---

## 📊 Kosten-Beispiel

| Projekt | Szenen | Qualität | Kosten (ca.) |
|---------|--------|----------|--------------|
| Kurz-Film | 3 | Medium | $0.10 |
| Standard-Film | 10 | Medium | $0.50 |
| Langer Film | 20 | High | $2.00 |

**Demo-Modus:** Kostenlos zum Testen!

---

## 🛠️ Tech Stack

- **Backend:** FastAPI (Python 3.11+)
- **Frontend:** React 19 + Tailwind CSS
- **Database:** MongoDB 7.0
- **AI:** Replicate + OpenAI
- **Platform:** Mac, Linux, Windows (Docker)

---

## 📂 Projektstruktur

```
Filmapp/
├── backend/              # FastAPI Backend
│   ├── modules/         # AI-Module
│   ├── server.py        # Haupt-API
│   └── .env            # Backend Config
├── frontend/            # React Frontend
│   ├── src/            # React Components
│   └── .env           # Frontend Config
├── docker-compose.yml   # Docker Setup
├── start.sh            # Mac Start-Script
├── stop.sh             # Mac Stop-Script
└── MAC_INSTALLATION.md # Vollständige Anleitung
```

---

## 🎮 Verwendung

### 1. Drehbuch schreiben

```
INT. COFFEE SHOP - MORGEN

KAMERA: Medium shot
LICHT: Warmes Morgenlicht
SOUND: Café-Atmosphäre

SARAH sitzt am Fenster und liest.

SARAH
Perfekter Start in den Tag!
```

### 2. Einstellungen konfigurieren
- Stil wählen (z.B. Cinematic)
- Qualität wählen (z.B. Medium)
- Kosten prüfen

### 3. Film generieren
- "Film generieren" klicken
- Fortschritt in Echtzeit beobachten
- Videos ansehen

### 4. Herunterladen
- "Film herunterladen" Button
- Alle Szenen als separate Videos

---

## 🔄 Services verwalten

### Starten
```bash
./start.sh
```

### Stoppen
```bash
./stop.sh
```

### Logs
```bash
# Backend
tail -f backend.log

# Frontend
tail -f frontend.log

# MongoDB
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Status prüfen
```bash
# Alle Services
brew services list

# Ports prüfen
lsof -i :3000,8001,27017
```

---

## 🐛 Fehlerbehebung

### Probleme beim Start

```bash
# Services stoppen und neu starten
./stop.sh
./start.sh
```

### MongoDB Probleme

```bash
# MongoDB neustarten
brew services restart mongodb-community@7.0

# Logs prüfen
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Port bereits belegt

```bash
# Ports freigeben
lsof -ti:8001 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**Weitere Hilfe:** [MAC_INSTALLATION.md](MAC_INSTALLATION.md) → Abschnitt "Fehlerbehebung"

---

## 📚 Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| [QUICKSTART.md](QUICKSTART.md) | 3-Schritte Schnellstart |
| [MAC_INSTALLATION.md](MAC_INSTALLATION.md) | Vollständige Mac-Anleitung |
| [FEATURES.md](FEATURES.md) | Feature-Liste |
| [USER_GUIDE.md](USER_GUIDE.md) | Benutzerhandbuch |
| [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) | Emergent-Installation |

---

## ⚡ URLs (Nach Start)

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8001
- **API Docs:** http://localhost:8001/docs
- **MongoDB:** localhost:27017

---

## 🎉 Features im Detail

### Kostenschätzung 💰
- Echtzeit-Berechnung während Eingabe
- Berücksichtigt Szenenanzahl und Qualität
- Zeigt Video- und TTS-Kosten separat

### Einstellungen ⚙️
- API-Key-Verwaltung
- Replicate Token eingeben
- OpenAI Key eingeben
- Sicherer Password-Input

### Download-Funktion 📥
- Erscheint nach Fertigstellung
- Download aller Videos
- Öffnet in separaten Tabs
- Zeigt Szenenanzahl

---

## 💡 Tipps

### Für beste Ergebnisse
- Detaillierte Drehbücher schreiben
- KAMERA-, LICHT-, SOUND-Anweisungen nutzen
- Mit Demo-Modus testen
- Medium-Qualität für Start empfohlen

### Kosten sparen
- Demo-Modus zum Testen nutzen
- Mit Lower Quality starten
- Kürzere Drehbücher
- Szenenanzahl optimieren

---

## 🔒 Sicherheit & Datenschutz

### Lokale Installation
- ✅ Alle Daten bleiben auf Ihrem Mac
- ✅ Keine Datenübertragung zu Emergent
- ✅ MongoDB nur lokal erreichbar
- ✅ API-Keys bleiben privat

### API-Keys
- ⚠️ Nie in Git committen
- ⚠️ In .env Dateien speichern
- ⚠️ .env ist in .gitignore

---

## 🤝 Support

### Bei Problemen:
1. Logs prüfen (`tail -f *.log`)
2. [MAC_INSTALLATION.md](MAC_INSTALLATION.md) konsultieren
3. Services neu starten (`./stop.sh && ./start.sh`)
4. MongoDB-Status prüfen

---

## 📈 System-Anforderungen

### Minimal
- macOS 10.15+
- 4 GB RAM
- 2 GB freier Speicher
- Stabile Internetverbindung

### Empfohlen
- macOS 12+
- 8 GB RAM
- 5 GB freier Speicher
- Schnelle Internetverbindung

---

## 🎬 Los geht's!

```bash
# 1. In Projektverzeichnis wechseln
cd /pfad/zu/Filmapp

# 2. Starten
./start.sh

# 3. Browser öffnet automatisch
# http://localhost:3000
```

**Happy Filmmaking! 🎥**

---

**Version:** 2.0.0  
**Status:** ✅ Lokal lauffähig auf Mac  
**Plattform:** Unabhängig von Emergent  
**Lizenz:** Persönlicher & Kommerzieller Gebrauch
