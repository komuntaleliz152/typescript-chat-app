import { Server, Socket } from 'socket.io';
import Message from '../models/Message';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Send recent messages to newly connected user
    socket.on('get:messages', async () => {
      try {
        const messages = await Message.find()
          .sort({ timestamp: -1 })
          .limit(50)
          .lean();
        socket.emit('messages:history', messages.reverse());
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });

    // Handle new message
    socket.on('message:send', async (data: { username: string; content: string }) => {
      try {
        const message = new Message({
          username: data.username,
          content: data.content,
          timestamp: new Date(),
        });

        await message.save();

        // Broadcast to all clients
        io.emit('message:received', {
          _id: message._id,
          username: message.username,
          content: message.content,
          timestamp: message.timestamp,
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
