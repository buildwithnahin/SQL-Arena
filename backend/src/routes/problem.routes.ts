import { Router } from 'express';
import {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
} from '../controllers/problem.controller';
import { executeUserQuery } from '../controllers/execute.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getProblems);
router.get('/:id', getProblem);

// Code execution endpoint
router.post('/:id/execute', protect, executeUserQuery);

// Protected routes (ideally admin only in production)
router.post('/', protect, createProblem);
router.put('/:id', protect, updateProblem);
router.delete('/:id', protect, deleteProblem);

export default router;
