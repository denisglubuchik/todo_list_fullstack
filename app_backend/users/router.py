from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post('/register')
async def register():
    pass


@router.get('/me')
async def get_current_user():
    pass


@router.post('/login')
async def login():
    pass


@router.get('/logout')
async def logout():
    pass

