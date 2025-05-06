import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.api.docs import docs_router
from app.api.frontend import frontend_router, setup_static_files
from app.api.v1 import api_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# アプリケーションの初期化
app = FastAPI(
    title="FastAPI React Backend",
    version="1.0.0",
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

# APIルーターの登録
app.include_router(api_router, prefix="/api")

# APIドキュメント用ルーターの登録
app.include_router(docs_router)
# OpenAPIスキーマの設定を更新
@app.on_event("startup")
async def startup_event() -> None:
    # OpenAPIスキーマ生成関数にappオブジェクトを渡すためのセットアップ
    app.openapi = lambda: get_openapi(title=app.title, version=app.version, routes=app.routes)

# 静的ファイルの提供設定
static_dir = Path(__file__).parent / "dist"
if Path(static_dir).exists():
    # 静的ファイルのマウントとフロントエンドルーターの設定
    setup_static_files(app)

    # フロントエンドルーターを登録
    app.include_router(frontend_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8080,
        reload=True,
    )
