import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const ConfirmOrder = () => {
  const food = useLoaderData();
  const { name: foodName, price: foodPrice, imageUrl } = food;
  const { user } = useContext(AuthContext);

  const handleConfirm = () => {
    const order = {
      foodName,
      price: foodPrice,
      orderedBy: user?.email || "Anonymous",
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order Confirmed:", data);
        alert("Your order has been confirmed!");
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
        alert("Failed to confirm order. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200 text-center">
        <h2 className="text-3xl font-bold mb-4 text-orange-600">
          Confirm Your Order
        </h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={foodName}
            className="w-48 h-48 object-cover mx-auto rounded-xl mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{foodName}</h3>
        <p className="text-lg font-medium mb-6">Price: ${foodPrice.toFixed(2)}</p>
        <button
          onClick={handleConfirm}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
