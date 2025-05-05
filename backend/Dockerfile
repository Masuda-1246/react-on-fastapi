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

# ポートの公開
EXPOSE 8080

# アプリケーションの起動
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
