import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useRoom } from '../../context/RoomContext';
import { useSocket } from '../../context/SocketContext';

const ChatWindow = () => {
  const { user } = useAuth();
  const { currentRoom } = useRoom();
  const { sendMessage, joinRoom } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentRoom.messages]);

  // Join room when room changes
  useEffect(() => {
    if (currentRoom?.id) {
      joinRoom(currentRoom.id);
    }
  }, [currentRoom?.id, joinRoom]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Send message via Socket.IO
    sendMessage(currentRoom.id, newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-[#1e293b] p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{currentRoom.name}</h3>
            <p className="text-sm text-gray-400">Real-time chat • Socket.IO connected</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => alert('Voice call feature coming soon!')}
              className="p-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
            >
              📞
            </button>
            <button 
              onClick={() => alert('Video call feature coming soon!')}
              className="p-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
            >
              📹
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentRoom.messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.isOwn 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-[#334155] text-white'
            }`}>
              {!msg.isOwn && (
                <p className="text-xs text-gray-300 mb-1">{msg.user}</p>
              )}
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#334155] px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-400">Someone is typing...</p>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-[#1e293b] p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Send a real-time message to ${currentRoom.name}...`}
            className="flex-1 p-3 bg-[#334155] text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
