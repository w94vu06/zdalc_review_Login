// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // 立即過期
    path: '/',
  }));

  return res.status(200).json({ message: 'Logged out successfully' });
}
