import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext();

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState({
    id: 1,
    name: 'General',
    messages: [
      { id: 1, user: 'John', message: 'Hey everyone!', timestamp: '10:30 AM', isOwn: false },
      { id: 2, user: 'You', message: 'Hello! How is everyone doing?', timestamp: '10:32 AM', isOwn: true },
      { id: 3, user: 'Sarah', message: 'Great! Working on some new features', timestamp: '10:35 AM', isOwn: false },
    ]
  });

  // Mock room data with different messages for each room
  const rooms = {
    1: {
      id: 1,
      name: 'General',
      messages: [
        { id: 1, user: 'John', message: 'Hey everyone!', timestamp: '10:30 AM', isOwn: false },
        { id: 2, user: 'You', message: 'Hello! How is everyone doing?', timestamp: '10:32 AM', isOwn: true },
        { id: 3, user: 'Sarah', message: 'Great! Working on some new features', timestamp: '10:35 AM', isOwn: false },
      ]
    },
    2: {
      id: 2,
      name: 'Random',
      messages: [
        { id: 4, user: 'Mike', message: 'Anyone up for a game?', timestamp: '11:00 AM', isOwn: false },
        { id: 5, user: 'Emma', message: 'Sure! What game?', timestamp: '11:02 AM', isOwn: false },
        { id: 6, user: 'You', message: 'How about some trivia?', timestamp: '11:05 AM', isOwn: true },
      ]
    },
    3: {
      id: 3,
      name: 'Tech Talk',
      messages: [
        { id: 7, user: 'Alex', message: 'New React 19 features are amazing!', timestamp: '12:00 PM', isOwn: false },
        { id: 8, user: 'You', message: 'Yes! The new compiler is a game changer', timestamp: '12:02 PM', isOwn: true },
        { id: 9, user: 'Lisa', message: 'Can\'t wait to try the new hooks', timestamp: '12:05 PM', isOwn: false },
      ]
    }
  };

  const switchRoom = (roomId) => {
    const room = rooms[roomId];
    if (room) {
      setCurrentRoom(room);
    }
  };

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setCurrentRoom(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const value = {
    currentRoom,
    switchRoom,
    addMessage,
    rooms: Object.values(rooms)
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};
