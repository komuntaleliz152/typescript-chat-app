'use client';

import { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/lib/socket';
import { Message, Room, User } from '@/types';
import RoomSidebar from './RoomSidebar';
import CreateRoomModal from './CreateRoomModal';

interface ChatRoomProps {
  username: string;
}

export default function ChatRoom({ username }: ChatRoomProps) {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('rooms:get');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('rooms:list', (roomsList: Room[]) => {
      setRooms(roomsList);
      if (!currentRoom && roomsList.length > 0) {
        joinRoom(roomsList[0]._id);
      }
    });

    socket.on('room:created', (room: Room) => {
      setRooms((prev) => [...prev, room]);
    });

    socket.on('room:create:success', (room: Room) => {
      setShowCreateModal(false);
      joinRoom(room._id);
    });

    socket.on('room:error', (error: { message: string }) => {
      alert(error.message);
    });

    socket.on('messages:history', (history: Message[]) => {
      setMessages(history);
    });

    socket.on('message:received', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('users:update', (usersList: User[]) => {
      setUsers(usersList);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('rooms:list');
      socket.off('room:created');
      socket.off('room:create:success');
      socket.off('room:error');
      socket.off('messages:history');
      socket.off('message:received');
      socket.off('users:update');
    };
  }, [socket, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const joinRoom = (roomId: string) => {
    if (!socket) return;
    
    const room = rooms.find((r) => r._id === roomId);
    if (room) {
      setCurrentRoom(room);
      setMessages([]);
      socket.emit('room:join', { username, roomId });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && newMessage.trim() && currentRoom) {
      socket.emit('message:send', {
        username,
        content: newMessage,
        roomId: currentRoom._id,
      });
      setNewMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleCreateRoom = (name: string, description: string) => {
    if (socket) {
      socket.emit('room:create', { name, description, createdBy: username });
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserColor = (name: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-teal-500',
      'bg-emerald-500',
      'bg-amber-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const shouldGroupWithPrevious = (currentIndex: number): boolean => {
    if (currentIndex === 0) return false;
    const current = messages[currentIndex];
    const previous = messages[currentIndex - 1];
    
    if (current.username !== previous.username) return false;
    
    const timeDiff = new Date(current.timestamp).getTime() - new Date(previous.timestamp).getTime();
    return timeDiff < 60000;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Room Sidebar */}
      <RoomSidebar
        rooms={rooms}
        currentRoomId={currentRoom?._id || ''}
        onRoomSelect={joinRoom}
        onCreateRoom={() => setShowCreateModal(true)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">#</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentRoom?.name || 'Select a room'}
                </h1>
                <p className="text-xs text-gray-500">
                  {currentRoom?.description || 'No room selected'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-medium">{users.length}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-600 font-medium">{username}</span>
                <div className={`w-8 h-8 ${getUserColor(username)} rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm`}>
                  {getInitials(username)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-1">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No messages yet</h3>
                <p className="text-sm text-gray-500">Start the conversation in #{currentRoom?.name}</p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isOwnMessage = message.username === username;
                const showAvatar = !shouldGroupWithPrevious(index);
                const isGrouped = shouldGroupWithPrevious(index);

                return (
                  <div
                    key={message._id}
                    className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} ${
                      isGrouped ? 'mt-0.5' : 'mt-4'
                    } animate-slideUp`}
                  >
                    <div className="flex-shrink-0 w-8">
                      {showAvatar && !isOwnMessage && (
                        <div className={`w-8 h-8 ${getUserColor(message.username)} rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm`}>
                          {getInitials(message.username)}
                        </div>
                      )}
                    </div>

                    <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-lg`}>
                      {showAvatar && (
                        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                          {!isOwnMessage && (
                            <span className="text-sm font-semibold text-gray-900">
                              {message.username}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                      
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          isOwnMessage
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>

                    {isOwnMessage && <div className="flex-shrink-0 w-8" />}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${currentRoom?.name || 'room'}`}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-[15px] transition-all placeholder:text-gray-400"
                  disabled={!currentRoom}
                />
              </div>
              
              <button
                type="submit"
                disabled={!newMessage.trim() || !currentRoom}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md disabled:shadow-none flex items-center gap-2"
              >
                <span>Send</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
}
