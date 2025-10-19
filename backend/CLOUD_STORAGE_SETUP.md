# Cloud Storage Integration - Setup Guide

## Overview

Der Paradoxon Film Generator unterstützt Cloud-Speicher für die langfristige Speicherung von generierten Videos.

**Aktueller Status:**
- ✅ **Option C implementiert**: Direkt-Streaming von Replicate-URLs
- 🔧 **Option B vorbereitet**: Cloud-Speicher-Infrastruktur (AWS S3, Google Cloud Storage, Azure Blob)

## Aktuelles System (Option C)

Videos werden direkt von Replicate gestreamt:
- Keine lokale Speicherung erforderlich
- Videos über Replicate-URLs verfügbar
- Automatische Bereinigung durch Replicate

**Vorteile:**
- Keine zusätzlichen Speicherkosten
- Sofort verfügbar
- Keine Infrastruktur-Verwaltung

**Nachteile:**
- Videos werden nach einiger Zeit von Replicate gelöscht
- Abhängigkeit von Replicate-Verfügbarkeit

## Cloud-Speicher Integration (Option B)

### AWS S3 Setup

#### 1. AWS-Konfiguration

```bash
# Installieren Sie boto3
pip install boto3
```

#### 2. AWS-Credentials einrichten

Fügen Sie zu `/app/backend/.env` hinzu:

```env
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
```

#### 3. Cloud-Speicher aktivieren

In `/app/backend/server.py` auskommentieren:

```python
export_module.enable_cloud_storage('aws_s3', {
    'bucket_name': os.environ.get('AWS_S3_BUCKET'),
    'region': os.environ.get('AWS_REGION'),
    'access_key': os.environ.get('AWS_ACCESS_KEY'),
    'secret_key': os.environ.get('AWS_SECRET_KEY')
})
```

#### 4. Implementierung aktivieren

In `/app/backend/modules/cloud_storage.py`:
- Auskommentieren der AWS S3 Upload-Implementierung
- `pip install boto3` ausführen
- Backend neu starten

### Google Cloud Storage Setup

#### 1. GCS-Konfiguration

```bash
pip install google-cloud-storage
```

#### 2. Service Account erstellen

1. Gehen Sie zu Google Cloud Console
2. Erstellen Sie einen Service Account
3. Laden Sie den JSON-Key herunter

#### 3. Credentials einrichten

```env
GCS_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

#### 4. Cloud-Speicher aktivieren

```python
export_module.enable_cloud_storage('gcs', {
    'bucket_name': os.environ.get('GCS_BUCKET_NAME')
})
```

### Azure Blob Storage Setup

#### 1. Azure-Konfiguration

```bash
pip install azure-storage-blob
```

#### 2. Credentials einrichten

```env
AZURE_STORAGE_ACCOUNT_URL=https://your-account.blob.core.windows.net
AZURE_STORAGE_CREDENTIAL=your-credential
AZURE_CONTAINER_NAME=films
```

#### 3. Cloud-Speicher aktivieren

```python
export_module.enable_cloud_storage('azure_blob', {
    'account_url': os.environ.get('AZURE_STORAGE_ACCOUNT_URL'),
    'credential': os.environ.get('AZURE_STORAGE_CREDENTIAL'),
    'container_name': os.environ.get('AZURE_CONTAINER_NAME')
})
```

## Automatisches Upload

Wenn Cloud-Speicher aktiviert ist, können Videos automatisch hochgeladen werden:

```python
# In export_module.py - automatisches Upload aktivieren
for scene in scenes:
    if scene.get('video_url'):
        cloud_url = await self.upload_to_cloud(
            scene['video_url'], 
            scene['scene_number']
        )
        scene['cloud_storage_url'] = cloud_url
```

## Hybride Lösung

Sie können beide Optionen kombinieren:

1. **Direkt-Streaming** für sofortigen Zugriff
2. **Cloud-Speicher** für langfristige Archivierung

```python
export_info = {
    'storage_type': 'hybrid',
    'replicate_urls': [...],  # Sofortiger Zugriff
    'cloud_urls': [...]        # Langzeit-Archiv
}
```

## Kosten-Vergleich

### Nur Replicate (Option C)
- **Kosten**: Nur Generation (~$0.10-0.18 pro Video)
- **Speicher**: Kostenlos (temporär)
- **Verfügbarkeit**: Begrenzt (wenige Tage)

### Cloud-Speicher (Option B)
- **AWS S3**: ~$0.023/GB/Monat + Transfer
- **GCS**: ~$0.020/GB/Monat + Transfer
- **Azure**: ~$0.018/GB/Monat + Transfer
- **Verfügbarkeit**: Unbegrenzt

### Empfehlung

- **Entwicklung/Testing**: Option C (Direkt-Streaming)
- **Produktion**: Option B + C (Hybrid)
- **Archivierung**: Option B (Cloud-Speicher)

## Troubleshooting

### Problem: Cloud-Upload schlägt fehl

**Lösung:**
1. Überprüfen Sie Credentials
2. Prüfen Sie Bucket-Berechtigungen
3. Prüfen Sie Netzwerk-Konnektivität

```bash
# Test AWS-Verbindung
aws s3 ls s3://your-bucket-name

# Test GCS-Verbindung
gsutil ls gs://your-bucket-name
```

### Problem: Videos nicht verfügbar

**Lösung:**
1. Prüfen Sie Replicate-Status
2. Überprüfen Sie Cloud-Storage-URLs
3. Prüfen Sie Bucket-CORS-Einstellungen

## Support

Bei Fragen zur Cloud-Integration:
1. Überprüfen Sie Logs: `/var/log/supervisor/backend.err.log`
2. Testen Sie Module einzeln
3. Prüfen Sie Umgebungsvariablen

## Nächste Schritte

1. ✅ Option C läuft (Direkt-Streaming)
2. 🔧 Wählen Sie Cloud-Provider für Option B
3. 📝 Konfigurieren Sie Credentials
4. 🚀 Aktivieren Sie Cloud-Upload
5. ✅ Testen Sie Hybrid-Modus
