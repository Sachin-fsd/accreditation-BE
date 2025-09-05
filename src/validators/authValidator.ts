import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const registerShape = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  school_edit_permission: z.array(z.string()).optional(),
  criterion_edit_permission: z.array(z.string()).optional(),
  school_view_permission: z.array(z.string()).optional(),
  criterion_view_permission: z.array(z.string()).optional(),
  isAdmin: z.boolean().optional()
});

const loginShape = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function handleValidation(shape:any){
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = shape.parse(req.body);
      next();
    } catch(err:any) {
      return res.status(400).json({ error: 'validation failed', details: err.errors || err.message });
    }
  };
}

export const registerValidator = handleValidation(registerShape);
export const loginValidator = handleValidation(loginShape);
