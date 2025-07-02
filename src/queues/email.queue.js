import { Queue } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();

// Create queue
const emailQueue = new Queue('email-queue', {
  connection: {
    url: process.env.REDIS_URL
  }
});
console.log("connection",emailQueue);

// Named export to add job to queue
export const sendResetOTPEmail = async ({ email, otp }) => {
  await emailQueue.add('send-reset-otp', { email, otp });
};

// Optional default export (if you still need the queue object directly)
export default emailQueue;
