import express from 'express';
import { deleteBug, getBugsByProject, reportBug, selectBug, updateBug } from '../controllers/bugs.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:project_id/bugs', getBugsByProject);
router.get('/:project_id/bugs/:id', auth, selectBug);

router.post('/:project_id/bugs', auth, reportBug);
router.patch('/:project_id/bugs/:id', auth, updateBug);

router.delete('/:project_id/bugs/:id', auth, deleteBug);

export default router;