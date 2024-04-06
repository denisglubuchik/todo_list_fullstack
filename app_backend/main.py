from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app_backend.users.router import router as users_router
from app_backend.tasks.router import router as tasks_router

app = FastAPI()

app.include_router(users_router)
app.include_router(tasks_router)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers",
                   "Access-Control-Allow-Origin",
                   "Authorization"],
)

