# 🚀 Booking Management Backend API

A scalable REST API built with **Node.js, Express, TypeScript, and Prisma**, designed to handle authentication, user management, and booking operations with role-based access control.

---

## 📌 Features

- 🔐 JWT Authentication
- 👥 User Management (Admin & User roles)
- 📅 Booking Management
- 🛡 Role-Based Authorization
- 📦 Prisma ORM with PostgreSQL
- ✅ Request Validation using Zod
- 📘 Swagger API Documentation
- 🌍 Environment-Based Configuration
- ⚡ TypeScript Support
- 🔄 Development Hot Reload with TSX

---

## 🛠 Tech Stack

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (Validation)
- Swagger UI
- dotenv
- CORS

---

## 📂 Project Structure

src/
│
├── controllers/
├── routes/
├── middlewares/
├── validation/
├── lib/
├── prisma/
├── server.ts
└── index.ts

prisma/
└── schema.prisma

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

DATABASE_URL="postgresql://user:password@localhost:5432/your_database"
JWT_SECRET="your_jwt_secret"
PORT=5000

Important:

- Never commit your `.env` file
- Add `.env` to `.gitignore`

---

## 📦 Installation

Clone the repository:

git clone <your-repository-url>
cd backend

Install dependencies:

npm install

---

## 🗄 Database Setup

Generate Prisma client:

npx prisma generate

Run migrations:

npx prisma migrate dev

Open Prisma Studio:

npx prisma studio

---

## 🚀 Development

Run development server with hot reload:

npm run dev

The server will start using:

node --import=tsx --watch --env-file=.env src/server.ts

---

## 🏗 Build for Production

Build TypeScript:

npm run build

Start production server:

npm start

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. Server validates credentials.
3. JWT token is generated.
4. Protected routes require valid token.
5. Role-based middleware restricts admin-only endpoints.

---

## 🛡 Role-Based Access Control

- Admin can manage users.
- Admin cannot delete or update their own account.
- Regular users cannot access admin routes.
- Middleware verifies role before allowing access.

---

## 📘 API Documentation

Swagger UI is available for API testing and documentation.

After starting the server, visit:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## ✅ Validation

- Request bodies are validated using **Zod**
- Prevents invalid or malformed data
- Ensures safer and cleaner API logic

---

## 🌍 API Base URL

Default:

[http://localhost:3000/api](http://localhost:3000/api)

---

## 📌 Available Scripts

npm run dev → Start development server with hot reload
npm run build → Compile TypeScript
npm start → Run compiled production build

---

## 🔮 Future Improvements

- Refresh token implementation
- Rate limiting
- Logging system (Winston / Pino)
- Unit & integration testing
- Docker setup
- CI/CD pipeline
- Email verification
- Password reset system

---

## 👤 Author

Htet Aung Kyaw
Full-Stack Web Developer
