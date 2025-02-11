import os
import logging
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.memory import ConversationBufferMemory  
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import ConversationalRetrievalChain
from .service_factory.service_factory import ServiceFactory

# Set up logging for the chatbot service
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatbotService:
    def __init__(self, model_type="gemini"):

        # Use the factory to create the model and vector store
        logger.info("Initializing ChatbotService...")
        model_service = ServiceFactory.get_model_service(model_type)
        self.llm = model_service.get_llm()
        self.embeddings = model_service.get_embeddings()
        
        vector_store_service = ServiceFactory.get_vector_store_service(self.embeddings)
        self.vector_store = vector_store_service
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    def process_document(self, file_path):
        logger.info(f"Processing document: {file_path}")
        
        try:
            loader = PyPDFLoader(file_path)
            docs = loader.load()
            logger.info(f"Loaded {len(docs)} document(s).")
            
            # Split the document into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            splits = text_splitter.split_documents(docs)
            logger.info(f"Document split into {len(splits)} chunks.")
            
            # Add chunks to vector store
            self.vector_store.add_documents(splits)
            logger.info(f"Added {len(splits)} chunks to the vector store.")
            
            return len(splits)
        
        except Exception as e:
            logger.error(f"Error processing document: {e}")
            raise

    def get_response(self, question, conversation_id):
        logger.info(f"Getting response for question: {question} (conversation_id: {conversation_id})")
        
        template = """Use the following pieces of context and chat history to answer the question.
        
        Chat History:
        {chat_history}
        
        Context:
        {context}
        
        Question: {question}
        
        Answer:"""
        
        rag_prompt = PromptTemplate.from_template(template)
        retriever = self.vector_store.as_retriever()
        
        rag_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm, 
            retriever=retriever, 
            memory=self.memory,
            return_source_documents=False,
        )
        
        inputs = {
            "question": question,
            "chat_history": str(self.memory.buffer)
        }

        try:
            response = rag_chain.invoke(inputs)
            logger.info(f"Response generated: {response['answer']}")
            
            # Update memory with user and AI messages
            self.memory.chat_memory.add_user_message(question)
            self.memory.chat_memory.add_ai_message(response['answer'])

            return response['answer']
        
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            raise
