# 🗄️ SQL Arena

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App_Router-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Node.js-Express-forestgreen?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-Ready-blue?style=flat-square&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-Enabled-blue?style=flat-square&logo=typescript" alt="TypeScript" />
</p>

**SQL Arena** is a robust full-stack interactive platform designed to help users practice, test, and master SQL queries in a completely safe and isolated environment. Modeled after top-tier coding platforms, it pairs a seamless developer-centric frontend with a highly secure backend execution engine.

---

## ✨ Features

- **Interactive Code Editor**: Integrated Monaco Editor with full SQL syntax highlighting, auto-completion, and a dark theme.
- **Secure SQL Execution Engine**: Real-time PostgreSQL script compilation running inside isolated transactions that auto-rollback (safe from DML/DDL abuse).
- **Authentication**: JWT-based stateless authentication flow with bcrypt password hashing.
- **Problem Management**: Full CRUD API for admins to create and manage test-case schemas, seed data, and problem environments.
- **Modern User Interface**: Fully responsive UI driven by Tailwind CSS focusing on an elite developer experience.

## 🛠 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React Framework)
- TypeScript
- Tailwind CSS
- Monaco Editor (`@monaco-editor/react`)

**Backend:**
- Node.js & [Express.js](https://expressjs.com/)
- TypeScript
- PostgreSQL (via `pg` driver)
- JWT & Bcrypt (Authentication)
- Zod (Schema Validation)
- Helmet, Cors, Morgan, Express-Rate-Limit (Security & Logging)

---

## 🏗️ Project Structure
```text
SQL-Arena/
├── backend/            # Express.js REST API
│   ├── src/            # Source code (Controllers, Routes, Middleware, Services)
│   ├── dist/           # Compiled TypeScript output
│   └── .env            # Backend Secrets
├── frontend/           # Next.js Application
│   ├── src/app/        # App Router pages and layouts
│   ├── src/components/ # Shared UI building blocks
│   └── tailwind.config # UI Configuration
└── database/           # PostgreSQL definitions
    ├── schema.sql      # Main relations & table architectures
    └── init.sql        # Seed mock data
```

## 🚀 Getting Started

### Prerequisites
Make sure you have installed on your local machine:
- Node.js (v18+)
- PostgreSQL (v14+)

### 1. Database Setup
Ensure PostgreSQL is running, then create the target database and seed it:
```bash
# Enter the psql terminal
psql -U postgres
CREATE DATABASE sql_arena;
\c sql_arena

# Import the schema and seed files
\i database/schema.sql
\i database/init.sql
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file and configure
cat <<ENV > .env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=sql_arena
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
ENV

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the Next.js development environment
npm run dev
```

The frontend will be available at `http://localhost:3000` and the API will run on `http://localhost:5000/api`.

---

## 🔒 Security Measures
- **Transaction Rollbacks**: Every requested SQL compilation maps out constraints locally, commits safely against mock data, returns results, and triggers a hard `ROLLBACK` via PostgreSQL session handlers to prevent pollution.
- **SQL Sanitization**: Intercepts and denies prohibited keywords like `DROP`, `DELETE`, `UPDATE`, `INSERT`.
- **Query Timeouts**: Statement timeouts kill infinite-loop joining algorithms automatically.
- **Rate-Limiting**: Global API rate limit scaling protection via IP monitoring.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
