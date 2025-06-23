import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useRoom } from '../../context/RoomContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { currentRoom, switchRoom, rooms } = useRoom();
  
  // Mock room list with unread counts
  const roomList = [
    { id: 1, name: 'General', lastMessage: 'Hello everyone!', unread: 2 },
    { id: 2, name: 'Random', lastMessage: 'How about some trivia?', unread: 0 },
    { id: 3, name: 'Tech Talk', lastMessage: 'Can\'t wait to try the new hooks', unread: 5 },
  ];

  const handleRoomClick = (roomId) => {
    switchRoom(roomId);
    console.log(`Switched to room ${roomId}`);
  };

  const handleCreateRoom = () => {
    const roomName = prompt('Enter room name:');
    if (roomName && roomName.trim()) {
      alert(`Room "${roomName}" created! (Feature coming soon)`);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Chat Rooms</h2>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">Welcome, {user?.username}</p>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {roomList.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoomClick(room.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                currentRoom.id === room.id 
                  ? 'bg-blue-600/20 border border-blue-500/30' 
                  : 'bg-[#334155] hover:bg-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{room.name}</h3>
                {room.unread > 0 && (
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    {room.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 truncate mt-1">
                {room.lastMessage}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Room Button */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleCreateRoom}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-200"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
