import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import app from './app.js';
import './models/user.model.js';
import './models/follow.model.js'; 

const PORT = process.env.PORT || 7090;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ DB synced');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ DB sync failed:', err);
});
