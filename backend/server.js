import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

config();
const __dirname = path.resolve();

// Log startup information
console.log('Starting server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('__dirname:', __dirname);

app.use(express.json());
app.use(cookieParser());

// CORS only needed in development
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
  );
}

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRouter);

// Serve static files and handle client-side routing in production
if (process.env.NODE_ENV === 'production') {
  // Log the path we're trying to serve from
  const staticPath = path.join(__dirname, 'frontend', 'dist');
  console.log('Serving static files from:', staticPath);

  app.use(express.static(staticPath));

  // This should be the LAST route
  app.get('*', (req, res) => {
    console.log('Fallback route hit:', req.url);
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectToMongoDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
