# Real-Time Social Media Application

A feature-rich real-time chat application built with **Node.js**, **Socket.IO**, **MongoDB**, and a dynamic frontend using **HTML**, **CSS**, and **JavaScript**. This application supports user authentication using **JWT**  and real-time messaging.

---

## Features

- **User Authentication**:
  - Sign up and login functionality with password hashing.
  - JWT-based authentication for secure communication.

- **Real-Time Messaging**:
  - Send and receive messages instantly using Socket.IO.
  - Messages are saved to a MongoDB database for persistence.

- **Chat Rooms**:
  - Users can join predefined chat rooms.
  - Messages are scoped to individual rooms.

- **Responsive Design**:
  - User-friendly interface with support for both desktop and mobile devices.
  - Dark theme for better usability.




## Technologies Used

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git and GitHub

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or on a cloud platform like MongoDB Atlas

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   ```
2. **Navigate to the Project Directory:**:
   ```bash
   cd chat-app
   ```
3. **Install Dependencies:**:
   ```bash
   npm install
   ```
4. **Configure MongoDB:**:
   Update the MongoDB connection string in server/config/db.js:
   ```bash
   const MONGO_URI = 'mongodb://localhost:27017/chatApp'; // Replace with your MongoDB URI
   ```
5. **Run the Server:**:
   ```bash
   npm run dev
   ```
   The server will start at http://localhost:3000.


## Usage

### 1. User Signup and Login
- Navigate to `http://localhost:3000/signup.html` to create an account.
- Login at `http://localhost:3000/login.html`.

### 2. Join Chat Room
After logging in, users are redirected to the chatroom where they can:
- Join a room.
- Send and receive messages in real-time.

### 3. Message History
- Messages are stored in MongoDB and retrieved when a user joins the room.

---

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create a new user.
- `POST /api/auth/login`: Authenticate user and return a JWT.

### Messages
- `POST /api/testMessage`: Test route for saving messages to MongoDB.
- `GET /api/messages/:chatId`: Retrieve all messages for a specific room.



## Future Enhancements

- **Social Media Aggregator**: Users can see all their social media handles and their feed at one place.
- **Private Messaging**: Allow direct messages between users.
- **Typing Indicators**: Show when a user is typing in the chat.
- **File Sharing**: Enable users to share images or documents in the chat.
- **Real-Time Notifications**: Notify users of new messages or events.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)


   



