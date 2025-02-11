import logging
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
# from model_service import ModelService
from abc import ABC, abstractmethod
# Set up logging
logger = logging.getLogger(__name__)

class ModelService(ABC):
    @abstractmethod
    def get_llm(self):
        """Method to get the LLM model."""
        pass

    @abstractmethod
    def get_embeddings(self):
        """Method to get the embeddings model."""
        pass



class GeminiModelService(ModelService):
    def __init__(self):
        logger.info("Initializing Gemini Model...")
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro")
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        logger.info("Gemini Model initialized with gemini-1.5-pro and embedding-001.")
    
    def get_llm(self):
        return self.llm

    def get_embeddings(self):
        return self.embeddings
