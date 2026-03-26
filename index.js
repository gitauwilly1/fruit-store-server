import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fruitRoutes from './routes/fruitRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 3000;

app.use('/api/', fruitRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});