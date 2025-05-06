from typing import Annotated, Any

from fastapi import APIRouter, Depends, FastAPI
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.security import HTTPBasicCredentials

from app.core.auth import get_current_username


def get_app() -> FastAPI:
    from main import app
    return app


docs_router = APIRouter()

@docs_router.get("/docs", include_in_schema=False)
async def get_swagger_documentation(
    _: Annotated[HTTPBasicCredentials, Depends(get_current_username)]
) -> None:
    return get_swagger_ui_html(openapi_url="/openapi.json", title="API Documentation")

@docs_router.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(
    _: Annotated[HTTPBasicCredentials, Depends(get_current_username)]
) -> None:
    return get_redoc_html(openapi_url="/openapi.json", title="API Documentation")

@docs_router.get("/openapi.json", include_in_schema=False)
def get_openapi_schema(
    _: Annotated[HTTPBasicCredentials, Depends(get_current_username)] = None,
    app: Annotated[FastAPI, Depends(get_app)] = None
) -> dict[str, Any]:
    return get_openapi(title=app.title, version=app.version, routes=app.routes)
