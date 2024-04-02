from datetime import datetime

from fastapi import APIRouter

from app_backend.tasks.schemas import STask, STaskCreate, STaskUpdate
from app_backend.tasks.dao import TasksDAO

router = APIRouter(
    prefix='/tasks',
    tags = ['tasks']
)


@router.get('')
async def get_tasks() -> list[STask]:
    tasks = await TasksDAO.find_all()
    return tasks


@router.get('/{task_id}')
async def get_task(task_id: int) -> STask:
    task = await TasksDAO.find_by_id(model_id=task_id)
    return task


@router.post('')
async def create_task(task: STaskCreate):
    await TasksDAO.insert(
        owner=task.owner,
        last_change=datetime.utcnow(),
        title=task.title,
        description=task.description,
    )


@router.put('/{task_id}')
async def update_task(task_id: int, task: STaskUpdate) -> STask:
    if task.is_done:
        marked_done = datetime.utcnow()
    else:
        marked_done = None
    updated_task = await TasksDAO.update(
        model_id=task_id,

        owner=task.owner,
        last_change=datetime.utcnow(),
        title=task.title,
        description=task.description,
        is_done=task.is_done,
        marked_done=marked_done
    )
    return updated_task


@router.delete('/{task_id}')
async def delete_task(task_id: int):
    await TasksDAO.delete(model_id=task_id)

