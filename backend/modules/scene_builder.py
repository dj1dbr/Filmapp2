import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class SceneBuilder:
    """Builds visual scene descriptions from parsed data"""
    
    def __init__(self):
        pass
    
    def build_scene_description(self, scene: Dict[str, Any], style: str = 'cinematic') -> str:
        """Build a detailed scene description for image/video generation"""
        try:
            description_parts = []
            
            # Style prefix
            style_modifiers = {
                'realistic': 'photorealistic, cinematic, high quality, 8k resolution',
                'animated': 'animated, cartoon style, colorful, stylized',
                'cinematic': 'cinematic, dramatic lighting, film quality, professional cinematography'
            }
            
            base_style = style_modifiers.get(style, style_modifiers['cinematic'])
            
            # Location and type
            location_desc = f"{scene['type'].lower()} scene in {scene['location']}"
            description_parts.append(location_desc)
            
            # Camera angles
            if scene.get('camera'):
                camera_desc = ', '.join(scene['camera'])
                description_parts.append(f"camera: {camera_desc}")
            
            # Lighting
            if scene.get('lighting'):
                light_desc = ', '.join(scene['lighting'])
                description_parts.append(f"lighting: {light_desc}")
            
            # Actions
            if scene.get('actions'):
                action_desc = '. '.join(scene['actions'][:2])  # Limit to first 2 actions
                description_parts.append(action_desc)
            
            # Characters
            if scene.get('characters'):
                char_desc = f"featuring {', '.join(scene['characters'][:3])}"
                description_parts.append(char_desc)
            
            # Combine all
            full_description = f"{base_style}, {', '.join(description_parts)}"
            
            logger.info(f"Built scene description for scene {scene.get('scene_number')}")
            return full_description[:1000]  # Limit length for API
            
        except Exception as e:
            logger.error(f"Error building scene description: {str(e)}")
            raise
    
    def build_scenes(self, scenes: List[Dict[str, Any]], style: str = 'cinematic') -> List[Dict[str, Any]]:
        """Build descriptions for all scenes"""
        built_scenes = []
        for scene in scenes:
            scene['visual_description'] = self.build_scene_description(scene, style)
            built_scenes.append(scene)
        return built_scenes