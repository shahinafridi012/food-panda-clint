import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthProviders";

const OrderNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [ifUnavailable, setIfUnavailable] = useState("Remove it from my order");

  useEffect(() => {
    // Server route matches /foods/:id
    fetch(`${import.meta.env.VITE_LIVE_PRODUCTION}/foods/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Food not found");
        return res.json();
      })
      .then((data) => setFood(data))
      .catch((err) => {
        console.error("Error fetching food:", err);
        toast.error("Failed to fetch food!");
      });
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to place an order!");
      return;
    }

    const totalPrice = food.price * quantity;

    const orderInfo = {
      foodId: id,
      foodName: food.name,
      price: totalPrice,
      quantity,
      buyerName: user.displayName,
      buyerEmail: user.email,
      specialInstructions,
      ifUnavailable,
      buyingDate: new Date().toISOString(),
      foodOwner: food.addedBy,
    };

    try {
      const res = await fetch("${import.meta.env.VITE_LIVE_PRODUCTION}/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(orderInfo),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Order placed successfully!");
        setQuantity(1);
        setSpecialInstructions("");
        // Redirect to user dashboard after success
        navigate("/dashboard/user");
      } else {
        toast.error("Failed to place order!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing the order!");
    }
  };

  if (!food) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        className="rounded-t-lg w-full h-64 object-cover"
        src={food.image}
        alt={food.name}
      />

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">{food.name}</h2>
        <p className="text-lg font-bold text-pink-600">
          Tk {food.price * quantity}
        </p>
        <p className="text-gray-600">{food.description}</p>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Special Instructions
          </label>
          <textarea
            placeholder="e.g. No mayo"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            If this item is not available
          </label>
          <select
            value={ifUnavailable}
            onChange={(e) => setIfUnavailable(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-pink-400"
          >
            <option>Remove it from my order</option>
            <option>Keep it in my order</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          onClick={handleOrder}
          className="w-full mt-4 bg-cyan-700 hover:bg-black text-white py-3 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default OrderNow;
