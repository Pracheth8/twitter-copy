import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';
import dotenv from 'dotenv';
dotenv.config();

export default async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const isBlacklisted = await redis.get(`bl:${token}`);
    if (isBlacklisted) return res.status(403).json({ message: 'Token blacklisted' });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
