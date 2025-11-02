# 🎬 Paradoxon Film Generator - Lokale Mac Installation

Vollständige Anleitung zur Installation und Ausführung der App auf Ihrem Mac - komplett unabhängig von Emergent.

---

## 📋 Voraussetzungen

### 1. Homebrew installieren (falls noch nicht vorhanden)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Benötigte Software

```bash
# Python 3.11+
brew install python@3.11

# Node.js und npm
brew install node

# Yarn
npm install -g yarn

# MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0
```

---

## 🚀 Schnellstart (Empfohlen)

### Option A: Mit Docker (Einfachste Methode)

1. **Docker Desktop installieren:**
   - Download: https://www.docker.com/products/docker-desktop
   - Installieren und starten

2. **App starten:**
```bash
cd /pfad/zu/filmapp
docker-compose up -d
```

3. **Fertig!**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8001
   - MongoDB: localhost:27017

### Option B: Manuell (Volle Kontrolle)

Folgen Sie der detaillierten Anleitung unten.

---

## 📦 Installation (Manuell)

### Schritt 1: Repository klonen

```bash
# Repository klonen
git clone https://github.com/dj1dbr/Filmapp.git
cd Filmapp

# Oder wenn bereits geklont
cd /pfad/zu/filmapp
```

### Schritt 2: Backend einrichten

```bash
# In Backend-Ordner wechseln
cd backend

# Virtuelle Python-Umgebung erstellen
python3 -m venv venv

# Virtuelle Umgebung aktivieren
source venv/bin/activate

# Dependencies installieren
pip install -r requirements.txt

# .env Datei erstellen
cat > .env << EOF
MONGO_URL="mongodb://localhost:27017"
DB_NAME="paradoxon_film_generator"
CORS_ORIGINS="http://localhost:3000"
REPLICATE_API_TOKEN=r8_Lj0FlsxAHJTPzAJQNTDejbZNLqB2QyN0h4bmN
EMERGENT_LLM_KEY=your_key_here_or_use_openai_directly
EOF
```

### Schritt 3: Frontend einrichten

```bash
# In Frontend-Ordner wechseln (neues Terminal)
cd frontend

# Dependencies installieren
yarn install

# .env Datei erstellen
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
PORT=3000
EOF
```

### Schritt 4: MongoDB starten

```bash
# MongoDB als Service starten
brew services start mongodb-community@7.0

# Oder manuell starten
mongod --config /usr/local/etc/mongod.conf

# Status prüfen
brew services list | grep mongodb
```

---

## 🎮 App starten

### Terminal 1: Backend starten

```bash
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Erwartete Ausgabe:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Terminal 2: Frontend starten

```bash
cd frontend
yarn start
```

**Erwartete Ausgabe:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
```

---

## 🔧 API-Keys konfigurieren

### Replicate (Video-Generierung)

1. Gehen Sie zu: https://replicate.com/account/api-tokens
2. Erstellen Sie einen API Token
3. Fügen Sie ihn in `backend/.env` ein:
```bash
REPLICATE_API_TOKEN=r8_IhrTokenHier
```

### OpenAI (Text-to-Speech) - Optional

1. Gehen Sie zu: https://platform.openai.com/api-keys
2. Erstellen Sie einen API Key
3. Fügen Sie ihn in `backend/.env` ein:
```bash
OPENAI_API_KEY=sk-IhrKeyHier
```

4. Passen Sie `backend/modules/voice_ai.py` an:
```python
# Statt Emergent LLM verwenden Sie OpenAI direkt
from openai import OpenAI
client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
```

---

## 🐳 Docker Setup (Alternative)

### docker-compose.yml erstellen

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: filmapp-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=paradoxon_film_generator

  backend:
    build: ./backend
    container_name: filmapp-backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=paradoxon_film_generator
      - CORS_ORIGINS=http://localhost:3000
      - REPLICATE_API_TOKEN=${REPLICATE_API_TOKEN}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - mongodb
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    container_name: filmapp-frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongodb_data:
```

### Docker starten

```bash
# Erstellen Sie .env im Root-Verzeichnis
echo "REPLICATE_API_TOKEN=r8_IhrToken" > .env
echo "OPENAI_API_KEY=sk_IhrKey" >> .env

# Starten
docker-compose up -d

# Logs ansehen
docker-compose logs -f

# Stoppen
docker-compose down
```

---

## 📝 Nützliche Befehle

### MongoDB

```bash
# Status prüfen
brew services list | grep mongodb

# Starten
brew services start mongodb-community@7.0

# Stoppen
brew services stop mongodb-community@7.0

# Neustarten
brew services restart mongodb-community@7.0

# MongoDB Shell öffnen
mongosh

# Datenbank ansehen
mongosh
> use paradoxon_film_generator
> db.film_jobs.find()
```

### Backend

```bash
# Server starten (Development)
cd backend
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Server testen
curl http://localhost:8001/api/

# Dependencies aktualisieren
pip freeze > requirements.txt
```

### Frontend

```bash
# Development Server starten
yarn start

# Production Build erstellen
yarn build

# Dependencies aktualisieren
yarn upgrade

# Port ändern
PORT=3001 yarn start
```

---

## 🔍 Fehlerbehebung

### Problem: MongoDB startet nicht

```bash
# Logs prüfen
tail -f /usr/local/var/log/mongodb/mongo.log

# Datenbank-Ordner Berechtigungen
sudo chown -R $(whoami) /usr/local/var/mongodb

# Config neu laden
brew services restart mongodb-community@7.0
```

### Problem: Port bereits belegt

```bash
# Port 8001 freigeben (Backend)
lsof -ti:8001 | xargs kill -9

# Port 3000 freigeben (Frontend)
lsof -ti:3000 | xargs kill -9
```

### Problem: Python Dependencies fehlen

```bash
cd backend
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Problem: Node Dependencies fehlen

```bash
cd frontend
rm -rf node_modules
rm yarn.lock
yarn install
```

---

## 🎯 App-URLs

Nach erfolgreichem Start:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001
- **API Docs:** http://localhost:8001/docs (Swagger)
- **MongoDB:** localhost:27017

---

## 📂 Projektstruktur

```
Filmapp/
├── backend/
│   ├── modules/              # Backend-Module
│   ├── server.py            # Haupt-API
│   ├── requirements.txt     # Python Dependencies
│   ├── .env                 # Umgebungsvariablen
│   └── venv/               # Python Virtual Environment
├── frontend/
│   ├── src/                # React Source Code
│   ├── public/             # Static Files
│   ├── package.json        # Node Dependencies
│   └── .env               # Frontend Umgebungsvariablen
├── docker-compose.yml      # Docker Setup
└── MAC_INSTALLATION.md    # Diese Datei
```

---

## 🔐 Sicherheit

### Für lokale Entwicklung:

- MongoDB läuft ohne Authentifizierung (nur localhost)
- CORS erlaubt nur localhost:3000
- API-Keys in .env (nicht committen!)

### Für Produktion:

1. MongoDB mit Authentifizierung:
```bash
# mongod.conf anpassen
security:
  authorization: enabled
```

2. HTTPS verwenden
3. Environment-Variablen sicher speichern
4. Firewall-Regeln setzen

---

## 💡 Tipps

### Performance

```bash
# Backend mit mehreren Workers starten
uvicorn server:app --workers 4 --host 0.0.0.0 --port 8001

# Frontend Production Build
cd frontend
yarn build
serve -s build -l 3000
```

### Development

```bash
# Hot-Reload für Backend
watchmedo auto-restart --directory=./backend --pattern=*.py --recursive -- uvicorn server:app --reload

# Frontend mit anderem Port
PORT=3001 yarn start
```

---

## 📱 Mobile/Tablet Zugriff

Um von anderen Geräten im gleichen Netzwerk zuzugreifen:

1. Finden Sie Ihre Mac IP:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Backend starten mit:
```bash
uvicorn server:app --host 0.0.0.0 --port 8001
```

3. Zugriff von anderen Geräten:
```
http://IhreIP:3000  (Frontend)
http://IhreIP:8001  (Backend)
```

4. CORS in `backend/.env` anpassen:
```bash
CORS_ORIGINS="http://localhost:3000,http://IhreIP:3000"
```

---

## 🆘 Support

### Logs prüfen

```bash
# MongoDB Logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Backend Logs (im Terminal)
# Frontend Logs (im Terminal oder Browser Console)
```

### System-Info

```bash
# Python Version
python3 --version

# Node Version
node --version

# MongoDB Version
mongod --version

# Verfügbare Ports
lsof -i :3000,8001,27017
```

---

## ✅ Checkliste

- [ ] Homebrew installiert
- [ ] Python 3.11+ installiert
- [ ] Node.js installiert
- [ ] Yarn installiert
- [ ] MongoDB installiert und läuft
- [ ] Backend Dependencies installiert
- [ ] Frontend Dependencies installiert
- [ ] .env Dateien erstellt
- [ ] API-Keys eingetragen
- [ ] Backend läuft auf :8001
- [ ] Frontend läuft auf :3000
- [ ] App im Browser geöffnet

---

## 🎉 Fertig!

Ihre App läuft jetzt komplett lokal auf Ihrem Mac!

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:8001/docs

Viel Spaß beim Filme machen! 🎬
