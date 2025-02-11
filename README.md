# AI RAG Chatbot

A modern RAG (Retrieval-Augmented Generation) chatbot application that allows users to upload PDF documents and chat with an AI about their contents. Built with Next.js, Django, and Google's Gemini Pro.

## 🚀 Tech Stack

### Frontend
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) Next.js 14
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) TailwindCSS
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) TypeScript
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) Framer Motion

### Backend
- ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) Django
- ![DRF](https://img.shields.io/badge/Django_REST_Framework-092E20?style=for-the-badge&logo=django&logoColor=white) Django REST Framework
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) PostgreSQL with pgvector
- ![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white) LangChain
- ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white) Google Gemini Pro

### DevOps
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) Docker
- ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white) Docker Compose

## 🛠️ Installation

### Prerequisites
- Docker and Docker Compose installed
- Google Gemini API key

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd rag-chatbot
```

2. Set up environment variables:

Copy the example environment file
cp .env.example .env
Edit .env and replace 'your_google_api_key' with your actual Google Gemini API key

3. Start the application using Docker Compose:

```bash
docker-compose up --build
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 🌟 Features

- PDF document upload and processing
- Real-time chat interface with AI
- Document-based context for accurate responses
- Responsive design
- Vector similarity search for relevant document chunks
- Conversation memory for contextual responses

## 🔧 Development

This project uses a microservice architecture with a Django backend and a Next.js frontend.  The project structure is as follows:

```
rag-chatbot/
├── backend/               # Django REST API backend
│   ├── chatbot/           # Core chatbot logic
│   │   ├── services.py    # Chatbot services (LLM interaction, vector store)
│   │   └── ...            # Other chatbot modules
│   ├── ...                # Other backend modules
│   └── requirements.txt   # Backend dependencies
├── frontend/          # Next.js frontend application
│   ├── app/               # Main application directory
│   │   └── ...            # Frontend components and pages
│   └── components/        # Reusable UI components
└── docker-compose.yml     # Docker Compose configuration for the entire application
```


