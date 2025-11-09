import { useEffect, useState } from "react";
import API_URL from "../../config"; // 🔹 config থেকে base URL

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load all foods from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${API_URL}/foods`);
        if (!res.ok) throw new Error("Failed to fetch foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // ✅ Delete food
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this food?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("access-token");
      const res = await fetch(`${API_URL}/foods/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // JWT token attach
        },
      });

      const data = await res.json();
      if (data.deletedCount > 0) {
        setFoods((prev) => prev.filter((f) => f._id !== id));
        alert("Food deleted successfully!");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete food. Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading foods...</p>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Foods</h2>

      {foods.length === 0 ? (
        <p className="text-gray-500">No foods found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-2">{food.name}</td>
                  <td className="px-4 py-2">{food.category}</td>
                  <td className="px-4 py-2">${food.price}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(food._id)}
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
