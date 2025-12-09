from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    is_admin: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=False)

    enrollments: Mapped[list["Enrollment"]] = relationship(back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_admin": self.is_admin
        }


class Course(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(220), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=True)
    author: Mapped["User"] = relationship()

    enrollments: Mapped[list["Enrollment"]] = relationship(back_populates="course")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "created_at": self.created_at.strftime("%Y-%m-%d"),
        }


class Enrollment(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    course_id: Mapped[int] = mapped_column(ForeignKey("course.id"))
    purchased_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="enrollments")
    course: Mapped["Course"] = relationship(back_populates="enrollments")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "course_id": self.course_id,
            "purchased_at": self.purchased_at.strftime("%Y-%m-%d %H:%M"),
        }
