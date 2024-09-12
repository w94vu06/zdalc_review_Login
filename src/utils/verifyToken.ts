// utils/verifyToken.ts

import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  email: string;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, secret) as DecodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}