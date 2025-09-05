import { Router } from 'express';
import auth from '../middleware/auth';
import { isAdmin } from '../middleware/permissions';
import { getAllEntries } from '../controllers/adminController';

const router = Router();
router.get('/entries', auth, isAdmin, getAllEntries);

export default router;
