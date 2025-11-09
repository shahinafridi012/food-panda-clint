import { useEffect, useState } from "react";
import API_URL from "../../config"; // 🔹 config থেকে base URL

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load all users from database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`, // JWT token attach
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Make Admin handler
  const handleMakeAdmin = async (id) => {
    const confirm = window.confirm("Make this user an Admin?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/users/admin/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        alert("User promoted to Admin ✅");
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
        );
      }
    } catch (err) {
      console.error("Failed to make admin:", err);
      alert("Failed to promote user. Check console for details.");
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        alert("User deleted ❌");
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user. Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name || "N/A"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role || "user"}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="bg-green-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-600 transition"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
