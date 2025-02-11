// @ts-nocheck
"use client"

import { useState } from "react"
import { Upload, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function FileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setIsUploading(true)
    setMessage("")

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chatbot/upload_document/", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Success: ${data.message}`)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 mb-4 text-purple-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf"
            disabled={isUploading}
          />
        </label>
      </div>
      {isUploading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center text-purple-600"
        >
          <div className="dot-flashing"></div>
          <p className="ml-2">Uploading...</p>
        </motion.div>
      )}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center ${message.startsWith("Error") ? "text-red-600" : "text-green-600"}`}
        >
          {message.startsWith("Error") ? (
            <XCircle className="w-5 h-5 mr-2" />
          ) : (
            <CheckCircle className="w-5 h-5 mr-2" />
          )}
          {message}
        </motion.p>
      )}
    </div>
  )
}

