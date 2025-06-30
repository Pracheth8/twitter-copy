    import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
