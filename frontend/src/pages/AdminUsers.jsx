import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../features/adminSlice";
import { Navigate } from "react-router-dom";
import BookingList from "../components/BookingList";
import { fetchUsers, deleteUser, updateUserRole } from "../features/userSlice";
import CreateUserForm from "../components/CreateUserForm";

function AdminUsers() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.list);

  const { groupedBookings, totals, status } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.role === "admin" || currentUser?.role === "owner") {
      dispatch(fetchSummary());
    }
  }, [dispatch, currentUser]);

  if (
    !currentUser ||
    (currentUser?.role !== "admin" && currentUser?.role !== "owner")
  ) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Content */}
      <main className="flex-1 md:p-6 space-y-6">
        <h1 className="text-2xl font-bold">Bookings Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {Object.keys(groupedBookings).map((userId) => (
            <div key={userId} className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500 mb-3">
                Total bookings:{" "}
                {totals.find((t) => t.userId === userId)?._count || 0}
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div>
                  <BookingList list={groupedBookings[userId]} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {currentUser?.role === "admin" && (
          <div className="bg-white p-6 rounded-2xl shadow-md border-gray-200">
            <h2 className="text-xl font-semibold mb-6">User Management</h2>
            <CreateUserForm />

            <div className="space-y-4">
              {users.map((userItem) => {
                const isSelf = userItem.id === currentUser.id;

                const roleColors = {
                  admin: "bg-purple-100 text-purple-600",
                  owner: "bg-yellow-100 text-yellow-600",
                  user: "bg-blue-100 text-blue-600",
                };

                return (
                  <div
                    key={userItem.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-gray-200 border-[1px] rounded-xl hover:shadow-sm transition"
                  >
                    {/* Left */}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {userItem.name}
                        {isSelf && (
                          <span className="ml-2 text-xs text-gray-400">
                            (You)
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{userItem.email}</p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full capitalize ${
                          roleColors[userItem.role]
                        }`}
                      >
                        {userItem.role}
                      </span>
                    </div>

                    {/* Right */}
                    {!isSelf && (
                      <div className="flex items-center gap-3">
                        <select
                          disabled={isSelf}
                          value={userItem.role}
                          onChange={(e) =>
                            dispatch(
                              updateUserRole({
                                id: userItem.id,
                                role: e.target.value,
                              }),
                            )
                          }
                          className={`border rounded-lg px-3 py-1 text-sm ${
                            isSelf
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "hover:border-gray-400"
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="owner">Owner</option>
                          <option value="admin">Admin</option>
                        </select>

                        <button
                          disabled={isSelf}
                          onClick={() => dispatch(deleteUser(userItem.id))}
                          className={`px-3 py-1 text-sm rounded-lg transition ${
                            isSelf
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminUsers;
