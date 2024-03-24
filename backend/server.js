import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
import { app, io, server } from './socket/socket.js';

config();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  })
);
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
