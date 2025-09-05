import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export default function(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader) return res.status(401).json({ error: 'no token' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'bad token' });
  const token = parts[1];
  console.log(parts)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as any;
    req.user = payload;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
