import { Link } from "react-router-dom";

function FoodCard({ food }) {
  const { _id, name, image, price, madeBy, category } = food;

  return (
    <div className="group relative w-full max-w-sm bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden dark:bg-gray-800/90 dark:border-gray-700">
      {/* Food Image */}
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder-food.jpg"}
          alt={name}
          className="w-full h-60 object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
        />
        <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-3">
        <Link to={`/food/${_id}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 transition">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made by{" "}
          <span className="font-medium text-gray-800 dark:text-gray-300">
            {madeBy}
          </span>
        </p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Tk {price}
          </span>
          <Link
            to={`/food/${_id}`} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
