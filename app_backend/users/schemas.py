from pydantic import BaseModel, EmailStr
from datetime import date


class SUsers(BaseModel):
    id: int
    email: EmailStr
    hashed_password: str
    registered_at: date

    class Config:
        from_attributes = True

