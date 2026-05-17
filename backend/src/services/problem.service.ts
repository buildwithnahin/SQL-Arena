import pool from '../config/db';

export interface ProblemData {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  schema_sql: string;
  seed_sql?: string;
  expected_output: string;
}

export const createProblemService = async (data: ProblemData) => {
  const { title, description, difficulty, schema_sql, seed_sql, expected_output } = data;
  const result = await pool.query(
    `INSERT INTO problems (title, description, difficulty, schema_sql, seed_sql, expected_output) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, difficulty, schema_sql, seed_sql || '', expected_output]
  );
  return result.rows[0];
};

export const getProblemsService = async (page: number, limit: number, difficulty?: string) => {
  const offset = (page - 1) * limit;
  let query = 'SELECT id, title, description, difficulty, created_at FROM problems';
  const queryParams: any[] = [];

  if (difficulty) {
    query += ' WHERE difficulty = $1';
    queryParams.push(difficulty);
  }

  query += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(limit, offset);

  const result = await pool.query(query, queryParams);

  // Count total for pagination
  let countQuery = 'SELECT COUNT(*) FROM problems';
  const countParams: any[] = [];
  if (difficulty) {
    countQuery += ' WHERE difficulty = $1';
    countParams.push(difficulty);
  }
  const countResult = await pool.query(countQuery, countParams);
  const total = parseInt(countResult.rows[0].count, 10);

  return {
    problems: result.rows,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getProblemByIdService = async (id: string) => {
  const result = await pool.query('SELECT * FROM problems WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateProblemService = async (id: string, data: Partial<ProblemData>) => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }
  }

  if (fields.length === 0) return null;

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  values.push(id);
  const query = `UPDATE problems SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteProblemService = async (id: string) => {
  const result = await pool.query('DELETE FROM problems WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
