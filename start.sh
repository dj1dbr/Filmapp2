#!/bin/bash

# Filmapp Starter Script für Mac
# Dieses Script startet alle Services automatisch

echo "🎬 Paradoxon Film Generator Starter"
echo "===================================="
echo ""

# Farben für Output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funktion: Prüfe ob Befehl existiert
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Funktion: Prüfe ob Port belegt ist
port_in_use() {
    lsof -i :"$1" >/dev/null 2>&1
}

echo "📋 Prüfe Systemvoraussetzungen..."
echo ""

# Prüfe Python
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} Python: $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} Python nicht gefunden!"
    echo "   Installation: brew install python@3.11"
    exit 1
fi

# Prüfe Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js nicht gefunden!"
    echo "   Installation: brew install node"
    exit 1
fi

# Prüfe Yarn
if command_exists yarn; then
    YARN_VERSION=$(yarn --version)
    echo -e "${GREEN}✓${NC} Yarn: v$YARN_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Yarn nicht gefunden, installiere..."
    npm install -g yarn
fi

# Prüfe MongoDB
if command_exists mongod; then
    echo -e "${GREEN}✓${NC} MongoDB installiert"
else
    echo -e "${RED}✗${NC} MongoDB nicht gefunden!"
    echo "   Installation: brew tap mongodb/brew && brew install mongodb-community@7.0"
    exit 1
fi

echo ""
echo "📦 Prüfe und installiere Dependencies..."
echo ""

# Backend Dependencies
if [ ! -d "backend/venv" ]; then
    echo "Erstelle Python Virtual Environment..."
    cd backend
    python3 -m venv venv
    cd ..
fi

echo "Installiere Backend Dependencies..."
cd backend
source venv/bin/activate
pip install -q -r requirements.txt
cd ..
echo -e "${GREEN}✓${NC} Backend Dependencies installiert"

# Frontend Dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo "Installiere Frontend Dependencies..."
    cd frontend
    yarn install --silent
    cd ..
    echo -e "${GREEN}✓${NC} Frontend Dependencies installiert"
else
    echo -e "${GREEN}✓${NC} Frontend Dependencies bereits installiert"
fi

echo ""
echo "🔧 Prüfe Konfiguration..."
echo ""

# Prüfe Backend .env
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠${NC} backend/.env nicht gefunden, erstelle Template..."
    cat > backend/.env << EOF
MONGO_URL="mongodb://localhost:27017"
DB_NAME="paradoxon_film_generator"
CORS_ORIGINS="http://localhost:3000"
REPLICATE_API_TOKEN=your_replicate_token_here
OPENAI_API_KEY=your_openai_key_here
EMERGENT_LLM_KEY=
EOF
    echo -e "${YELLOW}⚠${NC} Bitte API-Keys in backend/.env eintragen!"
else
    echo -e "${GREEN}✓${NC} backend/.env gefunden"
fi

# Prüfe Frontend .env
if [ ! -f "frontend/.env" ]; then
    echo "Erstelle frontend/.env..."
    cat > frontend/.env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
PORT=3000
EOF
fi
echo -e "${GREEN}✓${NC} frontend/.env konfiguriert"

echo ""
echo "🚀 Starte Services..."
echo ""

# Prüfe Ports
if port_in_use 8001; then
    echo -e "${YELLOW}⚠${NC} Port 8001 bereits belegt, versuche zu beenden..."
    lsof -ti:8001 | xargs kill -9 2>/dev/null
    sleep 2
fi

if port_in_use 3000; then
    echo -e "${YELLOW}⚠${NC} Port 3000 bereits belegt, versuche zu beenden..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Starte MongoDB
echo "Starte MongoDB..."
if brew services list | grep mongodb-community | grep started >/dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB läuft bereits"
else
    brew services start mongodb-community@7.0
    sleep 3
    echo -e "${GREEN}✓${NC} MongoDB gestartet"
fi

# Starte Backend
echo "Starte Backend auf Port 8001..."
cd backend
source venv/bin/activate
nohup uvicorn server:app --host 0.0.0.0 --port 8001 --reload > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Prüfe ob Backend läuft
if curl -s http://localhost:8001/api/ > /dev/null; then
    echo -e "${GREEN}✓${NC} Backend läuft (PID: $BACKEND_PID)"
else
    echo -e "${RED}✗${NC} Backend konnte nicht gestartet werden"
    echo "   Logs: tail -f backend.log"
    exit 1
fi

# Starte Frontend
echo "Starte Frontend auf Port 3000..."
cd frontend
nohup yarn start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
sleep 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Filmapp erfolgreich gestartet!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8001"
echo "   API Docs:  http://localhost:8001/docs"
echo "   MongoDB:   localhost:27017"
echo ""
echo "📝 Process IDs:"
echo "   Backend:   $BACKEND_PID"
echo "   Frontend:  $FRONTEND_PID"
echo ""
echo "📊 Logs:"
echo "   Backend:   tail -f backend.log"
echo "   Frontend:  tail -f frontend.log"
echo ""
echo "🛑 Zum Stoppen:"
echo "   ./stop.sh"
echo "   oder: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Öffne automatisch Browser in 3 Sekunden..."
sleep 3
open http://localhost:3000
