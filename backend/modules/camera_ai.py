import logging
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

class CameraAI:
    """Determines camera movements and angles"""
    
    def __init__(self):
        self.camera_presets = {
            'wide': 'wide establishing shot',
            'medium': 'medium shot',
            'close': 'close-up shot',
            'extreme_close': 'extreme close-up',
            'over_shoulder': 'over the shoulder shot',
            'pan': 'panning shot',
            'tilt': 'tilting camera movement',
            'dolly': 'dolly camera movement',
            'crane': 'crane shot from above'
        }
    
    def analyze_scene(self, scene: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze scene and determine camera setup"""
        try:
            camera_setup = {
                'shots': [],
                'movements': [],
                'angles': []
            }
            
            # Use explicit camera directions if provided
            if scene.get('camera'):
                camera_setup['shots'] = scene['camera']
            else:
                # Auto-determine based on scene type
                if scene['scene_number'] == 1:
                    camera_setup['shots'].append(self.camera_presets['wide'])
                
                # Dialog scenes get medium/close-ups
                if scene.get('dialogs'):
                    camera_setup['shots'].append(self.camera_presets['medium'])
                    if len(scene['dialogs']) > 2:
                        camera_setup['shots'].append(self.camera_presets['close'])
                
                # Action scenes get dynamic movements
                if scene.get('actions') and len(scene['actions']) > 1:
                    camera_setup['movements'].append(self.camera_presets['pan'])
            
            logger.info(f"Analyzed camera setup for scene {scene['scene_number']}")
            return camera_setup
            
        except Exception as e:
            logger.error(f"Error analyzing camera: {str(e)}")
            raise
    
    def apply_camera_to_scenes(self, scenes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Apply camera analysis to all scenes"""
        for scene in scenes:
            scene['camera_setup'] = self.analyze_scene(scene)
        return scenes