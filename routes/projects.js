import express from 'express';
import { getProjects, createProject, selectProject, updateProject, deleteProject } from '../controllers/projects.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', auth, selectProject);

router.post('/', auth, createProject);
router.patch('/:id', auth, updateProject);

router.delete('/:id', auth, deleteProject);

export default router;