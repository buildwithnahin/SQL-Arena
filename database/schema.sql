-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS Table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PROBLEMS Table
CREATE TABLE IF NOT EXISTS problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    schema_setup_sql TEXT NOT NULL, -- SQL to build the structure needed for the problem
    solution_sql TEXT NOT NULL,     -- The expected correct query
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TAGS Table
CREATE TABLE IF NOT EXISTS tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- PROBLEM_TAGS (Many-to-Many relationship between problems and tags)
CREATE TABLE IF NOT EXISTS problem_tags (
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (problem_id, tag_id)
);

-- TEST_CASES Table
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    description VARCHAR(255),
    test_setup_sql TEXT, -- Specific data insertion for this test case
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SUBMISSIONS Table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    user_query TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('accepted', 'wrong_answer', 'runtime_error', 'timeout')),
    execution_time_ms INTEGER,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES for frequent lookups
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_problem_id ON test_cases(problem_id);
