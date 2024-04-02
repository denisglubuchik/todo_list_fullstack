from datetime import datetime

from app_backend.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Date, func, Boolean


class Tasks(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    owner = Column(ForeignKey("users.id"))
    last_change = Column(Date, default=datetime.utcnow(), onupdate=func.now())
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_done = Column(Boolean, default=False)
    marked_done = Column(Date, default=False)