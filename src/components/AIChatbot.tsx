/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Assalomu alaykum! Men jamoangizning Senior Python o'qituvchisiman (PyMentor 🤖).\nPythonda kod yozish, sintaktik xatolarni topish yoki darslar bo'yicha tushunmovchiliklarni menga yozishingiz mumkin. Keling, birgalikda o'rganamiz!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const channelEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (channelEndRef.current) {
      channelEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error("Tizimda bog'lanish muammosi.");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: "bot",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: "bot",
        text: "Kechirasiz, sun'iy intellekt xizmati hozirda band yoki internet uzildi. Birozdan so'ng xabar yo'llab ko'ring yoki Python darsligimizga qayting!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Predefined prompts for quick suggestions
  const quickPrompts = [
    "Dekoratorlar haqida misol bering",
    "List va Tuple farqi nima?",
    "OOPdagi __init__ nima?",
    "Django va FastAPI farqi"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="ai_chatbot_floating_btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-yellow-500 text-slate-900 rounded-full shadow-2xl hover:bg-yellow-600 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-yellow-400 group cursor-pointer"
        title="Python AI Mentoridan savol so'rash"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-bold font-sans">
          <span className="pl-2">PyMentor AI</span>
        </span>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-bounce shadow">
          Live
        </span>
      </button>

      {/* Chat Window Frame */}
      {isOpen && (
        <div
          id="ai_chatbot_window"
          className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden transition-all duration-300 animate-slideUp/bounce"
        >
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-gray-100 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 text-slate-950 p-1.5 rounded-full">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center">
                  PyMentor GPT
                  <Sparkles className="w-3.5 h-3.5 ml-1 text-yellow-400 animate-spin" />
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">Senior Instructor AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              id="ai_chatbot_close_btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-zinc-900/50">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-start space-x-2`}
                >
                  {!isUser && (
                    <div className="bg-slate-900 dark:bg-zinc-800 text-yellow-400 p-1 rounded-full flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="max-w-[82%]">
                    <div
                      className={`p-3 rounded-2xl text-sm ${
                        isUser
                          ? "bg-yellow-500 text-slate-950 rounded-tr-none shadow font-medium"
                          : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-gray-100 dark:border-zinc-800/80 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {/* Standard multiline layout */}
                      <p className="whitespace-pre-wrap font-sans leading-relaxed">{msg.text}</p>
                      
                      {/* Include mock codes beautifully if detected */}
                      {msg.text.includes("```python") && (
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() => handleCopyCode(msg.text, msg.id)}
                            className="text-xs flex items-center space-x-1 text-slate-400 dark:text-zinc-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Nusxalandi!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Kodni nusxalash</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-gray-400 mix-blend-difference mt-1 block px-1 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="bg-slate-900 dark:bg-zinc-800 text-yellow-400 p-1 rounded-full flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white dark:bg-zinc-900 py-3 px-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={channelEndRef} />
          </div>

          {/* Quick Prompts Panel */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
              <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Tezkor savollar:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="text-xs bg-slate-100 hover:bg-yellow-50 hover:text-yellow-700 dark:bg-zinc-900 dark:hover:bg-yellow-950/20 text-slate-700 dark:text-zinc-300 dark:hover:text-yellow-400 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 font-sans font-medium text-left transition-all duration-150 cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mentorga savol yozing..."
              className="flex-1 text-sm bg-slate-100 dark:bg-zinc-900 border-none text-slate-900 dark:text-white rounded-xl py-2.5 px-3 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 font-sans"
              disabled={loading}
              id="ai_chat_input_field"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-slate-900 rounded-xl disabled:bg-slate-100 dark:disabled:bg-zinc-900 disabled:text-gray-400 font-bold transition-all duration-150 flex items-center justify-center cursor-pointer"
              id="ai_chat_send_button"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
