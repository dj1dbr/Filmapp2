import logging
import os
from typing import Dict, List
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage
from openai import OpenAI

logger = logging.getLogger(__name__)

class VoiceAI:
    """Generates AI voices for character dialogs"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.client = OpenAI(api_key=api_key)
        self.voice_mapping = {}
        self.available_voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']
    
    def assign_voices(self, characters: Dict[str, Dict]) -> Dict[str, str]:
        """Assign voices to characters"""
        try:
            char_list = list(characters.keys())
            for i, char in enumerate(char_list):
                voice = self.available_voices[i % len(self.available_voices)]
                self.voice_mapping[char] = voice
            
            logger.info(f"Assigned voices to {len(self.voice_mapping)} characters")
            return self.voice_mapping
            
        except Exception as e:
            logger.error(f"Error assigning voices: {str(e)}")
            raise
    
    async def generate_speech(self, text: str, character: str) -> bytes:
        """Generate speech audio for dialog"""
        try:
            voice = self.voice_mapping.get(character, 'alloy')
            
            response = self.client.audio.speech.create(
                model="tts-1",
                voice=voice,
                input=text
            )
            
            audio_content = response.content
            logger.info(f"Generated speech for character {character}")
            return audio_content
            
        except Exception as e:
            logger.error(f"Error generating speech: {str(e)}")
            raise
    
    async def generate_scene_audio(self, scene: Dict) -> List[Dict]:
        """Generate audio for all dialogs in a scene"""
        audio_clips = []
        
        for dialog in scene.get('dialogs', []):
            try:
                audio_data = await self.generate_speech(
                    dialog['text'],
                    dialog['character']
                )
                
                audio_clips.append({
                    'character': dialog['character'],
                    'text': dialog['text'],
                    'audio_data': audio_data,
                    'voice': self.voice_mapping.get(dialog['character'], 'alloy')
                })
            except Exception as e:
                logger.error(f"Error generating audio for dialog: {str(e)}")
        
        return audio_clips