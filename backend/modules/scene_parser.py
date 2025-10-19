import re
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class SceneParser:
    """Parses screenplay text and extracts scenes with metadata"""
    
    def __init__(self):
        self.scene_patterns = {
            'location': r'(INT\.|EXT\.)\s+([^\n]+)',
            'dialog': r'([A-Z][A-Z\s]+)\n([^\n]+)',
            'action': r'^([^A-Z\n][^\n]+)$',
            'camera': r'(KAMERA|CAMERA):\s*([^\n]+)',
            'light': r'(LICHT|LIGHT):\s*([^\n]+)',
            'sound': r'(SOUND|TON):\s*([^\n]+)'
        }
    
    def parse(self, screenplay_text: str) -> List[Dict[str, Any]]:
        """Parse screenplay into structured scenes"""
        try:
            logger.info("Starting screenplay parsing")
            scenes = []
            
            # Split by scene headings
            scene_splits = re.split(r'(INT\.|EXT\.)\s+', screenplay_text)
            
            current_scene = None
            for i in range(1, len(scene_splits), 2):
                if i + 1 < len(scene_splits):
                    scene_type = scene_splits[i].strip()
                    scene_content = scene_splits[i + 1]
                    
                    # Extract scene location
                    location_match = re.match(r'([^\n-]+)', scene_content)
                    location = location_match.group(1).strip() if location_match else "Unknown"
                    
                    scene = {
                        'scene_number': len(scenes) + 1,
                        'type': 'INTERIOR' if scene_type == 'INT.' else 'EXTERIOR',
                        'location': location,
                        'dialogs': [],
                        'actions': [],
                        'camera': [],
                        'lighting': [],
                        'sound': [],
                        'characters': set()
                    }
                    
                    # Parse scene content
                    lines = scene_content.split('\n')
                    for j, line in enumerate(lines):
                        line = line.strip()
                        if not line:
                            continue
                        
                        # Check for camera direction
                        camera_match = re.search(self.scene_patterns['camera'], line, re.IGNORECASE)
                        if camera_match:
                            scene['camera'].append(camera_match.group(2).strip())
                            continue
                        
                        # Check for lighting
                        light_match = re.search(self.scene_patterns['light'], line, re.IGNORECASE)
                        if light_match:
                            scene['lighting'].append(light_match.group(2).strip())
                            continue
                        
                        # Check for sound
                        sound_match = re.search(self.scene_patterns['sound'], line, re.IGNORECASE)
                        if sound_match:
                            scene['sound'].append(sound_match.group(2).strip())
                            continue
                        
                        # Check for dialog (character name in all caps)
                        if line.isupper() and len(line) > 2 and j + 1 < len(lines):
                            character = line.strip()
                            dialog_text = lines[j + 1].strip() if j + 1 < len(lines) else ""
                            scene['dialogs'].append({
                                'character': character,
                                'text': dialog_text
                            })
                            scene['characters'].add(character)
                        # Action description
                        elif not line.isupper() and len(line) > 10:
                            scene['actions'].append(line)
                    
                    scene['characters'] = list(scene['characters'])
                    scenes.append(scene)
            
            logger.info(f"Parsed {len(scenes)} scenes from screenplay")
            return scenes
            
        except Exception as e:
            logger.error(f"Error parsing screenplay: {str(e)}")
            raise