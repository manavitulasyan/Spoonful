
from datetime import datetime

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.saved_food import SavedFood
    from app.models.journal import FoodJournal


class Food(Base):
    __tablename__ = "foods"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(
        String(150), unique=True, index=True, nullable=False
    )
    category: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    saved_by: Mapped[list["SavedFood"]] = relationship(
        back_populates="food"
    )
    journal_entries: Mapped[list["FoodJournal"]] = relationship(
        back_populates="food"
    )

