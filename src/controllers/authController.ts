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
    // res.setHeader("Set-Cookie", [
    //   `token=${token}; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=None; Domain=.haridwarlivein.in`,
    //   `token=${token}; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=None; Domain=.haridwarlivein.com`,
    // ]);

    res.setHeader("Set-Cookie", [
      `token=${token}; HttpOnly; Secure; Path=/; Max-Age=31536000; SameSite=Lax;`,
    ]);

    res.json({
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  // res.setHeader("Set-Cookie", [
  //   "token=; HttpOnly; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Domain=.haridwarlivein.in",
  //   "token=; HttpOnly; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Domain=.haridwarlivein.com",
  // ]);
  res.setHeader("Set-Cookie", [
    "token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;",
  ]);

  res.status(200).json({ message: "Logged out successfully" });
});