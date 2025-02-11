from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.files.storage import default_storage
from .models import Document, ChatMessage
from .services import ChatbotService

class ChatbotViewSet(viewsets.ViewSet):
    chatbot_service = ChatbotService()

    @action(detail=False, methods=['POST'])
    def upload_document(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
            
        file = request.FILES['file']
        file_path = default_storage.save(f'documents/{file.name}', file)
        
        document = Document.objects.create(
            title=file.name,
            file=file_path
        )
        
        try:
            chunks_processed = self.chatbot_service.process_document(file_path)
            return Response({
                'message': f'Document processed successfully. {chunks_processed} chunks created.',
                'document_id': document.id
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['POST'])
    def chat(self, request):
        question = request.data.get('question')
        conversation_id = request.data.get('conversation_id')

        if not question or not conversation_id:
            return Response({'error': 'Question and conversation_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get the response from the service
            response = self.chatbot_service.get_response(question, conversation_id)
            
            # Save user and bot messages
            ChatMessage.objects.create(content=question, is_bot=False, conversation_id=conversation_id)
            ChatMessage.objects.create(content=response, is_bot=True, conversation_id=conversation_id)
            
            return Response({'response': response})
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)