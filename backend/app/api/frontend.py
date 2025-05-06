import logging
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.security import HTTPBasicCredentials
from fastapi.staticfiles import StaticFiles

from app.core.auth import get_current_username

logger = logging.getLogger(__name__)

# フロントエンドルーターの作成
frontend_router = APIRouter(include_in_schema=False)

# 静的ファイルのパス
static_dir = Path(__file__).parents[2] / "dist"

# faviconとして使用するvite.svgファイルの提供（認証なし）
@frontend_router.get("/vite.svg")
async def get_favicon() -> FileResponse:
    favicon_path = static_dir / "vite.svg"
    if Path.exists(favicon_path):
        return FileResponse(favicon_path)
    logger.exception("Favicon not found")
    raise HTTPException(status_code=404, detail="Favicon not found")

# SPAのフォールバックルート
@frontend_router.get("/{full_path:path}")
async def serve_react_app(_: Annotated[HTTPBasicCredentials, Depends(get_current_username)]) -> FileResponse:
    # /api/ で始まるパスは既に上のルートで処理されているはず
    index_path = static_dir / "index.html"
    if Path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="File not found")

# 静的ファイルのマウント
def setup_static_files(app: FastAPI) -> None:
    """静的ファイルをアプリケーションにマウントします"""
    # 静的アセットの提供
    if Path(static_dir).exists() and Path(static_dir / "assets").exists():
        app.mount("/assets", StaticFiles(directory=static_dir / "assets"), name="assets")
