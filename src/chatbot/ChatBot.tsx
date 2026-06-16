import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage, generateBotResponse } from './knowledge-base';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello! Welcome! I'm here to help answer questions about "True Light" and Berhanu Aberra Tadesse's work. I can also discuss Christian concepts from the Bible. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 right-0 m-4 w-96 h-96 md:w-96 md:h-[32rem] bg-slate-900 rounded-2xl shadow-2xl flex flex-col border border-amber-500/30 z-40 animate-in" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-2xl text-white">
            <div>
              <h3 id="chatbot-title" className="font-bold text-lg">True Light Assistant</h3>
              <p className="text-xs text-amber-50">Ask about the book, faith, or contact info</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-full transition-colors"
              aria-label="Close chat assistant"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-amber-500 text-white rounded-br-none'
                      : 'bg-slate-700 text-gray-100 rounded-bl-none'
                  } break-words`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 bg-slate-800" aria-label="Chat message form">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about the book, faith, or contact..."
                className="flex-1 px-4 py-2 bg-slate-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                disabled={isLoading}
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800 text-white p-2 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 flex items-center justify-center group"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
      >
        <MessageCircle size={24} />
        <span className="absolute bottom-full right-0 mb-3 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-amber-500/30">
          Ask me anything!
        </span>
      </button>
    </>
  );
};
