
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.preference import SensoryPreference
from app.models.user import User
from app.core.dependencies import get_current_user
from app.schemas.preference import (
    PreferenceCreate,
    PreferenceUpdate,
    PreferenceResponse,
)

router = APIRouter(prefix="/preferences", tags=["Sensory Preferences"])


@router.post(
    "/",
    response_model=PreferenceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_preferences(
    preference_data: PreferenceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing = db.query(SensoryPreference).filter(
        SensoryPreference.user_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Sensory preferences already exist. Use PATCH to update them.",
        )

    preferences = SensoryPreference(
        user_id=current_user.id,
        **preference_data.model_dump(),
    )

    db.add(preferences)
    db.commit()
    db.refresh(preferences)

    return preferences


@router.get("/", response_model=PreferenceResponse)
def get_preferences(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    preferences = db.query(SensoryPreference).filter(
        SensoryPreference.user_id == current_user.id
    ).first()

    if not preferences:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sensory preferences not found.",
        )

    return preferences


@router.patch("/", response_model=PreferenceResponse)
def update_preferences(
    preference_data: PreferenceUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    preferences = db.query(SensoryPreference).filter(
        SensoryPreference.user_id == current_user.id
    ).first()

    if not preferences:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sensory preferences not found. Create them first.",
        )

    updates = preference_data.model_dump(exclude_unset=True)

    if not updates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No preference information provided.",
        )

    for field, value in updates.items():
        setattr(preferences, field, value)

    db.commit()
    db.refresh(preferences)

    return preferences

