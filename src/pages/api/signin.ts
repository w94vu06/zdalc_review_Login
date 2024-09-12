// pages/api/signin.ts

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret
    );
    
    // 設置 Cookie，將 JWT 儲存其中
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 只在 production 中使用 secure 屬性
      maxAge: 3600, // 1 小時
      path: '/',
    }));

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
