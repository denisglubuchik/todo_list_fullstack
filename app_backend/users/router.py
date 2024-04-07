from datetime import datetime

from fastapi import APIRouter, Response, Depends

from app_backend.users.models import Users
from app_backend.users.schemas import SUsersCreate, SUsers, SUsersAuth, TokenInfo
from app_backend.users.dao import UsersDAO
from app_backend.users.auth import get_password_hash, encode_jwt, authenticate_user
from app_backend.exceptions import UserAlreadyExistsException
from app_backend.users.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post('/register')
async def register(response: Response, user_data: SUsersCreate) -> TokenInfo:
    existing_user = await UsersDAO.find_one_or_none(email=user_data.email)
    if existing_user:
        raise UserAlreadyExistsException
    else:
        user: Users = await UsersDAO.insert(
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password),
            registered_at=datetime.utcnow()
        )

        jwt_payload = {
            "sub": user.id,
            "email": user.email,
        }
        access_token = encode_jwt(jwt_payload)
        response.set_cookie("access_token", access_token, httponly=True)

        return TokenInfo(
            access_token=access_token,
            token_type="Bearer",
        )


@router.post('/login')
async def login(response: Response, user_data: SUsersAuth) -> TokenInfo:
    user: Users = await authenticate_user(user_data.email, user_data.password)
    jwt_payload = {
        "sub": user.id,
        "email": user.email,
    }
    access_token = encode_jwt(jwt_payload)
    response.set_cookie("access_token", access_token, httponly=True)
    return TokenInfo(
        access_token=access_token,
        token_type="Bearer",
    )


@router.get('/logout')
async def logout(response: Response):
    response.delete_cookie("access_token")


@router.get('/me')
async def get_current_user(current_user: Users = Depends(get_current_user)):
    return current_user

