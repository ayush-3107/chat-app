import React from 'react';
import { motion } from 'framer-motion';
import { RoomProvider } from '../../context/RoomContext';
import { SocketProvider } from '../../context/SocketContext';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import UserPanel from './UserPanel';

const ChatLayout = () => {
  return (
    <RoomProvider>
      <SocketProvider>
        <div className="h-screen bg-[#0f172a] text-white flex">
          {/* Sidebar - Room List */}
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-80 bg-[#1e293b] border-r border-gray-700"
          >
            <Sidebar />
          </motion.div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <ChatWindow />
          </div>

          {/* User Panel */}
          <motion.div 
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="w-64 bg-[#1e293b] border-l border-gray-700"
          >
            <UserPanel />
          </motion.div>
        </div>
      </SocketProvider>
    </RoomProvider>
  );
};

export default ChatLayout;
