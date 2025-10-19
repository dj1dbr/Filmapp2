import logging
from typing import Dict, Set, List

logger = logging.getLogger(__name__)

class CharacterAI:
    """Manages character information and consistency"""
    
    def __init__(self):
        self.characters: Dict[str, Dict] = {}
    
    def extract_characters(self, scenes: List[Dict]) -> Dict[str, Dict]:
        """Extract unique characters from all scenes"""
        try:
            all_characters: Set[str] = set()
            
            for scene in scenes:
                if 'characters' in scene:
                    all_characters.update(scene['characters'])
            
            # Create character profiles
            for char_name in all_characters:
                if char_name not in self.characters:
                    self.characters[char_name] = {
                        'name': char_name,
                        'scenes': [],
                        'dialog_count': 0
                    }
            
            # Track character appearances
            for scene in scenes:
                for char in scene.get('characters', []):
                    if char in self.characters:
                        self.characters[char]['scenes'].append(scene['scene_number'])
                        self.characters[char]['dialog_count'] += len([
                            d for d in scene.get('dialogs', []) if d['character'] == char
                        ])
            
            logger.info(f"Extracted {len(self.characters)} characters")
            return self.characters
            
        except Exception as e:
            logger.error(f"Error extracting characters: {str(e)}")
            raise
    
    def get_character_info(self, character_name: str) -> Dict:
        """Get information about a specific character"""
        return self.characters.get(character_name, {})