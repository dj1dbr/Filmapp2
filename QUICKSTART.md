# 🚀 Filmapp - Schnellstart auf Mac

## 🎯 3 Schritte zum lokalen Start

### 1️⃣ Voraussetzungen installieren

```bash
# Homebrew (falls noch nicht installiert)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Alle benötigten Tools
brew install python@3.11 node mongodb-community@7.0
npm install -g yarn
```

### 2️⃣ App konfigurieren

```bash
# In App-Verzeichnis wechseln
cd /pfad/zu/filmapp

# API-Keys eintragen
nano backend/.env
# Fügen Sie Ihren Replicate Token ein:
# REPLICATE_API_TOKEN=r8_IhrTokenHier
```

### 3️⃣ Starten!

```bash
# Einfach ausführen
./start.sh
```

**Fertig!** Browser öffnet sich automatisch auf http://localhost:3000

---

## 🐳 Alternative: Docker (noch einfacher!)

```bash
# Docker Desktop installieren
# Download: https://www.docker.com/products/docker-desktop

# API-Keys setzen
cp .env.example .env
nano .env  # Token eintragen

# Starten
docker-compose up -d

# Fertig!
```

App läuft auf: http://localhost:3000

---

## 🛑 Stoppen

```bash
# Manuell
./stop.sh

# Docker
docker-compose down
```

---

## 📚 Vollständige Anleitung

Siehe `MAC_INSTALLATION.md` für detaillierte Informationen.

---

## ⚡ Befehle Übersicht

| Aktion | Befehl |
|--------|--------|
| Starten | `./start.sh` |
| Stoppen | `./stop.sh` |
| Backend Logs | `tail -f backend.log` |
| Frontend Logs | `tail -f frontend.log` |
| MongoDB Logs | `tail -f /usr/local/var/log/mongodb/mongo.log` |

---

## 🆘 Probleme?

```bash
# Ports freigeben
./stop.sh

# MongoDB neustarten
brew services restart mongodb-community@7.0

# Von vorne beginnen
./start.sh
```

Weitere Hilfe: siehe `MAC_INSTALLATION.md` Abschnitt "Fehlerbehebung"
