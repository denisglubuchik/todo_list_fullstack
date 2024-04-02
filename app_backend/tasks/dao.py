from sqlalchemy import select

from app_backend.dao.base import BaseDAO
from app_backend.tasks.models import Tasks
from app_backend.database import async_session_maker


class TasksDAO(BaseDAO):
    model = Tasks

    @classmethod
    async def get_tasks(cls, user_id):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(owner=user_id)
            res = await session.execute(query)
            return res.scalars().all()
