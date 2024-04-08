from pydantic import BaseModel, EmailStr
from datetime import date


class SUsersCreate(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True


class SUsersAuth(SUsersCreate):
    pass


class SUsers(SUsersCreate):
    id: int
    registered_at: date

    class Config:
        from_attributes = True


class TokenInfo(BaseModel):
    access_token: str
    token_type: str
    email: EmailStr

