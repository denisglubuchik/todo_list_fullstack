from pydantic import BaseModel, EmailStr
from datetime import date


class SUsersCreate(BaseModel):
    id: int
    email: EmailStr
    password: str

    class Config:
        from_attributes = True


class SUsersAuth(SUsersCreate):
    pass


class SUsers(SUsersCreate):
    registered_at: date

    class Config:
        from_attributes = True

