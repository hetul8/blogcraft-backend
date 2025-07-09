import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogcraft';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('BlogCraft API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
