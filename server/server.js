import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes Imports
import authRoutes from './routes/authRoutes.js';
import absenceRoutes from './routes/absenceRoutes.js';
import justificationRoutes from './routes/justificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bugReportRoutes from './routes/bugReportRoutes.js';

// Configurations
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/absences', absenceRoutes);
app.use('/api/justifications', justificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bugReports', bugReportRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Student Absence Management API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
