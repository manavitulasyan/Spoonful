
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.food import Food


class SavedFood(Base):
    __tablename__ = "saved_foods"

    __table_args__ = (
        UniqueConstraint("user_id", "food_id", name="uq_user_saved_food"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    food_id: Mapped[int] = mapped_column(
        ForeignKey("foods.id", ondelete="CASCADE"),
        nullable=False
    )

    notes: Mapped[str | None] = mapped_column(String(500))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="saved_foods")
    food: Mapped["Food"] = relationship(back_populates="saved_by")

