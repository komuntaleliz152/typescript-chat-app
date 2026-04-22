# Chat Application

Real-time chat application built with Next.js, Socket.IO, and MongoDB.

## Phase 1 - MVP Features ✅
- Send messages
- Receive messages instantly
- Store messages in MongoDB

## Prerequisites
- Node.js 18+
- MongoDB running locally or MongoDB Atlas account

## Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Update `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/chat-app
```

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Run the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### 5. Open the App
Visit `http://localhost:3000` in your browser.

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO, MongoDB, Mongoose
- **Real-time**: Socket.IO
