from fastapi import HTTPException, status


class TasksException(HTTPException):
    status_code = 500
    detail = ""

    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)


class IncorrectEmailOrPasswordException(TasksException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect Email or Password"


class UserAlreadyExistsException(TasksException):
    status_code = status.HTTP_409_CONFLICT
    detail = "User already exists"


class TokenDoesntExistsException(TasksException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Token doesn't exists"


class TokenExpiredException(TasksException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Token expired"


class IncorrectTokenFormatException(TasksException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect token format"


class UserIsNotPresentException(TasksException):
    status_code = status.HTTP_401_UNAUTHORIZED


class TaskDoesntBelongToYouException(TasksException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Task doesn't belong to you"


class TaskDoesntExistException(TasksException):
    status_code = status.HTTP_400_BAD_REQUEST
    detail = "Task doesn't exist"
