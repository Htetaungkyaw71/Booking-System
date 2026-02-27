import { useDispatch, useSelector } from "react-redux";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import { fetchmyBookings } from "../features/bookingSlice";
import { useEffect } from "react";

export default function MyBookings() {
  const { myBookings, myBookingsStatus, error, loading } = useSelector(
    (state) => state.bookings,
  );
  const dispatch = useDispatch();
  console.log(myBookingsStatus);

  useEffect(() => {
    if (myBookingsStatus === "idle") dispatch(fetchmyBookings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-xl mb-4">Create Booking</h2>
        <BookingForm />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-xl mb-4">My Bookings</h2>
        <BookingList list={myBookings} error={error} loading={loading} />
      </div>
    </div>
  );
}
