import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from "../features/bookingSlice";
import { useEffect } from "react";

import BookingList from "../components/BookingList";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { allBookings, error, loading, BookingsStatus } = useSelector(
    (state) => state.bookings,
  );

  useEffect(() => {
    if (BookingsStatus === "idle") dispatch(fetchBookings());
  }, [dispatch]);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-xl mb-4">Recent Bookings</h3>
          <BookingList list={allBookings} error={error} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
