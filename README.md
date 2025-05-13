# Form Builder – Fullstack Application

The source code is split into:

- `frontend/`: React + Vite frontend with Tailwind CSS and modern UX
- `server/`: Node.js backend with Express, Prisma ORM, and MySQL support

## 🔌 API Endpoints

- `GET /api/forms` – Get all forms
- `POST /api/forms` – Create a new form
- `GET /api/forms/:id` – Get a form by ID (with questions)
- `POST /api/forms/:id/responses` – Submit form responses

This is a production-ready fullstack web application that allows users to:

- Create forms with multiple questions (text fields, dropdowns, file uploads)
- View the list of all created forms
- Fill out and submit responses for any form
- Store all data securely in a database (Prisma + MySQL)

---

## 📦 Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS (for modern UI)
- React Router DOM

**Backend**
- Node.js + Express
- Prisma ORM
- MySQL (schema provided in `db.sql`)

---

## Setup Instructions

### 1. Backend
cd server
cp .env.example .env
# Edit .env with your MySQL connection URL
# DATABASE_URL="mysql://user:password@localhost:3306/form_builder_db"

npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev


## Note on Database

- This repo **does not include the actual database** for security reasons.
- You must configure your own `.env` file using the provided `.env.example`.
- The database schema is included in `server/prisma/db.sql`.

---


## Feature that could make the form builder experience better
As a future improvement, I would add drag-and-drop question ordering and real-time form preview, so users can visualize exactly how the form will appear while building it.