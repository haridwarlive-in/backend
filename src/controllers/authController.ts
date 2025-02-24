import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { loginSchema } from '../schemas';
import dotenv from "dotenv";
dotenv.config()

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET as string,
    )
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; sameSite=Lax`);
    res.json({
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});