import React from 'react';
import { motion } from 'framer-motion';

const UserPanel = () => {
  // Mock users data - will be replaced with real data
  const onlineUsers = [
    { id: 1, username: 'John', status: 'online', avatar: '👨' },
    { id: 2, username: 'Sarah', status: 'online', avatar: '👩' },
    { id: 3, username: 'Mike', status: 'away', avatar: '👨‍💻' },
    { id: 4, username: 'Emma', status: 'online', avatar: '👩‍💼' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRoomSettings = () => {
    alert('Room settings feature coming soon!');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">Online Users</h3>
        <p className="text-sm text-gray-400">{onlineUsers.length} members</p>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-2">
        {onlineUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-3 rounded-lg hover:bg-[#334155] transition-colors cursor-pointer mb-2"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-[#334155] rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-[#1e293b]`}></div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-gray-400 capitalize">{user.status}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Room Settings */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleRoomSettings}
          className="w-full py-2 bg-[#334155] hover:bg-[#475569] rounded-lg text-sm font-medium transition-colors"
        >
          Room Settings
        </button>
      </div>
    </div>
  );
};

// Make sure this line exists at the end of the file
export default UserPanel;
