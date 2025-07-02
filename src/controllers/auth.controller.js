import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import redisClient from '../config/redis.js';
import { isStrongPassword } from '../utils/validatePassword.js';
import { blacklistToken } from '../services/blacklist.service.js';
import { isTokenBlacklisted } from '../services/blacklist.service.js';
import jwt from 'jsonwebtoken';
import { sendResetOTPEmail } from '../queues/email.queue.js';
import { generateOTP } from '../utils/generateOTP.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

      if (!isStrongPassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    });
  }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ username, email, password });
    return res.status(201).json({ message: 'User registered', user: { id: user.id, username, email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export async function logout(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const now = Math.floor(Date.now() / 1000);
    const ttl = decoded.exp - now;

    await blacklistToken(decoded.jti, ttl);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (await isTokenBlacklisted(decoded.jti)) {
      return res.status(403).json({ message: 'Refresh token blacklisted' });
    }

    const accessToken = generateAccessToken({ id: decoded.userId });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    await redisClient.set(`otp:${email}`, otp, 'EX', 300); 
    console.log("otp:",otp);

    await sendResetOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

    const storedOTP = await redisClient.get(`otp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    await redisClient.del(`otp:${email}`); // Invalidate OTP after use

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};