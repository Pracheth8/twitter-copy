import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import redis from '../config/redis.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
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

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'No token provided' });

    await redis.set(`bl:${refreshToken}`, '1', 'EX', 60 * 60 * 24); // blacklist for 1 day
    return res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
