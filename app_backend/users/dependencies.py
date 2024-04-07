from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from jwt.exceptions import InvalidTokenError, ExpiredSignatureError

from app_backend.exceptions import TokenDoesntExistsException, UserIsNotPresentException, TokenExpiredException, IncorrectTokenFormatException
from app_backend.users.dao import UsersDAO
from app_backend.users.auth import decode_jwt

http_bearer = HTTPBearer()


def get_token(
        credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
):
    token = credentials.credentials
    if not token:
        raise TokenDoesntExistsException
    else:
        return token


async def get_current_user(token: str = Depends(get_token)):
    try:
        payload = decode_jwt(token)
    except ExpiredSignatureError:
        raise TokenExpiredException
    except InvalidTokenError:
        raise IncorrectTokenFormatException

    user_id: str = payload.get("sub")
    if not user_id:
        raise UserIsNotPresentException
    user = await UsersDAO.find_by_id(int(user_id))
    if not user:
        raise UserIsNotPresentException
    return user
