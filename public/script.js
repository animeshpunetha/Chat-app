// Frontend UI Logic
import { sendMessage } from '/client/client.js'; // Ensure this is correctly implemented in client.js

const socket = io('http://localhost:3000', {
  auth: { token: localStorage.getItem('token') }, // Pass token during connection
}); 

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatBody = document.querySelector('.chat-body');

// Function to add a message to the chat UI
function addMessageToChat(sender, message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${type}`;
  messageElement.innerHTML = `
    <p>${message}</p>
    <span>${sender}</span>
  `;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the bottom
}

// Handle WebSocket events

// Join a chat room
const chatRoomId = 'room1'; // Replace with dynamic room logic if necessary
socket.emit('joinRoom', chatRoomId);

// Listen for messages from the server
socket.on('receiveMessage', (data) => {
  console.log('New message received:', data);
  const { sender, message } = data;
  addMessageToChat(sender, message, 'received'); // Add received message to chat UI
});

// Send message on button click
sendButton.addEventListener('click', () => {
  console.log('Send button clicked');
  const messageText = messageInput.value.trim();
  if (messageText) {
    const sender = localStorage.getItem('userId'); 
    const chatId = 'room1';// Get user ID from localStorage
    console.log("sender: ", sender);
    if (!sender) {
      console.error('User ID not found in localStorage!');
      return;
    }

    addMessageToChat('You', messageText, 'sent'); // Add to UI immediately
    // Use the imported sendMessage function
    // Emit the message to the server, along with chatId and sender
    socket.emit('sendMessage', {
      chatId: chatId,
      sender: sender,
      message: messageText,
    });
    console.log("Sending message with:", { chatId, sender, messageText });
    messageInput.value = ''; // Clear input field
  }
});

// Send message on pressing Enter
messageInput.addEventListener('keypress', (e) => {
  console.log('Enter button pressed');
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Expose the function globally
window.addMessageToChat = addMessageToChat;
