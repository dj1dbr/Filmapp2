import logging
from typing import Dict, List, Any

logger = logging.getLogger(__name__)

class LightingAI:
    """Determines lighting setup for scenes"""
    
    def __init__(self):
        self.lighting_presets = {
            'natural': 'natural daylight, soft shadows',
            'dramatic': 'dramatic high-contrast lighting, strong shadows',
            'soft': 'soft diffused lighting, minimal shadows',
            'neon': 'neon lighting, vibrant colors',
            'candlelight': 'warm candlelight, intimate atmosphere',
            'moonlight': 'cool moonlight, mysterious atmosphere',
            'golden_hour': 'golden hour lighting, warm tones',
            'overcast': 'overcast lighting, even illumination'
        }
    
    def analyze_lighting(self, scene: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze scene and determine lighting setup"""
        try:
            lighting_setup = {
                'type': '',
                'description': '',
                'mood': ''
            }
            
            # Use explicit lighting if provided
            if scene.get('lighting'):
                lighting_setup['description'] = ', '.join(scene['lighting'])
                lighting_setup['type'] = 'custom'
            else:
                # Auto-determine based on scene type
                if scene['type'] == 'EXTERIOR':
                    lighting_setup['type'] = 'natural'
                    lighting_setup['description'] = self.lighting_presets['natural']
                else:
                    lighting_setup['type'] = 'soft'
                    lighting_setup['description'] = self.lighting_presets['soft']
                
                # Adjust for mood if actions suggest it
                actions_text = ' '.join(scene.get('actions', [])).lower()
                if any(word in actions_text for word in ['dark', 'night', 'shadow']):
                    lighting_setup['type'] = 'dramatic'
                    lighting_setup['description'] = self.lighting_presets['dramatic']
                elif any(word in actions_text for word in ['warm', 'cozy']):
                    lighting_setup['type'] = 'candlelight'
                    lighting_setup['description'] = self.lighting_presets['candlelight']
            
            logger.info(f"Analyzed lighting for scene {scene['scene_number']}")
            return lighting_setup
            
        except Exception as e:
            logger.error(f"Error analyzing lighting: {str(e)}")
            raise
    
    def apply_lighting_to_scenes(self, scenes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Apply lighting analysis to all scenes"""
        for scene in scenes:
            scene['lighting_setup'] = self.analyze_lighting(scene)
        return scenes