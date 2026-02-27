import { useState } from "react";
import { createUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateUserForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    name: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
    setForm({ name: "", role: "user" });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-gray-200 border-[1px] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border-gray-200 border-[1px] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}

export default CreateUserForm;
