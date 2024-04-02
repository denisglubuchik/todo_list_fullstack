from fastapi import FastAPI

from app_backend.users.router import router as users_router
from app_backend.tasks.router import router as tasks_router

app = FastAPI()

app.include_router(users_router)
app.include_router(tasks_router)


