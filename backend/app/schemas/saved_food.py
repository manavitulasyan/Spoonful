
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SavedFoodCreate(BaseModel):
    food_name: str = Field(min_length=1, max_length=150)
    category: str | None = Field(default=None, max_length=100)
    description: str | None = None
    notes: str | None = Field(default=None, max_length=500)


class SavedFoodUpdate(BaseModel):
    notes: str | None = Field(default=None, max_length=500)


class FoodSummary(BaseModel):
    id: int
    name: str
    category: str | None
    description: str | None

    model_config = ConfigDict(from_attributes=True)


class SavedFoodResponse(BaseModel):
    id: int
    user_id: int
    food_id: int
    notes: str | None
    created_at: datetime
    food: FoodSummary

    model_config = ConfigDict(from_attributes=True)
