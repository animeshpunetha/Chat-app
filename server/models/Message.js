const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },  // Room ID
  sender: { type: String, required: true }, // User ID or username
  message: { type: String, required: true }, // Message content
  timeStamp: { type: Date, default: Date.now }, // Timestamp
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
