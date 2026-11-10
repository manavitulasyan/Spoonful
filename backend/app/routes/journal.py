
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.models.food import Food
from app.models.journal import FoodJournal
from app.models.user import User
from app.schemas.journal import (
    JournalCreate,
    JournalUpdate,
    JournalResponse,
)

router = APIRouter(prefix="/journal", tags=["Food Journal"])


@router.post(
    "/",
    response_model=JournalResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_journal_entry(
    entry_data: JournalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    food_name = entry_data.food_name.strip()

    if not food_name:
        raise HTTPException(
            status_code=400,
            detail="Food name cannot be empty.",
        )

    if entry_data.food_id is not None:
        food = db.get(Food, entry_data.food_id)

        if food is None:
            raise HTTPException(
                status_code=404,
                detail="Food not found in the food catalogue.",
            )

    entry = FoodJournal(
        user_id=current_user.id,
        food_name=food_name,
        food_id=entry_data.food_id,
        rating=entry_data.rating,
        notes=entry_data.notes,
        experienced_at=(
            entry_data.experienced_at or datetime.now(timezone.utc)
        ),
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry


@router.get("/", response_model=list[JournalResponse])
def get_journal_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(FoodJournal)
        .where(FoodJournal.user_id == current_user.id)
        .order_by(FoodJournal.experienced_at.desc())
    ).all()


@router.get("/{entry_id}", response_model=JournalResponse)
def get_journal_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entry = db.scalar(
        select(FoodJournal).where(
            FoodJournal.id == entry_id,
            FoodJournal.user_id == current_user.id,
        )
    )

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail="Journal entry not found.",
        )

    return entry


@router.patch("/{entry_id}", response_model=JournalResponse)
def update_journal_entry(
    entry_id: int,
    entry_data: JournalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entry = db.scalar(
        select(FoodJournal).where(
            FoodJournal.id == entry_id,
            FoodJournal.user_id == current_user.id,
        )
    )

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail="Journal entry not found.",
        )

    updates = entry_data.model_dump(exclude_unset=True)

    if not updates:
        raise HTTPException(
            status_code=400,
            detail="No update information provided.",
        )

    if "food_name" in updates:
        updates["food_name"] = updates["food_name"].strip()

        if not updates["food_name"]:
            raise HTTPException(
                status_code=400,
                detail="Food name cannot be empty.",
            )

    for field, value in updates.items():
        setattr(entry, field, value)

    db.commit()
    db.refresh(entry)

    return entry


@router.delete(
    "/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_journal_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entry = db.scalar(
        select(FoodJournal).where(
            FoodJournal.id == entry_id,
            FoodJournal.user_id == current_user.id,
        )
    )

    if entry is None:
        raise HTTPException(
            status_code=404,
            detail="Journal entry not found.",
        )

    db.delete(entry)
    db.commit()

    return None

