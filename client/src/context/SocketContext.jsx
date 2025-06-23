import React, { createContext, useContext, useEffect } from 'react';
import socket from '../services/socket';
import { useAuth } from './AuthContext';
import { useRoom } from './RoomContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Add error handling for useRoom
  let roomContext;
  try {
    roomContext = useRoom();
  } catch (error) {
    console.warn('RoomContext not available in SocketProvider');
    roomContext = { addMessage: () => {}, currentRoom: null };
  }
  
  const { addMessage, currentRoom } = roomContext;

  useEffect(() => {
    if (user) {
      socket.auth = { username: user.username, userId: user.id };
      socket.connect();

      socket.on('connect', () => {
        console.log('Connected to server');
        // Auto-join current room
        if (currentRoom?.id) {
          socket.emit('join_room', currentRoom.id);
        }
      });

      // Listen for incoming messages
      socket.on('receive_message', (messageData) => {
        if (addMessage) {
          addMessage({
            ...messageData,
            isOwn: messageData.userId === user.id
          });
        }
      });

      // Listen for typing indicators
      socket.on('user_typing', (data) => {
        console.log(`${data.username} is typing...`);
      });

      // Listen for user joined events
      socket.on('user_joined', (data) => {
        console.log(`${data.username} joined the room`);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, currentRoom?.id, addMessage]);

  const joinRoom = (roomId) => {
    socket.emit('join_room', roomId);
  };

  const sendMessage = (roomId, message) => {
    socket.emit('send_message', { roomId, message });
  };

  const sendTyping = (roomId, isTyping) => {
    socket.emit('typing', { roomId, isTyping });
  };

  const value = {
    socket,
    joinRoom,
    sendMessage,
    sendTyping
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
