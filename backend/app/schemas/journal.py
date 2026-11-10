
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class JournalCreate(BaseModel):
    food_name: str = Field(min_length=1, max_length=150)
    food_id: int | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    notes: str | None = None
    experienced_at: datetime | None = None


class JournalUpdate(BaseModel):
    food_name: str | None = Field(default=None, min_length=1, max_length=150)
    rating: int | None = Field(default=None, ge=1, le=5)
    notes: str | None = None
    experienced_at: datetime | None = None


class JournalResponse(BaseModel):
    id: int
    user_id: int
    food_id: int | None
    food_name: str
    rating: int | None
    notes: str | None
    experienced_at: datetime

    model_config = ConfigDict(from_attributes=True)
