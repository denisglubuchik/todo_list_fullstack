from sqlalchemy import select, insert, update, delete

from app_backend.database import async_session_maker


class BaseDAO:
    model = None

    @classmethod
    async def find_by_id(cls, model_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=model_id)
            res = await session.execute(query)
            return res.scalar_one_or_none()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            res = await session.execute(query)
            return res.scalar_one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            res = await session.execute(query)
            return res.scalars().all()

    @classmethod
    async def insert(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data)
            await session.execute(query)
            await session.commit()

    @classmethod
    async def update(cls, model_id: int, **data):
        async with async_session_maker() as session:
            query = update(cls.model).where(id=model_id).values(**data)
            res = await session.execute(query)
            await session.commit()
            return res.scalar_one_or_none()

    @classmethod
    async def delete(cls, model_id: int):
        async with async_session_maker() as session:
            query = delete(cls.model).where(id=model_id)
            await session.execute(query)
            await session.commit()

