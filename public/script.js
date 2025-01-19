// Frontend UI Logic
import { sendMessage } from '/client/client.js';


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

// Send message on button click
sendButton.addEventListener('click', () => {
  console.log("Send button clicked");
  const messageText = messageInput.value.trim();
  if (messageText) {
    addMessageToChat('You', messageText, 'sent');
    sendMessage(messageText); // Call the sendMessage function from client.js
    messageInput.value = '';
  }
});

// Send message on pressing Enter
messageInput.addEventListener('keypress', (e) => {
  console.log("Enter button pressed");
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Expose the function globally
window.addMessageToChat = addMessageToChat;
