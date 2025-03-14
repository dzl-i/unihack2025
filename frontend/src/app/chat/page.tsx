"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, Send, Search, Menu, X } from "lucide-react"
import { useState } from "react"
import ChatMessage from "@/components/chat-message"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      role: "bot",
      content: "Hello Ici Pino Ta",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      role: "bot",
      content: "What can I help you with today?",
      timestamp: new Date().toISOString(),
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    setChatHistory([
      ...chatHistory,
      {
        id: chatHistory.length + 1,
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      },
    ])

    // Clear input
    setMessage("")

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "bot",
          content:
            "I'm analyzing your documents to find the best answer. This is a simulated response for the UI demo.",
          timestamp: new Date().toISOString(),
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 hidden md:block">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-1">
            <div className="bg-primary rounded-md p-1">
              <LockIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs text-white font-medium">AppNotes</span>
          </div>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search..." className="pl-8 bg-muted border-gray-700 text-white" />
          </div>

          <nav>
            <div className="mb-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase px-2 mb-2">Recent Chats</h3>
              <ul className="space-y-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted text-sm text-white"
                  >
                    <span>Chat with AppNotes {item}</span>
                    <span className="text-red-500 text-xs">×</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase px-2 mb-2">Your Documents</h3>
              <ul className="space-y-1">
                {[1, 2, 3].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted text-sm text-white"
                  >
                    <span>Document {item}.pdf</span>
                    <span className="text-red-500 text-xs">×</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Menu className="h-5 w-5 text-gray-400 md:hidden" />
            <h1 className="text-sm font-medium text-white">Chat with AppNotes</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4 purple-gradient">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {chatHistory.map((msg) => (
                <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-muted border-gray-700 text-white"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

