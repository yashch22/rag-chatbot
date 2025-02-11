from .llm_models import GeminiModelService,ModelService
from .vector_store import PGVectorStoreService,VectorStoreService

class ServiceFactory:
    @staticmethod
    def get_model_service(model_type: str) -> ModelService:
        if model_type == "gemini":
            return GeminiModelService()
        else:
            raise ValueError(f"Unsupported model type: {model_type}")

    @staticmethod
    def get_vector_store_service(embeddings) -> VectorStoreService:
        return PGVectorStoreService(embeddings)
