import crypto from 'crypto';
import redis from '../config/redis.js';
import emailQueue from '../queues/email.queue.js';

export async function generateAndSendOTP(email) {
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store in Redis with 5 min TTL
  await redis.set(`otp:${email}`, otp, 'EX', 300); // 5 minutes

  // Add job to email queue
  await emailQueue.add('send-otp', {
    to: email,
    subject: 'Reset Your Password',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });
}

export async function verifyOTP(email, userOtp) {
  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) throw new Error('OTP expired or not found');
  if (storedOtp !== userOtp) throw new Error('Invalid OTP');

  // Invalidate OTP after successful verification
  await redis.del(`otp:${email}`);
}
