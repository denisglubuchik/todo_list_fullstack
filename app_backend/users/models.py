from datetime import datetime

from app_backend.database import Base
from sqlalchemy import Column, Integer, String, Date


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String(length=1024), nullable=False)
    registered_at = Column(Date, default=datetime.utcnow())
