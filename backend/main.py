from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pathlib import Path
import os
import secrets
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

load_dotenv()

# データベース接続設定
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/postgres")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# データベースモデル
class BlogPostModel(Base):
    __tablename__ = "blog_posts"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime, nullable=True)

# データベースを初期化（アプリケーションの起動時に実行されます）
def init_db():
    Base.metadata.create_all(bind=engine)

# アプリケーション起動時にデータベースを初期化
init_db()

# 依存関係
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI(
    title="FastAPI React Backend",
    docs_url=None,  # デフォルトの/docsを無効化
    redoc_url=None  # デフォルトの/redocを無効化
)

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 認証関連
basic = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(basic)):
    correct_username = os.getenv("BASIC_AUTH_USERNAME")
    correct_password = os.getenv("BASIC_AUTH_PASSWORD")
    correct_username = secrets.compare_digest(credentials.username, correct_username)
    correct_password = secrets.compare_digest(credentials.password, correct_password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# APIドキュメント用のカスタムルート（Basic認証付き）
@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation(credentials: HTTPBasicCredentials = Depends(get_current_username)):
    from fastapi.openapi.docs import get_swagger_ui_html
    return get_swagger_ui_html(openapi_url="/openapi.json", title="API Documentation")

@app.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(credentials: HTTPBasicCredentials = Depends(get_current_username)):
    from fastapi.openapi.docs import get_redoc_html
    return get_redoc_html(openapi_url="/openapi.json", title="API Documentation")

@app.get("/openapi.json", include_in_schema=False)
async def get_openapi_schema(credentials: HTTPBasicCredentials = Depends(get_current_username)):
    from fastapi.openapi.utils import get_openapi
    openapi_schema = get_openapi(title=app.title, version="1.0.0", routes=app.routes)
    return openapi_schema

# API関連のエンドポイント
@app.get("/api")
async def root():
    return {"message": "Welcome to FastAPI React Backend"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


# ブログ記事のモデル定義
class BlogPost(BaseModel):
    id: str
    title: str
    content: str
    author: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class BlogPostCreate(BaseModel):
    title: str
    content: str
    author: str

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None

# ブログ記事のCRUDエンドポイント
@app.post("/api/blog", response_model=BlogPost)
async def create_blog_post(blog_post: BlogPostCreate, db: Session = Depends(get_db)):
    now = datetime.now()
    post_id = str(uuid.uuid4())
    db_post = BlogPostModel(
        id=post_id,
        title=blog_post.title,
        content=blog_post.content,
        author=blog_post.author,
        created_at=now,
        updated_at=now
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/api/blog", response_model=List[BlogPost])
async def get_all_blog_posts(db: Session = Depends(get_db)):
    return db.query(BlogPostModel).all()

@app.get("/api/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str, db: Session = Depends(get_db)):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    return db_post

@app.put("/api/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, blog_update: BlogPostUpdate, db: Session = Depends(get_db)):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    
    update_data = blog_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_post, key, value)
    
    db_post.updated_at = datetime.now()
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/api/blog/{post_id}")
async def delete_blog_post(post_id: str, db: Session = Depends(get_db)):
    db_post = db.query(BlogPostModel).filter(BlogPostModel.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="ブログ記事が見つかりません")
    
    db.delete(db_post)
    db.commit()
    return {"message": "ブログ記事が削除されました"}

# 静的ファイルの提供設定
static_dir = Path(__file__).parent / "dist"
if os.path.exists(static_dir):
    # 静的アセットの提供
    if os.path.exists(static_dir / "assets"):
        app.mount("/assets", StaticFiles(directory=static_dir / "assets"), name="assets")
    
    # faviconとして使用するvite.svgファイルの提供（認証なし）
    @app.get("/vite.svg", include_in_schema=False)
    async def get_favicon():
        favicon_path = static_dir / "vite.svg"
        if os.path.exists(favicon_path):
            return FileResponse(favicon_path)
        raise HTTPException(status_code=404, detail="Favicon not found")
    
    # SPAのフォールバックルート
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str, credentials: HTTPBasicCredentials = Depends(get_current_username)):
        # /api/ で始まるパスは既に上のルートで処理されているはず
        index_path = static_dir / "index.html"
        if os.path.exists(index_path):
            return FileResponse(index_path)
        raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    import uvicorn
    # distディレクトリの絶対パスを取得
    dist_dir = str(Path(__file__).parent / "dist")
    print(dist_dir)
    uvicorn.run(
        "main:app", 
        host="127.0.0.1", 
        port=8080, 
        reload=True,
    )