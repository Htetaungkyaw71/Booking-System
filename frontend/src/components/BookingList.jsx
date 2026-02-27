import { useSelector, useDispatch } from "react-redux";
import { clearError, deleteBooking } from "../features/bookingSlice";
import { fetchSummary } from "../features/adminSlice";

function BookingList({ list, error = null, loading = false }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const canDelete = (booking) => {
    if (user?.role === "admin" || user?.role === "owner") return true;
    return booking?.userId === user?.id;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const roleStyles = {
    admin: "bg-purple-100 text-purple-600",
    owner: "bg-yellow-100 text-yellow-600",
    user: "bg-blue-100 text-blue-600",
  };

  const avatarColors = {
    admin: "bg-purple-500",
    owner: "bg-yellow-500",
    user: "bg-blue-500",
  };

  const getDuration = (start, end) => {
    const diff = new Date(end) - new Date(start);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-28">
        <div className="text-gray-500 text-sm animate-pulse">
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 flex justify-between items-center text-red-600 p-3 rounded-lg">
          <span> {error}</span>

          <button
            onClick={() => dispatch(clearError())}
            className="ml-4 text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {list?.length === 0 && (
        <div className="text-gray-500 text-sm">No bookings yet.</div>
      )}

      {list?.map((b) => (
        <div
          key={b.id}
          className="bg-white p-5 rounded-xl shadow-md border-gray-200 border-[1px]  hover:shadow-md transition"
        >
          <div className="grid grid-cols-1  lg:grid-cols-3 lg:items-center gap-4">
            {/* Left Section */}
            <div className="space-y-1">
              <div className="flex  items-center gap-2">
                <div
                  className={`w-16 h-16 ${
                    avatarColors[b.user?.role] || "bg-gray-500"
                  } text-white flex items-center justify-center rounded-full text-2xl font-bold`}
                >
                  {b.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {b.user?.name || "Unknown User"}
                  </h3>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full capitalize ${
                      roleStyles[b.user?.role] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {b.user?.role}
                  </span>
                </div>
              </div>

              {/* <p className="font-medium">{b.user?.name || "Unknown User"}</p> */}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {formatDate(b.startTime)} → {formatDate(b.endTime)}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Duration: {getDuration(b.startTime, b.endTime)}
              </p>
            </div>

            {/* Right Section */}
            {canDelete(b) ? (
              <button
                onClick={() =>
                  dispatch(deleteBooking(b.id)).then(() => {
                    dispatch(fetchSummary());
                  })
                }
                className="px-4 py-2 text-sm w-25 lg:ml-auto bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                Delete
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
