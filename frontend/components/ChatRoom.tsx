'use client';

import { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/lib/socket';
import { Message } from '@/types';

interface ChatRoomProps {
  username: string;
}

export default function ChatRoom({ username }: ChatRoomProps) {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('get:messages');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('messages:history', (history: Message[]) => {
      setMessages(history);
    });

    socket.on('message:received', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('messages:history');
      socket.off('message:received');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && newMessage.trim()) {
      socket.emit('message:send', {
        username,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 border-b-2 border-blue-500">
        <div className="flex items-center justify-center max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">💬</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Chat Room
            </h1>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">💭</span>
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No messages yet. Start the conversation!
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Send a message to get started
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.username === username;
              return (
                <div
                  key={message._id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-md ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {!isOwnMessage && (
                      <div className="text-xs font-bold mb-1 text-blue-600">
                        {message.username}
                      </div>
                    )}
                    <div className="break-words text-[15px] leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-[11px] mt-1.5 ${
                        isOwnMessage ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 text-gray-800 text-[15px] transition-all"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
