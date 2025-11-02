#!/bin/bash

# Filmapp Stop Script für Mac

echo "🛑 Stoppe Filmapp Services..."
echo ""

# Farben
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Stoppe Backend (Port 8001)
if lsof -ti:8001 >/dev/null 2>&1; then
    echo "Stoppe Backend (Port 8001)..."
    lsof -ti:8001 | xargs kill -9
    echo -e "${GREEN}✓${NC} Backend gestoppt"
else
    echo "Backend läuft nicht"
fi

# Stoppe Frontend (Port 3000)
if lsof -ti:3000 >/dev/null 2>&1; then
    echo "Stoppe Frontend (Port 3000)..."
    lsof -ti:3000 | xargs kill -9
    echo -e "${GREEN}✓${NC} Frontend gestoppt"
else
    echo "Frontend läuft nicht"
fi

# Optional: MongoDB stoppen
read -p "MongoDB auch stoppen? (j/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Jj]$ ]]; then
    brew services stop mongodb-community@7.0
    echo -e "${GREEN}✓${NC} MongoDB gestoppt"
fi

echo ""
echo "✅ Alle Services gestoppt!"
