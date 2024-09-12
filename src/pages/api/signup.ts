// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";  
import prisma from '@/lib/prisma';  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '註冊發生錯誤' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: '資料未完整' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: '帳號已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: '帳號註冊成功', user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: '網路發生錯誤' });
  }
}
