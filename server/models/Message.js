const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  message: String,
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
