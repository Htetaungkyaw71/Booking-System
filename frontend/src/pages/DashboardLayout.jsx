import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/" />;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkClass = "block px-3 py-2 rounded hover:bg-gray-100 transition";

  const activeClass = "bg-indigo-100 text-indigo-600 font-medium";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-64 shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          Book<span className="text-indigo-600">It</span>
        </h2>

        <p className="font-medium">Welcome, {user.name}</p>
        <p className="text-sm text-gray-500 capitalize mb-6">
          Role: {user.role}
        </p>

        {/* Navigation */}
        <nav className="space-y-2 mb-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""} flex items-center gap-2`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""} flex items-center gap-2`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            My Bookings
          </NavLink>

          {(user.role === "admin" || user.role === "owner") && (
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""} flex items-center gap-2`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              Admin Panel
            </NavLink>
          )}
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
