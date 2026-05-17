import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';

export const executeUserQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ success: false, message: 'SQL query is required' });
    return;
  }

  // Basic security: block DML/DDL using a simple regex since users should only SELECT.
  // Note: in a true production environment with untrusted users, this regex isn't enough,
  // and database-level read-only restricted roles per session should be utilized.
  const forbiddenKeywords = /\b(drop|delete|update|insert|alter|truncate|grant|revoke|commit)\b/i;
  
  if (forbiddenKeywords.test(query)) {
    res.status(403).json({ 
      success: false, 
      message: 'Forbidden query: Only SELECT operations are allowed.' 
    });
    return;
  }

  const client = await pool.connect();

  try {
    // 1. Fetch problem setup statements
    const problemRes = await client.query('SELECT schema_sql, seed_sql FROM problems WHERE id = $1', [id]);
    const problem = problemRes.rows[0];

    if (!problem) {
      res.status(404).json({ success: false, message: 'Problem not found.' });
      return;
    }

    // 2. Start an isolated transaction
    await client.query('BEGIN');
    
    // 3. Set a timeout for this connection (e.g., 2000 milliseconds)
    // Helps guard against infinite loops and intensive queries (like bad CROSS JOINs)
    await client.query("SET LOCAL statement_timeout = '2000'");

    // 4. Setup mock schema
    if (problem.schema_sql) {
      await client.query(problem.schema_sql);
    }
    
    // 5. Setup mock data seeds
    if (problem.seed_sql) {
      await client.query(problem.seed_sql);
    }

    // 6. Execute User Query
    const start = performance.now();
    const result = await client.query(query);
    const end = performance.now();

    // 7. Discard all changes by explicitly rolling back the transaction
    await client.query('ROLLBACK');

    res.status(200).json({
      success: true,
      data: result.rows,
      meta: {
        executionTime: Math.round(end - start),
        rowCount: result.rowCount
      }
    });

  } catch (error: any) {
    // Attempt rollback if error breaks mid-transaction
    await client.query('ROLLBACK');
    res.status(400).json({ 
       success: false, 
       message: error.message || 'Execution failed' 
    });
  } finally {
    client.release();
  }
};
