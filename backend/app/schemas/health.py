from pydantic import BaseModel


class HealthCheckResponse(BaseModel):
    """ヘルスチェックレスポンスモデル"""

    status: str
