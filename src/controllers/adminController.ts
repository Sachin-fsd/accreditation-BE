import { Request, Response } from 'express';
import Entry from '../models/Entry';

export async function getAllEntries(req: Request, res: Response) {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json({ ok: true, entries });
  } catch(err:any) {
    console.error(err);
    res.status(500).json({ error: 'failed to fetch entries' });
  }
}
