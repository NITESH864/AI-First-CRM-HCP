from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .agent import run_agent
from .database import engine, Base, SessionLocal
from . import models

# टेबल बनाएँ
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 1. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Frontend को allow करें
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ChatRequest(BaseModel):
    message: str

# 2. CHAT ENDPOINT
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response = run_agent(request.message)
        return {"reply": response} 
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# 3. SAVE ENDPOINT (With Debugging Prints)
@app.post("/save-interaction")
async def save_interaction(data: dict, db: Session = Depends(get_db)):
    print("📥 RECEIVED DATA FROM FRONTEND:", data) # यह Terminal में दिखेगा

    try:
        # Frontend से आ रहे data को Database Model में मैप करें
        new_entry = models.Interaction(
            hcp_name=data.get('hcpName'),           # Frontend: hcpName
            interaction_type=data.get('interactionType'), # Frontend: interactionType
            date=data.get('date'),                  # Frontend: date
            sentiment=data.get('sentiment'),        # Frontend: sentiment
            topics=data.get('topics')               # Frontend: topics
        )
        
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        
        print("✅ Data Saved Successfully!")
        return {"status": "success", "message": "Interaction saved to Database!"}
    
    except Exception as e:
        print(f"❌ DATABASE ERROR: {str(e)}") # अगर सेव न हो, तो यह वजह बताएगा
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Backend is Running"}