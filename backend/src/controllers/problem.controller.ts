import { Request, Response, NextFunction } from 'express';
import { problemSchema, problemUpdateSchema } from '../utils/validation';
import * as problemService from '../services/problem.service';

export const createProblem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = problemSchema.parse(req.body);
    const problem = await problemService.createProblemService(validatedData);
    
    res.status(201).json({ success: true, data: problem });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ success: false, message: error.errors[0].message });
      return;
    }
    // Handle Postgres unique constraint violation
    if (error.code === '23505') {
       res.status(400).json({ success: false, message: 'Problem title already exists.' });
       return;
    }
    next(error);
  }
};

export const getProblems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const difficulty = req.query.difficulty as string | undefined;

    const result = await problemService.getProblemsService(page, limit, difficulty);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getProblem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblemByIdService(id);

    if (!problem) {
      res.status(404).json({ success: false, message: 'Problem not found' });
      return;
    }

    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    next(error);
  }
};

export const updateProblem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const validatedData = problemUpdateSchema.parse(req.body);
    
    const problem = await problemService.updateProblemService(id, validatedData);

    if (!problem) {
      res.status(404).json({ success: false, message: 'Problem not found or no valid fields to update' });
      return;
    }

    res.status(200).json({ success: true, data: problem });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ success: false, message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const deleteProblem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const problem = await problemService.deleteProblemService(id);

    if (!problem) {
      res.status(404).json({ success: false, message: 'Problem not found' });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
