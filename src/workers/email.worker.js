import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const worker = new Worker('email-queue', async job => {
  const { to, subject, text } = job.data;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Twitter Clone" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log('📧 OTP email sent to', to);
}, {
  connection: {
    host: 'localhost',
    port: 6379
  }
});

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});
