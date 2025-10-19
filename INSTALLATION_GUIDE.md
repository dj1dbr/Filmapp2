# 🎬 Paradoxon Film Generator - Installationsanleitung

## ✅ Installation erfolgreich abgeschlossen!

Die Filmapp wurde erfolgreich installiert und läuft auf:
- **Frontend**: https://dev-sandbox-74.preview.emergentagent.com
- **Backend**: http://localhost:8001
- **MongoDB**: localhost:27017

---

## 📋 Was wurde installiert?

### 1. **Backend (FastAPI)**
- Alle Python-Dependencies aus requirements.txt
- MongoDB-Verbindung konfiguriert
- API-Tokens eingerichtet:
  - ✅ Replicate API Token (aktualisiert)
  - ✅ Emergent LLM Key
  
### 2. **Frontend (React)**
- Alle Node-Dependencies installiert
- Neue Komponente hinzugefügt: **CreditsSection**
- Backend-URL konfiguriert

### 3. **Neue Features**
- ✨ **API-Credits Guthabenbereich** - Prominent auf der Startseite
- 🔗 Direkte Links zu:
  - Replicate Credits: https://replicate.com/account/billing
  - OpenAI Credits: https://platform.openai.com/account/billing
- 📊 Detaillierte Informationen zu Kosten und Verwendung
- 💡 Hilfreiche Tipps für den Einstieg

---

## 🔧 API-Token-Konfiguration

### Backend .env Datei:
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="paradoxon_film_generator"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-04a28Fd86959983Ff1
REPLICATE_API_TOKEN=r8_Lj0FlsxAHJTPzAJQNTDejbZNLqB2QyN0h4bmN
```

---

## 🎯 So verwenden Sie die App

### 1. **Demo-Modus (Kostenlos)**
- Funktioniert OHNE Credits
- Zeigt Placeholder-Videos
- Perfekt zum Testen der UI und Features
- Status: ✅ Aktuell aktiv

### 2. **Produktions-Modus (Mit Credits)**
Wenn Sie echte AI-Videos generieren möchten:

#### Schritt 1: Replicate Credits aufladen
1. Klicken Sie auf "Credits aufladen" im Replicate-Bereich
2. Erstellen Sie ein Konto bei Replicate
3. Laden Sie Guthaben auf (Start: $10-20)
4. Fertig! Die App nutzt automatisch echte Video-Generation

#### Schritt 2: OpenAI Credits (optional)
1. Klicken Sie auf "Credits aufladen" im OpenAI-Bereich
2. Erstellen Sie ein Konto bei OpenAI
3. Laden Sie Guthaben auf
4. Fügen Sie Ihren API-Key zur Backend .env hinzu
5. Restart Backend: `sudo supervisorctl restart backend`

---

## 🎨 Neue UI-Features

### Credits-Bereich zeigt:
- 💳 **Replicate** (Video-Generierung)
  - Verwendung: Generiert Videos für jede Szene
  - Kosten: ~$0.01-0.10 pro Video
  
- 🎤 **OpenAI** (Text-to-Speech)
  - Verwendung: Generiert AI-Stimmen für Dialoge
  - Kosten: ~$0.015 pro 1000 Zeichen

### Info-Banner:
- Erklärt wann Credits benötigt werden
- Zeigt an dass Demo-Modus kostenlos ist
- Gibt hilfreiche Tipps für den Einstieg

---

## 🚀 App-Features (v2.0)

### Haupt-Features:
- ✅ 9 Film-Stile (Cinematic, Realistic, Animated, etc.)
- ✅ 4 Qualitätsstufen (Low, Medium, High, Ultra)
- ✅ Vollautomatische Drehbuch-Analyse
- ✅ KI-Video-Generierung (Replicate)
- ✅ KI-Stimmen-Generierung (OpenAI TTS)
- ✅ Echtzeit-Fortschrittsanzeige
- ✅ Demo-Modus (kostenlos)
- ✅ **NEU:** Direkter Zugang zu Credit-Kauf-Seiten

### UI/UX Features:
- ✅ Drag & Drop für Drehbuch-Dateien
- ✅ Datei-Upload-Button
- ✅ Animierte Fortschrittsbalken
- ✅ Video-Vorschau mit Player
- ✅ Download-Funktion für alle Szenen
- ✅ Responsive Design

---

## 📊 Service-Status

### Backend:
```bash
sudo supervisorctl status backend
# Status: RUNNING
```

### Frontend:
```bash
sudo supervisorctl status frontend
# Status: RUNNING
```

### MongoDB:
```bash
sudo supervisorctl status mongodb
# Status: RUNNING
```

---

## 🔄 Services neu starten

```bash
# Alle Services
sudo supervisorctl restart all

# Nur Backend
sudo supervisorctl restart backend

# Nur Frontend
sudo supervisorctl restart frontend
```

---

## 📝 Beispiel-Workflow

1. **App öffnen**: https://dev-sandbox-74.preview.emergentagent.com
2. **Credits-Bereich ansehen**: Informieren Sie sich über benötigte Credits
3. **Demo testen**: Geben Sie ein Drehbuch ein und testen Sie im Demo-Modus
4. **Credits kaufen**: Wenn zufrieden, klicken Sie auf "Credits aufladen"
5. **Produktions-Videos**: Nach Credit-Kauf automatisch echte AI-Videos

---

## 🐛 Fehlerbehebung

### Backend-Logs prüfen:
```bash
tail -f /var/log/supervisor/backend.err.log
```

### Frontend-Logs prüfen:
```bash
tail -f /var/log/supervisor/frontend.out.log
```

### MongoDB-Status:
```bash
ps aux | grep mongod
```

---

## 📚 Weitere Dokumentation

- **FEATURES.md** - Vollständige Feature-Liste
- **USER_GUIDE.md** - Detailliertes Benutzerhandbuch
- **README_FILMAPP.md** - Original-README

---

## ✨ Was ist neu in dieser Installation?

### CreditsSection Komponente:
- Visuell ansprechender Bereich für API-Credits
- Zeigt beide Services (Replicate + OpenAI)
- Direkte Links zu Billing-Seiten
- Informationen zu Kosten und Verwendung
- Hilfreiche Tipps für Einsteiger
- Responsive Grid-Layout
- Animierte Hover-Effekte
- Gradient-Buttons mit Icons

### Integration:
- Prominent auf der Startseite platziert
- Über dem Drehbuch-Eingabebereich
- Full-Width Layout für maximale Sichtbarkeit
- Passt sich dem Design-System der App an

---

## 💰 Kosten-Übersicht

### Demo-Modus:
- **Kostenlos** ✅
- Zeigt Placeholder-Videos
- Alle Features testbar

### Produktions-Modus:
- **Replicate**: ~$0.01-0.10 pro Video-Szene
- **OpenAI TTS**: ~$0.015 pro 1000 Zeichen Dialog
- **Beispiel**: 5 Szenen-Film = ca. $0.50-1.00

### Empfehlung:
- Start: $10-20 Credits bei Replicate
- Start: $5-10 Credits bei OpenAI
- Ausreichend für 10-50 Test-Filme

---

## 🎉 Viel Erfolg!

Die App ist jetzt vollständig eingerichtet und bereit zur Verwendung. 

- Demo-Modus: Sofort nutzbar
- Produktions-Modus: Nach Credit-Kauf
- Support: Siehe USER_GUIDE.md

**Happy Filmmaking! 🎬**
