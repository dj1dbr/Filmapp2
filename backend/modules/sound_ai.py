import logging
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

class SoundAI:
    """Determines sound effects and music for scenes"""
    
    def __init__(self):
        self.sound_library = {
            'ambient': {
                'exterior': ['wind', 'birds chirping', 'traffic'],
                'interior': ['room tone', 'clock ticking', 'distant sounds']
            },
            'music': {
                'dramatic': 'dramatic orchestral score',
                'action': 'intense action music',
                'emotional': 'emotional piano melody',
                'suspense': 'suspenseful ambient tones'
            }
        }
    
    def analyze_sound(self, scene: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze scene and determine sound design"""
        try:
            sound_design = {
                'effects': [],
                'music': '',
                'ambient': []
            }
            
            # Use explicit sound directions if provided
            if scene.get('sound'):
                sound_design['effects'] = scene['sound']
            
            # Add ambient sounds based on location
            if scene['type'] == 'EXTERIOR':
                sound_design['ambient'] = self.sound_library['ambient']['exterior']
            else:
                sound_design['ambient'] = self.sound_library['ambient']['interior']
            
            # Determine music based on scene content
            if len(scene.get('dialogs', [])) > 2:
                sound_design['music'] = self.sound_library['music']['emotional']
            elif len(scene.get('actions', [])) > 2:
                sound_design['music'] = self.sound_library['music']['action']
            else:
                sound_design['music'] = self.sound_library['music']['dramatic']
            
            logger.info(f"Analyzed sound for scene {scene['scene_number']}")
            return sound_design
            
        except Exception as e:
            logger.error(f"Error analyzing sound: {str(e)}")
            raise
    
    def apply_sound_to_scenes(self, scenes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Apply sound analysis to all scenes"""
        for scene in scenes:
            scene['sound_design'] = self.analyze_sound(scene)
        return scenes