import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import express from 'express';
import Message from '../models/message.model.js';

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });

  socket.on('markMessagesAsSeen', async ({ senderId, receiverId }) => {
    try {
      const bulkOps = [
        {
          updateMany: {
            filter: {
              senderId,
              receiverId,
              seen: false,
            },
            update: { $set: { seen: true } },
          },
        },
      ];
      await Message.bulkWrite(bulkOps);

      io.to(userSocketMap[senderId]).emit('messagesSeen', receiverId);
    } catch (error) {
      console.log(`Error in markMessagesAsSeen event ${error.message}`);
    }
  });
});

export { app, server, io };
