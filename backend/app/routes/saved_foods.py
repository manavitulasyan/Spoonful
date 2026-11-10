
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.food import Food
from app.models.saved_food import SavedFood
from app.schemas.saved_food import (
    SavedFoodCreate,
    SavedFoodUpdate,
    SavedFoodResponse,
)

router = APIRouter(prefix="/saved-foods", tags=["Saved Foods"])


@router.post(
    "/",
    response_model=SavedFoodResponse,
    status_code=status.HTTP_201_CREATED,
)
def save_food(
    food_data: SavedFoodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    food_name = food_data.food_name.strip()

    if not food_name:
        raise HTTPException(
            status_code=400,
            detail="Food name cannot be empty.",
        )

    food = db.scalar(
        select(Food).where(func.lower(Food.name) == food_name.lower())
    )

    if food is None:
        food = Food(
            name=food_name,
            category=food_data.category,
            description=food_data.description,
        )
        db.add(food)
        db.flush()

    existing = db.scalar(
        select(SavedFood).where(
            SavedFood.user_id == current_user.id,
            SavedFood.food_id == food.id,
        )
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This food is already saved.",
        )

    saved_food = SavedFood(
        user_id=current_user.id,
        food_id=food.id,
        notes=food_data.notes,
    )

    db.add(saved_food)

    try:
        db.commit()
        db.refresh(saved_food)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This food is already saved or could not be added.",
        )

    return db.scalar(
        select(SavedFood)
        .options(joinedload(SavedFood.food))
        .where(SavedFood.id == saved_food.id)
    )


@router.get("/", response_model=list[SavedFoodResponse])
def get_saved_foods(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(SavedFood)
        .options(joinedload(SavedFood.food))
        .where(SavedFood.user_id == current_user.id)
        .order_by(SavedFood.created_at.desc())
    ).unique().all()


@router.get("/{saved_food_id}", response_model=SavedFoodResponse)
def get_saved_food(
    saved_food_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    saved_food = db.scalar(
        select(SavedFood)
        .options(joinedload(SavedFood.food))
        .where(
            SavedFood.id == saved_food_id,
            SavedFood.user_id == current_user.id,
        )
    )

    if not saved_food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Saved food not found.",
        )

    return saved_food


@router.patch("/{saved_food_id}", response_model=SavedFoodResponse)
def update_saved_food(
    saved_food_id: int,
    food_data: SavedFoodUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    saved_food = db.scalar(
        select(SavedFood)
        .options(joinedload(SavedFood.food))
        .where(
            SavedFood.id == saved_food_id,
            SavedFood.user_id == current_user.id,
        )
    )

    if not saved_food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Saved food not found.",
        )

    updates = food_data.model_dump(exclude_unset=True)

    if not updates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update information provided.",
        )

    for field, value in updates.items():
        setattr(saved_food, field, value)

    db.commit()
    db.refresh(saved_food)

    return saved_food


@router.delete(
    "/{saved_food_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_saved_food(
    saved_food_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    saved_food = db.scalar(
        select(SavedFood).where(
            SavedFood.id == saved_food_id,
            SavedFood.user_id == current_user.id,
        )
    )

    if not saved_food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Saved food not found.",
        )

    db.delete(saved_food)
    db.commit()

    return None
