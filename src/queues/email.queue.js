import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

const emailQueue = new Queue('email-queue', {
  connection: {
    host: 'localhost',
    port: 6379
  }
});

export default emailQueue;
