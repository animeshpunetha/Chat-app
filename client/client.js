// Socket.IO Client Logic

const socket = io('http://localhost:3000', {
    auth: { token: localStorage.getItem('token') }, // Pass token during connection
  }); // Initialize Socket.IO connection

  socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);
  });

  // Handle connection errors
socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message);
  });
  

// Room ID and Sender (should be dynamic)
const roomId = 'room1'; // Replace with dynamic room logic if necessary
const sender = localStorage.getItem('userId') || 'Anonymous'; // Fetch user ID from localStorage or fallback to "Anonymous"

// Join a chat room
socket.emit('joinRoom', roomId, () => {
    console.log(`Joined room: ${roomId}`);
  });

// Receive messages
socket.on('receiveMessage', (data) => {
    console.log('Message received:', data);
    if (window.addMessageToChat) {
      window.addMessageToChat(data.sender, data.message, 'received'); // Update the UI
    } else {
      console.error('addMessageToChat function is not available');
    }
  });

// Send messages
function sendMessage(socket, chatId, sender, message) {
    if (message) {
      socket.emit('sendMessage', { chatId, sender, message });
    } else {
      console.error('Message is empty, not sending to server!');
    }
  }
  
  export default socket;
  export { sendMessage };