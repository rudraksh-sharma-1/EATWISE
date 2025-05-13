import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import blogRoutes from './Routes/blogRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import './Config/db.js';

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));