🚀 Booking System (Full-Stack Application)

A full-stack Booking Management System built with React, Vite, Node.js, Express, TypeScript, and Prisma.

This project demonstrates authentication, role-based access control, booking management, admin user management, and production-ready architecture.

🏗 Project Structure
booking-system/
│
├── frontend/ → React + Vite Client
├── backend/ → Node.js + Express + Prisma API
└── README.md
✨ Features
🔐 Authentication

JWT-based authentication

Protected routes (Frontend + Backend)

Role-based authorization (Admin / User)

👥 Admin Management

Create users

Update users

Delete users

Admin cannot delete or update themselves

📅 Booking System

Users can view their bookings

Optimized API fetching with Redux

Prevents unnecessary refetching on route change

🛡 Security

Zod request validation

Middleware-based role protection

Environment variable configuration

📘 API Documentation

Swagger documentation available in backend

🖥 Frontend (React + Vite)

Located inside:

/frontend
Tech Stack

React

Vite

Redux Toolkit

React Router v6

Axios

Tailwind CSS

Run Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
⚙️ Backend (Node.js + TypeScript)

Located inside:

/backend
Tech Stack

Node.js

Express 5

TypeScript

Prisma ORM

PostgreSQL

Zod

Swagger

Run Backend
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:3000

Swagger documentation:

http://localhost:3000/api-docs
🌍 Environment Setup
Backend .env

Inside /backend:

DATABASE_URL=postgresql://user:password@localhost:5432/booking_db
PORT=3000

Frontend .env

Inside /frontend:

VITE_API_URL=http://localhost:3000/api

⚠️ Important:

Never commit .env

Restart server after updating environment variables

🔄 Full Setup (Step-by-Step)

1️⃣ Clone repository

git clone <your-repo-url>
cd booking-system

2️⃣ Setup backend

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

3️⃣ Setup frontend (new terminal)

cd frontend
npm install
npm run dev
🧠 Architecture Overview

Frontend:

Redux manages global state

API calls optimized using status-based fetching

Protected routes using custom wrapper

Custom 404 page

Backend:

RESTful API structure

Middleware-based authentication

Role-based access control

Prisma ORM for database operations

Request validation with Zod

📌 Production Build
Backend
cd backend
npm run build
npm start
Frontend
cd frontend
npm run build
npm run preview
🚀 Future Improvements

Refresh token system

Docker setup

CI/CD pipeline

Unit & integration testing

Rate limiting

Logging system

Email verification

Dark mode

Toast notifications

👨‍💻 Author

Htet Aung Kyaw
Full-Stack Web Developer
