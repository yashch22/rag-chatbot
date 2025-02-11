import os
import logging
from langchain_community.vectorstores import PGVector
# from vector_store_service import VectorStoreService
from abc import ABC, abstractmethod
# Set up logging
logger = logging.getLogger(__name__)


class VectorStoreService(ABC):
    @abstractmethod
    def add_documents(self, documents):
        """Method to add documents to the vector store."""
        pass

    @abstractmethod
    def as_retriever(self):
        """Method to return a retriever."""
        pass



class PGVectorStoreService(VectorStoreService):
    def __init__(self, embeddings):
        logger.info("Initializing PGVector Store...")
        # logger.info(f"Connection String Value: {os.getenv("PGVECTOR_CONNECTION_STRING"),}")

        self.vector_store = PGVector(
            connection_string=os.getenv("PGVECTOR_CONNECTION_STRING"),
            embedding_function=embeddings,
            collection_name="document_embeddings"
        )
        logger.info("PGVector Store initialized.")
        
    def add_documents(self, documents):
        logger.info(f"Adding {len(documents)} documents to the vector store...")
        self.vector_store.add_documents(documents)
        logger.info("Documents added to vector store successfully.")
        
    def as_retriever(self):
        return self.vector_store.as_retriever(search_kwargs={"k": 3})
