import { Router } from 'express';
import auth from '../middleware/auth';
import { canView, canEdit } from '../middleware/permissions';
import { saveCriterion, getCriterion } from '../controllers/entryController';
import { entryValidator } from '../validators/entryValidator';

const router = Router();
router.post('/school/:school/criterion/:criterion', auth,
    // entryValidator,
    canEdit, saveCriterion);
router.get('/school/:school/criterion/:criterion', auth, canView, getCriterion);
export default router;
