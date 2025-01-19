// Server entry point

const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const { Server } = require('socket.io')
const connectDB = require('./server/config/db.js')
const messageRoutes = require('./server/routes/api.js')
const { timeStamp } = require('console')

//Initialize app
const app = express()
const server = http.createServer(app)
const io = new Server(server)

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/client', express.static(path.join(__dirname, 'client')));


//Connect to MongoDB
connectDB();

//Routes
app.use('/api', messageRoutes)

// Serve index.html for all thse routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

//WebSocket Comm.
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id)

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId)
    console.log('USer ${socket.id} joined the room: ${roomId}')
  });


  socket.on('sendMessage', async (data) => {
    console.log('Message received:', data);
    const { chatId, sender, message } = data;
    try {
      const newMessage = await require('./server/models/Message.js').create({
        chatId,
        sender,
        message,
      });

      socket.to(chatId).emit('receiveMessage', {
        chatId,
        sender,
        message,
        timeStamp: newMessage.timeStamp  ////*** */
      });
    }
    catch (err) {
      console.error('Error saving message: ', err)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
