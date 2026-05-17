import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const problemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  schema_sql: z.string().min(1, 'Schema SQL is required'),
  seed_sql: z.string().optional().default(''),
  expected_output: z.string().min(1, 'Expected output query/result is required'),
});

export const problemUpdateSchema = problemSchema.partial();
