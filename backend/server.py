from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="SocialLab API", description="API para o site da SocialLab")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str
    email: EmailStr
    mensagem: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    nome: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    mensagem: str = Field(..., min_length=1, max_length=1000)

class LeadResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[str] = None

# Helper function to prepare data for MongoDB
def prepare_for_mongo(data):
    if isinstance(data.get('created_at'), datetime):
        data['created_at'] = data['created_at'].isoformat()
    return data

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "SocialLab API - Transformando sua presença digital"}

@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(lead_data: LeadCreate):
    try:
        # Create lead object
        lead = Lead(**lead_data.dict())
        
        # Prepare for MongoDB storage
        lead_dict = prepare_for_mongo(lead.dict())
        
        # Insert into database
        result = await db.leads.insert_one(lead_dict)
        
        if result.inserted_id:
            return LeadResponse(
                success=True,
                message="Mensagem enviada com sucesso!",
                lead_id=lead.id
            )
        else:
            raise HTTPException(status_code=500, detail="Erro ao salvar lead")
            
    except Exception as e:
        logger.error(f"Erro ao criar lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    try:
        leads = await db.leads.find().to_list(1000)
        return [Lead(**lead) for lead in leads]
    except Exception as e:
        logger.error(f"Erro ao buscar leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao buscar leads")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()