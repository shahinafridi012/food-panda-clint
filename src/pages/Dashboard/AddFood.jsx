import { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

export default function AddFood() {
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!food.name || !food.price || !food.image) {
      alert(" Name, Price, and Image are required!");
      return;
    }

    if (!user || user.role !== "admin") {
      alert("🚫 Only admin can add foods!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Get token from localStorage
      const token = localStorage.getItem("access-token");
      if (!token) {
        alert("🚫 No token found! Please login again.");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_LIVE_PRODUCTION}/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT token attach
        },
        body: JSON.stringify(food),
      });

      if (res.status === 401) {
        alert("🚫 Unauthorized! Please login as admin.");
        return;
      }

      if (res.status === 403) {
        alert("🚫 Forbidden! You don't have permission to add foods.");
        return;
      }

      const data = await res.json();

      if (data.insertedId) {
        alert("✅ Food added successfully!");
        setFood({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
        });
      } else {
        alert("❌ Failed to add food");
      }
    } catch (err) {
      console.error("Add food error:", err);
      alert("❌ Error adding food. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">🍽️ Add New Food</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name *
          </label>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-orange-200 outline-none"
            placeholder="e.g. Chicken Burger"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={food.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-orange-200 outline-none"
              placeholder="e.g. Fast Food"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-orange-200 outline-none"
              placeholder="e.g. 12.99"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL *
          </label>
          <input
            type="text"
            name="image"
            value={food.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-orange-200 outline-none"
            placeholder="Paste image link"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring focus:ring-orange-200 outline-none"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-orange-700 transition w-full"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}
