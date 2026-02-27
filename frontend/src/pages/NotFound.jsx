import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </p>

      <p className="mt-2 text-gray-500 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
