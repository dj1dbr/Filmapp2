import logging
import os
import asyncio
from typing import List, Dict, Any, Optional
import requests

logger = logging.getLogger(__name__)

class ExportModule:
    """Exports final film - supports direct URLs and cloud storage"""
    
    def __init__(self):
        self.output_dir = "/app/backend/generated_films"
        os.makedirs(self.output_dir, exist_ok=True)
        self.cloud_storage = None  # Will be initialized when cloud storage is configured
    
    async def export_film(self, scenes: List[Dict[str, Any]], timeline: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Export complete film - returns URLs for direct streaming"""
        try:
            logger.info("Starting film export")
            
            # Collect all video URLs from scenes
            scene_videos = []
            for scene in scenes:
                video_url = scene.get('video_url', '')
                if video_url and not video_url.startswith('placeholder'):
                    scene_videos.append({
                        'scene_number': scene['scene_number'],
                        'video_url': video_url,
                        'duration': scene.get('duration', 5)
                    })
            
            export_info = {
                'status': 'completed',
                'storage_type': 'replicate_urls',  # or 'cloud_storage' when implemented
                'scene_videos': scene_videos,
                'total_scenes': len(scenes),
                'total_duration': sum(t['duration'] for t in timeline),
                'format': 'MP4',
                'resolution': '1024x576',
                'download_urls': [v['video_url'] for v in scene_videos],
                'cloud_storage_enabled': False  # Will be True when cloud storage is configured
            }
            
            logger.info(f"Film export completed: {len(scene_videos)} scenes available")
            return export_info
            
        except Exception as e:
            logger.error(f"Error exporting film: {str(e)}")
            raise
    
    async def download_scene_videos(self, scenes: List[Dict[str, Any]]) -> List[str]:
        """Download scene videos locally (optional, for backup)"""
        video_paths = []
        
        for scene in scenes:
            video_url = scene.get('video_url', '')
            if video_url and not video_url.startswith('placeholder'):
                try:
                    response = requests.get(video_url, stream=True)
                    video_path = os.path.join(self.output_dir, f"scene_{scene['scene_number']}.mp4")
                    
                    with open(video_path, 'wb') as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            if chunk:
                                f.write(chunk)
                    
                    video_paths.append(video_path)
                    logger.info(f"Downloaded scene {scene['scene_number']} to {video_path}")
                except Exception as e:
                    logger.error(f"Error downloading scene {scene['scene_number']}: {str(e)}")
        
        return video_paths
    
    def enable_cloud_storage(self, provider: str, config: Dict[str, Any]):
        """Enable cloud storage (AWS S3, Google Cloud Storage, etc.)
        
        This method is prepared for future cloud storage integration.
        
        Args:
            provider: 'aws_s3', 'gcs', 'azure_blob'
            config: Provider-specific configuration
        
        Example usage:
            export_module.enable_cloud_storage('aws_s3', {
                'bucket_name': 'my-films',
                'region': 'us-east-1',
                'access_key': 'xxx',
                'secret_key': 'xxx'
            })
        """
        from modules.cloud_storage import CloudStorageManager
        self.cloud_storage = CloudStorageManager(provider, config)
        logger.info(f"Cloud storage enabled: {provider}")
    
    async def upload_to_cloud(self, video_url: str, scene_number: int) -> Optional[str]:
        """Upload video to cloud storage (prepared for future use)"""
        if not self.cloud_storage:
            logger.warning("Cloud storage not enabled")
            return None
        
        try:
            # Download video temporarily
            response = requests.get(video_url)
            temp_path = f"/tmp/scene_{scene_number}.mp4"
            
            with open(temp_path, 'wb') as f:
                f.write(response.content)
            
            # Upload to cloud
            cloud_url = await self.cloud_storage.upload_file(
                temp_path,
                f"films/scene_{scene_number}.mp4"
            )
            
            # Cleanup
            os.remove(temp_path)
            
            return cloud_url
            
        except Exception as e:
            logger.error(f"Error uploading to cloud: {str(e)}")
            return None