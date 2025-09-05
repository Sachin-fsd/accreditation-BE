import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

/**
 * canView middleware
 */
export async function canView(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ error: 'user not found' });

    const school = req.params.school || req.body.school_id;
    const criterion = req.params.criterion || req.body.criterion;

    if (user.school_view_permission.includes(String(school)) && user.criterion_view_permission.includes(String(criterion))) {
      return next();
    }
    return res.status(403).json({ error: 'no viewing permission' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'permission check failed' });
  }
}

export async function canEdit(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ error: 'user not found' });

    const school = req.body.school_id || req.params.school;
    const criterion = req.body.criterion || req.params.criterion;

    if (user.school_edit_permission.includes(String(school)) && user.criterion_edit_permission.includes(String(criterion))) {
      return next();
    }
    return res.status(403).json({ error: 'no edit permission' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'permission check failed' });
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ error: 'user not found' });
    if (user.isAdmin) return next();
    return res.status(403).json({ error: 'admin only' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'admin check failed' });
  }
}
