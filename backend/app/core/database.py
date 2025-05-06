import os
from collections.abc import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

# 環境変数の読み込み
load_dotenv()

# データベース接続設定
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/postgres")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 依存関係
def get_db() -> Generator[Session, None, None]:
    """リクエストごとに新しいDBセッションを作成し、リクエスト終了時に閉じます"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# データベース初期化
def init_db() -> None:
    """アプリケーション起動時にテーブルを作成します"""
    from app.models import Base
    Base.metadata.create_all(bind=engine)
