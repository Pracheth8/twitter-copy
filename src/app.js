import express from 'express';
import authRoutes from './routes/auth.routes.js';
import sequelize from './config/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import otpRoutes from './routes/otp.routes.js';
import tweetRoutes from './routes/tweet.routes.js';
import followRoutes from './routes/follow.routes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/otp', otpRoutes);

app.use('/api/tweets', tweetRoutes);

app.use('/api', followRoutes);

// Ensure DB connection
sequelize.authenticate().then(() => console.log('DB connected'));


export default app;
