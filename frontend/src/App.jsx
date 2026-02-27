import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";
import DashboardLayout from "./pages/DashboardLayout";
import MyBookings from "./components/MyBookings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminUsers />} />
          <Route path="*" element={<NotFound />} /> {/* nested 404 */}
        </Route>
        <Route path="*" element={<NotFound />} /> {/* global 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
