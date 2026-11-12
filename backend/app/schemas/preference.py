from pydantic import BaseModel, ConfigDict, Field


class PreferenceCreate(BaseModel):
    taste_preferences: str | None = None
    texture_preferences: str | None = None
    smell_sensitivity: str | None = Field(default=None, max_length=100)
    temperature_preferences: str | None = Field(default=None, max_length=100)
    appearance_preferences: str | None = None
    dietary_restrictions: str | None = None


class PreferenceUpdate(BaseModel):
    taste_preferences: str | None = None
    texture_preferences: str | None = None
    smell_sensitivity: str | None = Field(default=None, max_length=100)
    temperature_preferences: str | None = Field(default=None, max_length=100)
    appearance_preferences: str | None = None
    dietary_restrictions: str | None = None


class PreferenceResponse(PreferenceCreate):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)