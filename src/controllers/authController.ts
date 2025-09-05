import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, school_edit_permission = [], criterion_edit_permission = [], school_view_permission = [], criterion_view_permission = [], isAdmin = false } = req.body;
    console.log(req.body)
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashed,
      school_edit_permission, criterion_edit_permission,
      school_view_permission, criterion_view_permission,
      isAdmin
    });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, school_edit_permission: user.school_edit_permission, school_view_permission: user.school_view_permission, criterion_edit_permission: user.criterion_edit_permission, criterion_view_permission: user.criterion_view_permission, isAdmin: user.isAdmin } });
  } catch(err:any) {
    console.error(err);
    res.status(500).json({ error: 'registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, school_edit_permission: user.school_edit_permission, school_view_permission: user.school_view_permission, criterion_edit_permission: user.criterion_edit_permission, criterion_view_permission: user.criterion_view_permission, isAdmin: user.isAdmin } });
  } catch(err:any) {
    console.error(err);
    res.status(500).json({ error: 'login failed' });
  }
}
