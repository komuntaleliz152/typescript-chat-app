import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connection';
import { setupSocketHandlers } from './socket/handlers';
import Room from './models/Room';

dotenv.config({ path: '../.env' });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB
connectDB().then(async () => {
  // Create default rooms if they don't exist
  const defaultRooms = [
    { name: 'general', description: 'General discussion', createdBy: 'system' },
    { name: 'random', description: 'Random chat', createdBy: 'system' },
    { name: 'tech', description: 'Technology discussions', createdBy: 'system' },
  ];

  for (const roomData of defaultRooms) {
    const exists = await Room.findOne({ name: roomData.name });
    if (!exists) {
      await Room.create(roomData);
      console.log(`Created default room: ${roomData.name}`);
    }
  }
});

// Setup Socket.IO handlers
setupSocketHandlers(io);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
