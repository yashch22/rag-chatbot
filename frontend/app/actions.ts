"use server"

import { revalidatePath } from "next/cache"

export async function chatWithBot(question: string, conversationId: string) {
  const response = await fetch("http://127.0.0.1:8000/api/chatbot/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      conversation_id: conversationId,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to send message")
  }

  const data = await response.json()
  return data.response
}

export async function uploadDocument(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("http://127.0.0.1:8000/api/chatbot/upload_document/", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload document")
  }

  const data = await response.json()
  revalidatePath("/")
  return data.message
}

