import { Server, Socket } from 'socket.io';
import Message from '../models/Message';
import Room from '../models/Room';

interface User {
  id: string;
  username: string;
  roomId: string;
}

const users = new Map<string, User>();

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Join a room
    socket.on('room:join', async (data: { username: string; roomId: string }) => {
      const { username, roomId } = data;

      // Leave previous room if any
      const previousUser = users.get(socket.id);
      if (previousUser) {
        socket.leave(previousUser.roomId);
        io.to(previousUser.roomId).emit('users:update', getUsersInRoom(previousUser.roomId));
      }

      // Join new room
      socket.join(roomId);
      users.set(socket.id, { id: socket.id, username, roomId });

      // Send room messages history
      try {
        const messages = await Message.find({ roomId })
          .sort({ timestamp: -1 })
          .limit(50)
          .lean();
        socket.emit('messages:history', messages.reverse());
      } catch (error) {
        console.error('Error fetching messages:', error);
      }

      // Notify room users
      io.to(roomId).emit('users:update', getUsersInRoom(roomId));
      socket.to(roomId).emit('user:joined', { username, roomId });
    });

    // Get all rooms
    socket.on('rooms:get', async () => {
      try {
        const rooms = await Room.find().sort({ createdAt: -1 }).lean();
        socket.emit('rooms:list', rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    });

    // Create a room
    socket.on('room:create', async (data: { name: string; description?: string; createdBy: string }) => {
      try {
        const existingRoom = await Room.findOne({ name: data.name });
        if (existingRoom) {
          socket.emit('room:error', { message: 'Room already exists' });
          return;
        }

        const room = new Room(data);
        await room.save();
        
        io.emit('room:created', room);
        socket.emit('room:create:success', room);
      } catch (error) {
        console.error('Error creating room:', error);
        socket.emit('room:error', { message: 'Failed to create room' });
      }
    });

    // Send message
    socket.on('message:send', async (data: { username: string; content: string; roomId: string }) => {
      try {
        const user = users.get(socket.id);
        if (!user || user.roomId !== data.roomId) {
          return;
        }

        const message = new Message({
          username: data.username,
          content: data.content,
          roomId: data.roomId,
          timestamp: new Date(),
        });

        await message.save();

        // Broadcast to room
        io.to(data.roomId).emit('message:received', {
          _id: message._id,
          username: message.username,
          content: message.content,
          roomId: message.roomId,
          timestamp: message.timestamp,
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      const user = users.get(socket.id);
      if (user) {
        users.delete(socket.id);
        io.to(user.roomId).emit('users:update', getUsersInRoom(user.roomId));
        socket.to(user.roomId).emit('user:left', { username: user.username });
      }
      console.log('User disconnected:', socket.id);
    });
  });
};

function getUsersInRoom(roomId: string): User[] {
  return Array.from(users.values()).filter((user) => user.roomId === roomId);
}
