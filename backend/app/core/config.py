import os
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    BASIC_AUTH_USER: str = os.getenv("BASIC_AUTH_USER")
    BASIC_AUTH_PASSWORD: str = os.getenv("BASIC_AUTH_PASSWORD")

    STATIC_DIR: str = str(Path(__file__).parent.parent.parent / "dist")

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")


settings = Settings()
