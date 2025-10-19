import logging
from typing import List, Dict, Any
import asyncio

logger = logging.getLogger(__name__)

class TimelineManager:
    """Manages timeline and synchronization of scenes"""
    
    def __init__(self):
        self.timeline = []
        self.total_duration = 0
    
    def create_timeline(self, scenes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Create timeline with all scenes"""
        try:
            timeline = []
            current_time = 0
            
            for scene in scenes:
                # Calculate scene duration (estimate)
                dialog_duration = len(scene.get('dialogs', [])) * 3  # ~3 seconds per dialog
                action_duration = len(scene.get('actions', [])) * 2  # ~2 seconds per action
                base_duration = max(5, dialog_duration + action_duration)  # Minimum 5 seconds
                
                timeline_entry = {
                    'scene_number': scene['scene_number'],
                    'start_time': current_time,
                    'duration': base_duration,
                    'end_time': current_time + base_duration,
                    'video_url': scene.get('video_url', ''),
                    'audio_clips': scene.get('audio_clips', []),
                    'transitions': 'fade'
                }
                
                timeline.append(timeline_entry)
                current_time += base_duration
            
            self.timeline = timeline
            self.total_duration = current_time
            
            logger.info(f"Created timeline with {len(timeline)} scenes, total duration: {self.total_duration}s")
            return timeline
            
        except Exception as e:
            logger.error(f"Error creating timeline: {str(e)}")
            raise
    
    def get_timeline_info(self) -> Dict[str, Any]:
        """Get timeline information"""
        return {
            'total_scenes': len(self.timeline),
            'total_duration': self.total_duration,
            'timeline': self.timeline
        }