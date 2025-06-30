import express from 'express';
import authRoutes from './routes/auth.routes.js';
import sequelize from './config/db.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

// Ensure DB connection
sequelize.authenticate().then(() => console.log('DB connected'));

export default app;
