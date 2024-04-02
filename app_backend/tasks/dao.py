from app_backend.dao.base import BaseDAO
from app_backend.tasks.models import Tasks


class TasksDAO(BaseDAO):
    model = Tasks
