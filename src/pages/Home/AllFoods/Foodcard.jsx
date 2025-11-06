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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-3">
        <Link to={`/add-food/${_id}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 transition">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made by <span className="font-medium text-gray-800 dark:text-gray-300">{madeBy}</span>
        </p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-xs font-semibold text-gray-500">4.9</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Tk {price}
          </span>
          <Link
            to={`/add-food/${_id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
          >
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
