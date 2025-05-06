from fastapi import APIRouter

from app.schemas.health import HealthCheckResponse

router = APIRouter()

@router.get("/health")
async def health_check() -> HealthCheckResponse:
    return HealthCheckResponse(status="ok")
