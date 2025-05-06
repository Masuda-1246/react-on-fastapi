
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud import blog
from app.schemas.blog import BlogPost, BlogPostCreate, BlogPostUpdate
from app.schemas.health import HealthCheckResponse

router = APIRouter()

@router.post("/")
async def create_blog_post(post: BlogPostCreate, db: Annotated[Session, Depends(get_db)]) -> BlogPost:
    """新しいブログ記事を作成する"""
    return blog.create_blog_post(db, post)

@router.get("/")
async def get_all_blog_posts(db: Annotated[Session, Depends(get_db)]) -> list[BlogPost]:
    """すべてのブログ記事を取得する"""
    return blog.get_blog_posts(db)

@router.get("/{post_id}")
async def get_blog_post(post_id: str, db: Annotated[Session, Depends(get_db)]) -> BlogPost:
    """指定されたIDのブログ記事を取得する"""
    db_post = blog.get_blog_post(db, post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    return db_post

@router.put("/{post_id}")
async def update_blog_post(post_id: str, post: BlogPostUpdate, db: Annotated[Session, Depends(get_db)]) -> BlogPost:
    """既存のブログ記事を更新する"""
    db_post = blog.update_blog_post(db, post_id, post)
    if db_post is None:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    return db_post

@router.delete("/{post_id}")
async def delete_blog_post(post_id: str, db: Annotated[Session, Depends(get_db)]) -> HealthCheckResponse:
    """ブログ記事を削除する"""
    result = blog.delete_blog_post(db, post_id)
    if not result:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    return HealthCheckResponse(status="ok")
