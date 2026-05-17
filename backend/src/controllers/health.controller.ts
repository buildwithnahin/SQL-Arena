import { Request, Response } from 'express';
import pool from '../config/db';

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check DB connection
    const result = await pool.query('SELECT NOW()');
    
    res.status(200).json({
      success: true,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      dbTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is running but database connection failed',
      timestamp: new Date().toISOString(),
    });
  }
};
