from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pathlib import Path
import os
import secrets
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="FastAPI React Backend")

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API関連のエンドポイント
@app.get("/api")
async def root():
    return {"message": "Welcome to FastAPI React Backend"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

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

# 静的ファイルの提供設定
static_dir = Path(__file__).parent.parent.parent / "front" / "dist"
if os.path.exists(static_dir):
    # 静的アセットの提供
    if os.path.exists(static_dir / "assets"):
        app.mount("/assets", StaticFiles(directory=static_dir / "assets"), name="assets")
    
    # SPAのフォールバックルート
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str, credentials: HTTPBasicCredentials = Depends(get_current_username)):
        # /api/ で始まるパスは既に上のルートで処理されているはず
        index_path = static_dir / "index.html"
        if os.path.exists(index_path):
            return FileResponse(index_path)
        raise HTTPException(status_code=404, detail="File not found")

