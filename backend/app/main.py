
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import settings
from app.db.session import engine
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.preferences import router as preferences_router
from app.routes.saved_foods import router as saved_foods_router
from app.routes.journal import router as journal_router

app = FastAPI(
    title=settings.app_name,
    description="Backend API for the Spoonful application",
    version="1.0.0",
)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(preferences_router)
app.include_router(saved_foods_router)
app.include_router(journal_router) 
# Frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Spoonful API!",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "Spoonful API",
    }


@app.get("/health/db")
def database_health():
    if engine is None:
        raise HTTPException(
            status_code=503,
            detail="Database is not configured",
        )

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
            "message": "PostgreSQL connection successful!",
        }

    except SQLAlchemyError:
        raise HTTPException(
            status_code=503,
            detail="PostgreSQL connection failed",
        )
