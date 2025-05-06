import uuid
from datetime import datetime, UTC

from sqlalchemy.orm import Session

from app.models.blog import BlogPostModel
from app.schemas.blog import BlogPostCreate, BlogPostUpdate


def get_blog_posts(db: Session) -> list[BlogPostModel]:
    """すべてのブログ記事を取得する"""
    return db.query(BlogPostModel).all()

def get_blog_post(db: Session, post_id: str) -> BlogPostModel | None:
    """指定されたIDのブログ記事を取得する"""
    return db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()

def create_blog_post(db: Session, post: BlogPostCreate) -> BlogPostModel:
    """新しいブログ記事を作成する"""
    now = datetime.now(UTC)
    post_id = str(uuid.uuid4())

    db_post = BlogPostModel(
        id=post_id,
        title=post.title,
        content=post.content,
        author=post.author,
        created_at=now,
        updated_at=now
    )

    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post

def update_blog_post(db: Session, post_id: str, post: BlogPostUpdate) -> BlogPostModel:
    """既存のブログ記事を更新する"""
    db_post = get_blog_post(db, post_id)
    if not db_post:
        return None

    update_data = post.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_post, key, value)

    db_post.updated_at = datetime.now(UTC)
    db.commit()
    db.refresh(db_post)

    return db_post

def delete_blog_post(db: Session, post_id: str) -> bool:
    """ブログ記事を削除する"""
    db_post = get_blog_post(db, post_id)
    if not db_post:
        return False

    db.delete(db_post)
    db.commit()

    return True
