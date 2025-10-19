from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse, RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import asyncio
import time

# Import all modules
from modules.scene_parser import SceneParser
from modules.scene_builder import SceneBuilder
from modules.character_ai import CharacterAI
from modules.voice_ai import VoiceAI
from modules.camera_ai import CameraAI
from modules.lighting_ai import LightingAI
from modules.sound_ai import SoundAI
from modules.render_engine import RenderEngine
from modules.timeline_manager import TimelineManager
from modules.export_module import ExportModule

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Paradoxon Film Generator", version="2.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize modules
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
REPLICATE_API_TOKEN = os.environ.get('REPLICATE_API_TOKEN')

scene_parser = SceneParser()
scene_builder = SceneBuilder()
character_ai = CharacterAI()
voice_ai = VoiceAI(api_key=EMERGENT_LLM_KEY)
camera_ai = CameraAI()
lighting_ai = LightingAI()
sound_ai = SoundAI()
render_engine = RenderEngine(replicate_token=REPLICATE_API_TOKEN, demo_mode=True)  # Demo mode enabled
timeline_manager = TimelineManager()
export_module = ExportModule()

# Models
class FilmGenerationRequest(BaseModel):
    screenplay: str = Field(..., description="The screenplay text")
    style: str = Field(default="cinematic", description="Film style")
    quality: str = Field(default="medium", description="Video quality: low, medium, high, ultra")

class FilmGenerationResponse(BaseModel):
    job_id: str
    status: str
    message: str

class FilmJob(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    screenplay: str
    style: str
    quality: str = Field(default="medium")
    status: str = Field(default="processing")
    progress: int = Field(default=0)
    scenes: List[Dict[str, Any]] = Field(default_factory=list)
    timeline: List[Dict[str, Any]] = Field(default_factory=list)
    export_info: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    generation_duration: Optional[float] = None
    total_file_size: Optional[int] = None
    error: Optional[str] = None

class JobStatusResponse(BaseModel):
    job_id: str
    status: str
    progress: int
    scenes_count: int
    message: str
    video_urls: Optional[List[str]] = None
    export_info: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    generation_duration: Optional[float] = None
    total_file_size: Optional[int] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None

@api_router.get("/")
async def root():
    return {
        "message": "Paradoxon Film Generator API",
        "version": "2.0.0",
        "status": "operational",
        "features": {
            "direct_streaming": True,
            "cloud_storage": False,
            "demo_mode": True,
            "quality_settings": ["low", "medium", "high", "ultra"],
            "styles": ["cinematic", "realistic", "animated", "noir", "scifi", "horror", "fantasy", "documentary", "anime"]
        }
    }

@api_router.post("/generate-film", response_model=FilmGenerationResponse)
async def generate_film(request: FilmGenerationRequest):
    """Generate a complete film from screenplay"""
    try:
        job_id = str(uuid.uuid4())
        started_at = datetime.now(timezone.utc)
        
        # Create job entry
        job = FilmJob(
            id=job_id,
            screenplay=request.screenplay,
            style=request.style,
            quality=request.quality,
            status="processing",
            progress=0,
            started_at=started_at
        )
        
        # Store in database
        job_dict = job.model_dump()
        job_dict['created_at'] = job_dict['created_at'].isoformat()
        job_dict['updated_at'] = job_dict['updated_at'].isoformat()
        job_dict['started_at'] = job_dict['started_at'].isoformat()
        await db.film_jobs.insert_one(job_dict)
        
        # Start background processing
        asyncio.create_task(process_film_generation(job_id, request.screenplay, request.style, request.quality, started_at))
        
        return FilmGenerationResponse(
            job_id=job_id,
            status="processing",
            message="Film generation started. Use the job_id to check progress."
        )
        
    except Exception as e:
        logger.error(f"Error starting film generation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/job/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str):
    """Get the status of a film generation job"""
    try:
        job = await db.film_jobs.find_one({"id": job_id}, {"_id": 0})
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # Extract video URLs from export info
        video_urls = None
        if job.get('export_info') and job.get('export_info', {}).get('download_urls'):
            video_urls = job['export_info']['download_urls']
        
        return JobStatusResponse(
            job_id=job['id'],
            status=job['status'],
            progress=job['progress'],
            scenes_count=len(job.get('scenes', [])),
            message=f"Job is {job['status']}",
            video_urls=video_urls,
            export_info=job.get('export_info'),
            error=job.get('error'),
            generation_duration=job.get('generation_duration'),
            total_file_size=job.get('total_file_size'),
            started_at=job.get('started_at'),
            completed_at=job.get('completed_at')
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting job status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/job/{job_id}/scenes")
async def get_job_scenes(job_id: str):
    """Get all scenes for a job with video URLs"""
    try:
        job = await db.film_jobs.find_one({"id": job_id}, {"_id": 0})
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        return {
            "job_id": job_id,
            "scenes": job.get('scenes', []),
            "total_scenes": len(job.get('scenes', [])),
            "export_info": job.get('export_info')
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting job scenes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/job/{job_id}/download/{scene_number}")
async def download_scene(job_id: str, scene_number: int):
    """Redirect to direct video URL for a specific scene"""
    try:
        job = await db.film_jobs.find_one({"id": job_id}, {"_id": 0})
        
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        scenes = job.get('scenes', [])
        scene = next((s for s in scenes if s['scene_number'] == scene_number), None)
        
        if not scene:
            raise HTTPException(status_code=404, detail="Scene not found")
        
        video_url = scene.get('video_url')
        if not video_url or video_url.startswith('placeholder'):
            raise HTTPException(status_code=404, detail="Video not available")
        
        # Redirect to video URL
        return RedirectResponse(url=video_url)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading scene: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def process_film_generation(job_id: str, screenplay: str, style: str, quality: str, started_at: datetime):
    """Background task to process film generation"""
    try:
        logger.info(f"Starting film generation for job {job_id}")
        
        # Update progress: Parsing
        await update_job_progress(job_id, 10, "Parsing screenplay...")
        scenes = scene_parser.parse(screenplay)
        
        # Update progress: Building scenes
        await update_job_progress(job_id, 20, "Building scene descriptions...")
        scenes = scene_builder.build_scenes(scenes, style)
        
        # Update progress: Analyzing characters
        await update_job_progress(job_id, 30, "Analyzing characters...")
        characters = character_ai.extract_characters(scenes)
        voice_ai.assign_voices(characters)
        
        # Update progress: Camera setup
        await update_job_progress(job_id, 40, "Setting up cameras...")
        scenes = camera_ai.apply_camera_to_scenes(scenes)
        
        # Update progress: Lighting
        await update_job_progress(job_id, 50, "Configuring lighting...")
        scenes = lighting_ai.apply_lighting_to_scenes(scenes)
        
        # Update progress: Sound design
        await update_job_progress(job_id, 60, "Designing sound...")
        scenes = sound_ai.apply_sound_to_scenes(scenes)
        
        # Update progress: Generating voices
        await update_job_progress(job_id, 70, "Generating AI voices...")
        for scene in scenes:
            audio_clips = await voice_ai.generate_scene_audio(scene)
            scene['audio_clips'] = [{
                'character': clip['character'],
                'text': clip['text'],
                'voice': clip['voice']
            } for clip in audio_clips]
        
        # Update progress: Rendering videos
        await update_job_progress(job_id, 80, "Rendering scene videos...")
        scenes = await render_engine.render_all_scenes(scenes, style, quality)
        
        # Calculate total file size
        total_file_size = sum(scene.get('file_size', 0) for scene in scenes)
        
        # Update progress: Creating timeline
        await update_job_progress(job_id, 90, "Creating timeline...")
        timeline = timeline_manager.create_timeline(scenes)
        
        # Update progress: Exporting
        await update_job_progress(job_id, 95, "Exporting film...")
        export_info = await export_module.export_film(scenes, timeline)
        export_info['total_file_size'] = total_file_size
        
        # Calculate generation duration
        completed_at = datetime.now(timezone.utc)
        generation_duration = (completed_at - started_at).total_seconds()
        
        # Complete
        await db.film_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "status": "completed",
                    "progress": 100,
                    "scenes": scenes,
                    "timeline": timeline,
                    "export_info": export_info,
                    "completed_at": completed_at.isoformat(),
                    "generation_duration": generation_duration,
                    "total_file_size": total_file_size,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        logger.info(f"Film generation completed for job {job_id} in {generation_duration:.2f}s")
        
    except Exception as e:
        logger.error(f"Error in film generation: {str(e)}")
        await db.film_jobs.update_one(
            {"id": job_id},
            {
                "$set": {
                    "status": "failed",
                    "error": str(e),
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )

async def update_job_progress(job_id: str, progress: int, message: str):
    """Update job progress in database"""
    await db.film_jobs.update_one(
        {"id": job_id},
        {
            "$set": {
                "progress": progress,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    logger.info(f"Job {job_id}: {progress}% - {message}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
