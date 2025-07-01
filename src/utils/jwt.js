import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const secret = process.env.JWT_SECRET;

export function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN}
  );
}

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

export function generateRefreshToken(user) {
  const jti = uuidv4();
  return {
    token: jwt.sign(
      { userId: user.id, jti },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    ),
    jti,
  };
}
