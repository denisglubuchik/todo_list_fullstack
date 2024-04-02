from datetime import datetime

from fastapi import APIRouter, Response, Depends

from app_backend.users.models import Users
from app_backend.users.schemas import SUsersCreate, SUsers, SUsersAuth
from app_backend.users.dao import UsersDAO
from app_backend.users.auth import get_password_hash, create_access_token, authenticate_user
from app_backend.exceptions import UserAlreadyExistsException
from app_backend.users.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post('/register')
async def register(user_data: SUsersCreate):
    existing_user = await UsersDAO.find_one_or_none(email=user_data.email)
    if existing_user:
        raise UserAlreadyExistsException
    else:
        await UsersDAO.insert(
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password),
            registered_at=datetime.utcnow()
        )


@router.post('/login')
async def login(response: Response, user_data: SUsersAuth):
    user = await authenticate_user(user_data.email, user_data.password)
    access_token = create_access_token({"sub": str(user.id)})
    response.set_cookie("access_token", access_token, httponly=True)
    return {"access_token": access_token}


@router.get('/logout')
async def logout(response: Response):
    response.delete_cookie("access_token")


@router.get('/me')
async def get_current_user(current_user: Users = Depends(get_current_user)):
    return current_user

