from app_backend.dao.base import BaseDAO
from app_backend.users.models import Users


class UsersDAO(BaseDAO):
    model = Users
