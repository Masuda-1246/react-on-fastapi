from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os

app = FastAPI(title="FastAPI React Backend")

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 静的ファイルの提供設定
static_dir = Path(__file__).parent.parent.parent / "front" / "dist"
print(static_dir)
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

@app.get("/api")
async def root():
    return {"message": "Welcome to FastAPI React Backend"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # index.htmlを返す
    index_path = Path(__file__).parent.parent.parent / "front" / "dist" / "index.html"
    return FileResponse(index_path)