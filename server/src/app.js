const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO AFTER creating the server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

// Socket.IO connection handling (AFTER io is defined)
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.auth?.username} joined room ${roomId}`);
    
    socket.to(roomId).emit('user_joined', {
      userId: socket.auth?.userId,
      username: socket.auth?.username
    });
  });

  // Handle messages
  socket.on('send_message', (data) => {
    const messageData = {
      id: Date.now(),
      user: socket.auth?.username || 'Anonymous',
      message: data.message,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      userId: socket.auth?.userId,
      isOwn: false
    };
    
    console.log(`Message from ${socket.auth?.username} in room ${data.roomId}: ${data.message}`);
    
    // Broadcast to all users in the room
    io.to(data.roomId).emit('receive_message', messageData);
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user_typing', {
      username: socket.auth?.username,
      isTyping: data.isTyping
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
