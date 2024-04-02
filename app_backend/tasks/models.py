from datetime import datetime

from app_backend.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func, Boolean


class Tasks(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    owner = Column(ForeignKey("users.id"))
    last_change = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_done = Column(Boolean, default=False)
    marked_done = Column(TIMESTAMP, nullable=True)