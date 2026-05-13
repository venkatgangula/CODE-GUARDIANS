from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from ai_engine import AIEngine
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CodeRefine AI", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Engine
ai_engine = AIEngine()

class CodeReviewRequest(BaseModel):
    code: str
    language: str

class CodeReviewResponse(BaseModel):
    success: bool
    issues_found: Optional[str] = None
    explanation: Optional[str] = None
    optimized_code: Optional[str] = None
    best_practices: Optional[str] = None
    error: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "CodeRefine AI API is running"}

@app.post("/review", response_model=CodeReviewResponse)
async def review_code(request: CodeReviewRequest):
    """
    Review code using AI analysis
    """
    try:
        # Validate input
        if not request.code.strip():
            raise HTTPException(status_code=400, detail="Code cannot be empty")
        
        if not request.language:
            raise HTTPException(status_code=400, detail="Language must be specified")
        
        # Validate language
        supported_languages = ["python", "javascript", "java", "cpp"]
        if request.language.lower() not in supported_languages:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported language. Supported languages: {', '.join(supported_languages)}"
            )
        
        logger.info(f"Processing code review request for {request.language}")
        
        # Perform AI analysis
        result = await ai_engine.analyze_code(request.code, request.language)
        
        return CodeReviewResponse(
            success=True,
            issues_found=result.get("issues_found", ""),
            explanation=result.get("explanation", ""),
            optimized_code=result.get("optimized_code", ""),
            best_practices=result.get("best_practices", "")
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during code review: {str(e)}")
        return CodeReviewResponse(
            success=False,
            error=f"An error occurred during code review: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        return {"status": "unhealthy", "reason": "GROQ_API_KEY not configured"}
    
    return {"status": "healthy", "groq_configured": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
