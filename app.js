// Server entry point

const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const connectDB = require('./server/config/db.js');
const messageRoutes = require('./server/routes/api.js');
const authRoutes = require('./server/routes/authRoutes');
const Message = require('./server/models/Message'); // Import the Message model
// const testRoutes = require('./server/routes/testRoutes'); // Import the new test routes

// Initialize app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

//**********Testing */
// Test route for saving messages
app.post('/api/testMessage', async (req, res) => {
  const { chatId, sender, message } = req.body;
  try {
    // Save the message to the database
    const newMessage = await Message.create({ chatId, sender, message });
    res.status(200).json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message', details: err });
  }
});
//**************************** */

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api', messageRoutes);   // Chat-related API routes

// Serve static files (for frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve 404 for unknown API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  next();
});

// WebSocket Middleware for Authentication
io.use((socket, next) => {
  const token = socket.handshake.auth?.token; // Token passed during connection
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = jwt.verify(token, 'secret_key');
    socket.user = decoded; // Attach user info to the socket
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// WebSocket Communication
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a chat room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined the room: ${roomId}`);
  });

  // Handle message sending
  socket.on('sendMessage', async (data) => {
    console.log('Message received:', data);
    const { chatId, sender, message } = data;

    if (!chatId || !sender || !message) {
      console.error('Missing required fields: chatId, sender, or message');
      return;
    }

    try {
      // Save the message to the database
      console.log('Saving message to the database...');
      const newMessage = await Message.create({ chatId, sender, message });
      console.log('Message saved:', newMessage);

      // Emit the message to all clients in the room, including the sender
      io.to(chatId).emit('receiveMessage', {
        chatId,
        sender,
        message,
        timeStamp: newMessage.timeStamp,
      });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
