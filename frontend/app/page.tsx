import ChatInterface from "@/components/ChatInterface"
import FileUpload from "@/components/FileUpload"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-50 p-8 border-r border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
              <Sparkles className="w-8 h-8 mr-2 text-purple-500" />
              AI Chatbot
            </h1>
            <FileUpload />
          </div>
          <div className="w-full md:w-2/3">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  )
}

