from datetime import timedelta, datetime
from pydantic import EmailStr

import jwt
from passlib.context import CryptContext

from app_backend.config import settings
from app_backend.users.dao import UsersDAO
from app_backend.users.models import Users
from app_backend.exceptions import IncorrectEmailOrPasswordException


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def encode_jwt(
        payload: dict,
        private_key: str = settings.auth_jwt.private_key_path.read_text(),
        algorithm: str = settings.auth_jwt.algorithm,
        expire_in_minutes: int = settings.auth_jwt.access_token_expires_minutes,
        expires_delta: timedelta | None = None
):
    to_encode = payload.copy()
    now = datetime.utcnow()
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=expire_in_minutes)
    to_encode.update(
        exp=expire,
        iat=now,
    )
    encoded = jwt.encode(
        payload,
        private_key,
        algorithm=algorithm,

    )
    return encoded


def decode_jwt(
        token: str,
        pub_key: str = settings.auth_jwt.public_key_path.read_text(),
        algorithm: str = settings.auth_jwt.algorithm,
):
    decoded = jwt.decode(token, pub_key, algorithms=[algorithm])
    return decoded


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


async def authenticate_user(email: EmailStr, password: str):
    user: Users = await UsersDAO.find_one_or_none(email=email)
    if not (user and verify_password(password, user.hashed_password)):
        raise IncorrectEmailOrPasswordException
    return user
