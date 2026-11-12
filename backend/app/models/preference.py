from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.user import User


class SensoryPreference(Base):
    __tablename__ = "sensory_preferences"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    taste_preferences: Mapped[str | None] = mapped_column(Text)
    texture_preferences: Mapped[str | None] = mapped_column(Text)
    smell_sensitivity: Mapped[str | None] = mapped_column(String(100))
    temperature_preferences: Mapped[str | None] = mapped_column(String(100))
    appearance_preferences: Mapped[str | None] = mapped_column(Text)
    dietary_restrictions: Mapped[str | None] = mapped_column(Text)

    user: Mapped["User"] = relationship(back_populates="preference")