// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "../features/userSlice";
// import { setUser } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const users = useSelector((state) => state.users.list);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const login = (user) => {
//     dispatch(setUser(user));
//     if (user.role !== "admin") {
//       navigate("/dashboard");
//     } else {
//       navigate("/admin");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Select User</h1>

//       {users.map((u) => (
//         <div key={u.id} className="border p-3 mb-2 flex justify-between">
//           <span>
//             {u.name} ({u.role})
//           </span>

//           <button
//             onClick={() => login(u)}
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Login
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LoginPage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: users, loading } = useSelector((state) => state.users);

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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const login = (user) => {
    dispatch(setUser(user));
    navigate(user.role === "admin" ? "/dashboard" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">
        Book<span className="text-indigo-600">It</span>
      </h1>

      <h2 className="text-xl mb-6 text-gray-600">Select User Profile</h2>
      {loading && (
        <div className="flex justify-center items-center h-50">
          <div className="text-gray-500 text-sm animate-pulse">
            Loading users...
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 text-center justify-center items-center md:grid-cols-3 gap-6 w-full max-w-4xl">
        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => login(u)}
            className="bg-white rounded-xl shadow-md p-6 text-center justify-center items-center flex flex-col cursor-pointer hover:shadow-lg transition"
          >
            <div
              className={`w-16 h-16 ${
                avatarColors[u.role] || "bg-gray-500"
              } text-white flex items-center justify-center rounded-full text-2xl font-bold mb-4`}
            >
              {u.name?.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-lg font-semibold">{u.name}</h3>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full capitalize ${
                roleStyles[u.role] || "bg-gray-100 text-gray-600"
              }`}
            >
              {u.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
