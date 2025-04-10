FROM node:23-alpine3.20 AS front-base
FROM python:3.13-alpine AS backend-base

# フロントエンドのベース
FROM front-base AS front-builder

WORKDIR /app
COPY ./front/package.json ./front/package-lock.json ./front/
WORKDIR /app/front
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci

COPY ./front ./
RUN npm run build

# バックエンドのベース
FROM backend-base AS backend-builder

WORKDIR /app

# ビルド環境のための依存関係
RUN apk add --no-cache gcc musl-dev libffi-dev

# Poetryのインストール
RUN pip install --no-cache-dir poetry

# 依存関係の管理
COPY ./backend/pyproject.toml ./backend/poetry.lock* ./backend/
WORKDIR /app/backend
RUN poetry config virtualenvs.create false && \
    poetry install --only main --no-interaction --no-ansi

# アプリケーションコードのコピー
COPY ./backend ./

# 最終イメージ
FROM backend-base AS final

WORKDIR /app

# ビルド環境のための依存関係
RUN apk add --no-cache libffi

# Poetryのインストール
RUN pip install --no-cache-dir poetry

# プロジェクト構造を作成
RUN mkdir -p /app/backend
RUN mkdir -p /app/front/dist

# バックエンドのファイルコピー
COPY ./backend /app/backend

# 依存関係のインストール
WORKDIR /app/backend
RUN poetry config virtualenvs.create false && \
    poetry install --only main --no-interaction --no-ansi

# フロントエンドのビルド成果物をコピー
COPY --from=front-builder /app/front/dist /app/front/dist

# 環境変数を設定
ENV PYTHONPATH=/app
ENV PORT=8000

# ポートを公開
EXPOSE 8000

# 起動コマンド
WORKDIR /app
CMD ["poetry", "run", "--directory=./backend", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
