// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversationId = useRef(Date.now().toString())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef]) // Added messagesEndRef to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { content: userMessage, isBot: false }])
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          conversation_id: conversationId.current,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages((prev) => [...prev, { content: data.response, isBot: true }])
      } else {
        setMessages((prev) => [...prev, { content: "Error: " + data.error, isBot: true }])
      }
    } catch (error) {
      setMessages((prev) => [...prev, { content: "Error: " + error.message, isBot: true }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[700px]">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] rounded-2xl p-4 ${
                  message.isBot ? "bg-gray-100 text-gray-800" : "bg-purple-600 text-white"
                }`}
              >
                {message.isBot ? <Bot className="w-6 h-6 mt-1" /> : <User className="w-6 h-6 mt-1" />}
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-gray-100 rounded-full p-3 text-gray-800">
              <div className="dot-flashing"></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

