// Socket.IO Client Logic

const socket = io(); // Initialize Socket.IO connection

socket.on('connect', () => {
    console.log('Connected to server');
});

const roomId = 'room1'; // Example room ID
const sender = 'John Doe'; // Replace with dynamic username if needed

// Join a chat room
socket.emit('joinRoom', roomId);

// Receive messages
socket.on('receiveMessage', (data) => {
    console.log('Message received:', data);
    window.addMessageToChat(data.sender, data.message, 'received');
});

// Send messages
function sendMessage(messageText) {
    if (messageText) {
        socket.emit('sendMessage', { chatId: roomId, sender, message: messageText });
    }
}

export { sendMessage };
