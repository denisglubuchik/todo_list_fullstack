from typing import Optional

from pydantic import BaseModel
from datetime import datetime


class STask(BaseModel):
    id: int
    owner: int
    last_change: datetime
    title: str
    description: str
    is_done: bool
    marked_done: Optional[datetime]

    class Config:
        from_attributes = True


class STaskCreate(BaseModel):
    title: str
    description: str

    class Config:
        from_attributes = True


class STaskUpdate(STaskCreate):
    is_done: bool
