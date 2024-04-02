from pydantic import BaseModel
from datetime import date


class Task(BaseModel):
    id: int
    owner: int
    last_change: date
    title: str
    description: str
    is_done: bool
    marked_done_at: date

    class Config:
        from_attributes = True
