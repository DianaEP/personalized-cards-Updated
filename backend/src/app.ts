import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import postcardRoutes from './routes/postcardsRoutes';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import authenticatedUser from './middleware/authenticateUser';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS to handle cross-origin requests
app.use(express.json()); // Parse JSON bodies from incoming requests

// Initialize the database
initDb()
  .then(() => {
    console.log('Database successfully initialized');
  })
  .catch((err) => {
    console.error('Database initialization error:', err);
  });

// Routes
app.use('/auth', authRoutes) // Authentication routes
app.use('/protected', authenticatedUser, protectedRoutes) //Protected routes
app.use('/postcards', authenticatedUser, postcardRoutes);  // Postcard-related API routes

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});