-- Seed Users
INSERT INTO users (id, username, email, password_hash, role) VALUES 
('f5b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'admin_nahin', 'admin@sqlarena.com', 'hashed_pass_123', 'admin'),
('f5b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'coder_bob', 'bob@example.com', 'hashed_pass_456', 'user')
ON CONFLICT (email) DO NOTHING;

-- Seed Problem
INSERT INTO problems (id, title, description, difficulty, schema_setup_sql, solution_sql) VALUES 
('p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'Find High Earners', 'Write a query to find the names of employees earning more than $50,000.', 'easy',
'CREATE TABLE employees (id INT, name VARCHAR(50), salary INT);',
'SELECT name FROM employees WHERE salary > 50000;'
)
ON CONFLICT (title) DO NOTHING;

-- Seed Tags
INSERT INTO tags (id, name) VALUES 
('t1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'SELECT'),
('t1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'WHERE')
ON CONFLICT (name) DO NOTHING;

-- Map problem to tags
INSERT INTO problem_tags (problem_id, tag_id) VALUES 
('p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 't1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001'),
('p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 't1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002')
ON CONFLICT DO NOTHING;

-- Seed Test Cases
INSERT INTO test_cases (id, problem_id, description, test_setup_sql, is_hidden) VALUES
('tc15f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'Basic test', 'INSERT INTO employees VALUES (1, ''Alice'', 60000), (2, ''Bob'', 40000);', false),
('tc15f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'Hidden edge case', 'INSERT INTO employees VALUES (3, ''Charlie'', 50000), (4, ''Dave'', 50001);', true)
ON CONFLICT DO NOTHING;

-- Seed Submissions
INSERT INTO submissions (id, user_id, problem_id, user_query, status, execution_time_ms) VALUES
('s1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'f5b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'SELECT name FROM employees WHERE salary >= 50000;', 'wrong_answer', 15),
('s1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'f5b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0002', 'p1b5f8c0-3b3b-4f9e-bb9e-4e4b7b3d0001', 'SELECT name FROM employees WHERE salary > 50000;', 'accepted', 10)
ON CONFLICT DO NOTHING;
