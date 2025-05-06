FROM --platform=linux/amd64 python:3.12-slim-bullseye

WORKDIR /app

# Poetryのインストール
RUN pip install poetry

# 依存関係のコピーとインストール
COPY pyproject.toml poetry.lock* ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

# アプリケーションコードのコピー
COPY app/ ./app/
COPY dist/ ./dist/
COPY main.py ./

# ポートの公開
EXPOSE 8080

# アプリケーションの起動（Gunicornを使用してUvicornワーカーを管理）
CMD ["gunicorn", "main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080", "--access-logfile", "-"]
