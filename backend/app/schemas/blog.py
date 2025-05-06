from datetime import datetime

from pydantic import BaseModel


class BlogPostBase(BaseModel):
    """ブログ記事の基本モデル"""

    title: str
    content: str
    author: str

class BlogPostCreate(BlogPostBase):
    """ブログ記事作成モデル"""


class BlogPostUpdate(BaseModel):
    """ブログ記事更新モデル（すべてのフィールドは省略可能）"""

    title: str | None = None
    content: str | None = None
    author: str | None = None

class BlogPost(BlogPostBase):
    """ブログ記事レスポンスモデル"""

    id: str
    created_at: datetime
    updated_at: datetime | None = None
