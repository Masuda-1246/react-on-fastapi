from sqlalchemy import Column, DateTime, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BlogPostModel(Base):
    """ブログ記事のデータベースモデル"""

    __tablename__ = "blog_posts"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime, nullable=True)
