# 🚀 Booking Management Frontend

A modern booking management frontend built with **React + Vite**, featuring authentication, role-based access control, admin user management, and optimized API handling.

---

## 📌 Features

- 🔐 User Authentication (Login)
- 🧑‍💼 Role-Based Access (Admin / User)
- 📊 Dashboard Overview
- 📅 My Bookings Page
- 👥 Admin User Management (Create / Update / Delete Users)
- ⚡ Optimized API Fetching with Redux Toolkit
- 🛡 Protected Routes
- ❌ Custom 404 Page
- 🌍 Environment-Based API Configuration
- 🎨 Clean and Responsive UI

---

## 🛠 Tech Stack

- React
- Vite
- Redux Toolkit
- React Router v6
- Axios
- Tailwind CSS

---

## 📂 Project Structure

src/
│
├── components/
├── pages/
│ ├── LoginPage.jsx
│ ├── Dashboard.jsx
│ ├── AdminUsers.jsx
│ ├── DashboardLayout.jsx
│ └── NotFound.jsx
│
├── redux/
├── api/
├── ProtectedRoute.jsx
└── App.jsx

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

VITE_API_URL=[http://localhost:3000/api](http://localhost:3000/api)

For production:

VITE_API_URL=[https://booking-system-mocha.vercel.app/api](https://your-production-api.com/api)

Important:

- Environment variables must start with `VITE_`
- Restart the dev server after updating `.env`

---

## 📦 Installation

Clone the repository:

git clone <your-repository-url>
cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

---

## 🔐 Authentication Flow

1. User logs in.
2. Authentication token is stored (e.g., localStorage).
3. Axios interceptor attaches the token to requests.
4. Protected routes prevent unauthorized access.

---

## 🧠 Data Fetch Optimization

API requests are managed using Redux state:

- Data is fetched only when status is `"idle"`.
- Prevents unnecessary refetching on route changes.
- Refetch happens only when the page is refreshed.

---

## 🚦 Routing

/ → Login Page
/dashboard → Main Dashboard
/dashboard/bookings → My Bookings
/dashboard/admin → Admin User Management

- → Custom 404 Page

---

## 👮 Role-Based Rules

- Admin cannot update or delete their own account.
- Admin-only routes are protected.
- Regular users cannot access admin routes.

---

## 🎨 UI/UX Features

- Loading states
- Error message with dismiss (close) button
- Custom 404 page
- Responsive dashboard layout

---

## 🏗 Build for Production

npm run build

Preview production build:

npm run preview

---

## 📌 Future Improvements

- Toast notifications
- Skeleton loading
- RTK Query integration
- Improved caching strategy
- Unit testing
- Dark mode support

---

## 👤 Author

Htet Aung Kyaw
Full-Stack Web Developer
