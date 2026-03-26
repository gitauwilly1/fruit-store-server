import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fruitRoutes from './routes/fruitRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 3000;

app.use('/api/', fruitRoutes);
app.use('/api/auth/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});