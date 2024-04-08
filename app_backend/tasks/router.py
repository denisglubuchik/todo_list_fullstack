from datetime import datetime

from fastapi import APIRouter, Depends

from app_backend.tasks.schemas import STask, STaskCreate, STaskUpdate
from app_backend.tasks.dao import TasksDAO
from app_backend.users.dependencies import get_current_user
from app_backend.users.models import Users
from app_backend.exceptions import TaskDoesntBelongToYouException, TaskDoesntExistException

router = APIRouter(
    prefix='/tasks',
    tags=['tasks']
)


@router.get('')
async def get_tasks(current_user: Users = Depends(get_current_user)) -> list[STask]:
    tasks = await TasksDAO.get_tasks(current_user.id)
    return tasks


# @router.get('')
# async def get_tasks() -> list[STask]:
#     tasks = await TasksDAO.find_all()
#     return tasks


@router.get('/{task_id}')
async def get_task(task_id: int, current_user: Users = Depends(get_current_user)) -> STask:
    task = await TasksDAO.find_by_id(model_id=task_id)
    if not task:
        raise TaskDoesntExistException
    if task.owner != current_user.id:
        raise TaskDoesntBelongToYouException
    return task


@router.post('')
async def create_task(task: STaskCreate, current_user: Users = Depends(get_current_user)):
    await TasksDAO.insert(
        owner=current_user.id,
        last_change=datetime.utcnow(),
        title=task.title,
        description=task.description,
    )


@router.put('/{task_id}')
async def update_task(task_id: int, task: STaskUpdate, current_user: Users = Depends(get_current_user)) -> STask:
    task_before_update = await TasksDAO.find_by_id(task_id)
    if not task_before_update:
        raise TaskDoesntExistException
    if task_before_update.owner != current_user.id:
        raise TaskDoesntBelongToYouException

    if task.is_done:
        marked_done = datetime.utcnow()
    else:
        marked_done = None
    updated_task = await TasksDAO.update(
        model_id=task_id,

        last_change=datetime.utcnow(),
        title=task.title,
        description=task.description,
        is_done=task.is_done,
        marked_done=marked_done
    )
    return updated_task


@router.delete('/{task_id}')
async def delete_task(task_id: int, current_user: Users = Depends(get_current_user)):
    task = await TasksDAO.find_by_id(task_id)
    if not task:
        raise TaskDoesntExistException
    if task.owner != current_user.id:
        raise TaskDoesntBelongToYouException
    await TasksDAO.delete(model_id=task_id)

