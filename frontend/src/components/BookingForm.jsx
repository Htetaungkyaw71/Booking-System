import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../features/bookingSlice";

function BookingForm() {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!startTime || !endTime) {
      setError("Both start and end time are required.");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError("Start time must be before end time.");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      createBooking({
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      }),
    );

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-gray-200 border-[1px] space-y-4">
      {/* <h2 className="text-lg font-semibold">Create New Booking</h2> */}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex max-md:flex-col w-full gap-4">
          {/* Start Time */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1">Start Time</label>
            <input
              type="datetime-local"
              className="border-gray-200 border-[1px] rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-600 mb-1">End Time</label>
            <input
              type="datetime-local"
              className="border-gray-200 border-[1px] rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex w-full">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full  px-6 py-2 rounded-lg font-medium text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
          >
            {loading ? "Creating..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
