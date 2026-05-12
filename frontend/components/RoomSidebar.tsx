'use client';

import { Room } from '@/types';

interface RoomSidebarProps {
  rooms: Room[];
  currentRoomId: string;
  onRoomSelect: (roomId: string) => void;
  onCreateRoom: () => void;
}

export default function RoomSidebar({
  rooms,
  currentRoomId,
  onRoomSelect,
  onCreateRoom,
}: RoomSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Rooms</h2>
        <p className="text-xs text-gray-500 mt-0.5">Select a chat room</p>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto p-2">
        {rooms.map((room) => (
          <button
            key={room._id}
            onClick={() => onRoomSelect(room._id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all ${
              currentRoomId === room._id
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">#</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{room.name}</div>
                {room.description && (
                  <div className="text-xs text-gray-500 truncate">
                    {room.description}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Create Room Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onCreateRoom}
          className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Room
        </button>
      </div>
    </aside>
  );
}
