import secrets

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from .config import settings

basic = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(basic)) -> str:
    """Basic認証でユーザー名を取得する"""
    correct_username = settings.BASIC_AUTH_USER
    correct_password = settings.BASIC_AUTH_PASSWORD

    is_correct_username = secrets.compare_digest(credentials.username, correct_username)
    is_correct_password = secrets.compare_digest(credentials.password, correct_password)

    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=401,
            detail="認証情報が不正です",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username
