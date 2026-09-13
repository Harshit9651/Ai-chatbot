import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.chat import router as chat_router


load_dotenv()


# --------------------------------
# Environment
# --------------------------------

ENVIRONMENT = os.getenv(
    "ENVIRONMENT",
    "development"
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)


# --------------------------------
# FastAPI App
# --------------------------------

app = FastAPI(
    title="AI Chatbot API",
    version="1.0.0"
)


# --------------------------------
# CORS
# --------------------------------

allowed_origins = [
    FRONTEND_URL,
]

# Local development ke liye
if ENVIRONMENT == "development":
    allowed_origins.extend([
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ])


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------
# Routes
# --------------------------------

app.include_router(
    chat_router,
    prefix="/api/v1/chat",
    tags=["Chat"],
)


# --------------------------------
# Health Check
# --------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "environment": ENVIRONMENT,
    }