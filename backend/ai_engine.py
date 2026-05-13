import os
import json
import asyncio
from typing import Dict, Optional
import httpx
from groq import Groq
from prompts import CODE_REVIEW_PROMPT
import logging

logger = logging.getLogger(__name__)

class AIEngine:
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        if not self.groq_api_key:
            logger.warning("GROQ_API_KEY not found in environment variables")
        
        # Create a custom httpx client without proxies to avoid the compatibility issue
        http_client = httpx.Client()
        self.client = Groq(api_key=self.groq_api_key, http_client=http_client) if self.groq_api_key else None
        self.model = "llama-3.3-70b-versatile"
    
    async def analyze_code(self, code: str, language: str) -> Dict[str, str]:
        """
        Analyze code using Groq AI
        """
        if not self.client:
            raise Exception("Groq client not initialized. Please check GROQ_API_KEY.")
        
        try:
            # Format the prompt
            prompt = CODE_REVIEW_PROMPT.format(
                language=language,
                code=code
            )
            
            logger.info(f"Sending request to Groq API for {language} code analysis")
            
            # Create the chat completion
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a senior software engineer performing a professional code review. Always provide structured, actionable feedback."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=4000,
                top_p=1,
                stream=False
            )
            
            # Extract the response content
            ai_response = response.choices[0].message.content
            
            # Parse the structured response
            parsed_response = self._parse_ai_response(ai_response)
            
            logger.info("Successfully received AI analysis")
            return parsed_response
            
        except Exception as e:
            logger.error(f"Error calling Groq API: {str(e)}")
            raise Exception(f"AI analysis failed: {str(e)}")
    
    def _parse_ai_response(self, response: str) -> Dict[str, str]:
        """
        Parse the AI response into structured format
        """
        result = {
            "issues_found": "",
            "explanation": "",
            "optimized_code": "",
            "best_practices": ""
        }
        
        # Split response into sections
        sections = response.split("\n\n")
        current_section = None
        section_content = []
        
        for section in sections:
            section = section.strip()
            
            # Identify section headers
            if section.startswith("ISSUES FOUND"):
                if current_section and section_content:
                    result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
                current_section = "issues_found"
                section_content = [section]
            elif section.startswith("SEVERITY LEVELS"):
                if current_section and section_content:
                    result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
                current_section = "severity_levels"
                section_content = [section]
            elif section.startswith("EXPLANATION"):
                if current_section and section_content:
                    result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
                current_section = "explanation"
                section_content = [section]
            elif section.startswith("OPTIMIZED CODE"):
                if current_section and section_content:
                    result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
                current_section = "optimized_code"
                section_content = [section]
            elif section.startswith("BEST PRACTICES"):
                if current_section and section_content:
                    result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
                current_section = "best_practices"
                section_content = [section]
            else:
                # Continue with current section
                if current_section:
                    section_content.append(section)
        
        # Add the last section
        if current_section and section_content:
            result[current_section.lower().replace(" ", "_")] = "\n".join(section_content)
        
        # Clean up the sections (remove headers)
        for key in result:
            content = result[key]
            lines = content.split("\n")
            if lines and any(header in lines[0].upper() for header in ["ISSUES", "SEVERITY", "EXPLANATION", "OPTIMIZED", "BEST"]):
                result[key] = "\n".join(lines[1:]).strip()
        
        return result
    
    async def test_connection(self) -> bool:
        """
        Test connection to Groq API
        """
        if not self.client:
            return False
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": "Hello"}],
                max_tokens=10
            )
            return True
        except Exception as e:
            logger.error(f"Connection test failed: {str(e)}")
            return False
