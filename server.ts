import express from 'express';
import { createServer } from 'http';
import next from 'next';
import dotenv from 'dotenv';
import connectDB from './src/app/infrastructure/config/database';
import { router as taskRouter } from './src/app/infrastructure/routes/taskRoutes';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  // Middleware
  server.use(express.json());
  
  // Routes
  server.use('/tasks', taskRouter);

  // Catch-all handler for Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Connect to the database
  connectDB()
    .then(() => {
      const port = process.env.PORT || 3000;
      createServer(server).listen(port, (err?: any) => {
        if (err) throw err;
        console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error('Database connection error:', error);
      process.exit(1);
    });
});
