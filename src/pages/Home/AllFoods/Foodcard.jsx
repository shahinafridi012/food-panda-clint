import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function FoodCard({ food }) {
  const { _id, name, image, price, madeBy, category } = food;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className="group relative w-full max-w-sm 
        bg-black/60 backdrop-blur-md 
        border border-neutral-800 
        rounded-2xl shadow-lg 
        transition-all duration-500 overflow-hidden
        hover:shadow-red-500/20 hover:-translate-y-2"
      >
        {/* Glow Line Top */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] 
          bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70"
        />

        {/* Food Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={image || "/placeholder-food.jpg"}
            alt={name}
            className="w-full h-60 object-cover rounded-t-2xl"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Category Badge */}
          <span
            className="absolute top-3 right-3 
            bg-red-600 text-white text-xs font-semibold 
            px-3 py-1 rounded-full shadow-md"
          >
            {category}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          {/* Name */}
          <Link to={`/food/${_id}`}>
            <h3 className="text-xl font-semibold text-white group-hover:text-red-500 transition">
              {name}
            </h3>
          </Link>

          {/* Chef / Maker */}
          <p className="text-sm text-neutral-400">
            Made by{" "}
            <span className="font-medium text-neutral-300">{madeBy}</span>
          </p>

          {/* Price + Button */}
          <div className="flex items-center justify-between mt-5">
            <span className="text-2xl font-bold text-red-400">Tk {price}</span>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`/order-now/${_id}`}
                className="inline-flex items-center gap-2
                  bg-gradient-to-r from-red-600 to-red-700 
                  text-white px-5 py-2 rounded-xl text-sm font-semibold
                  shadow-md hover:shadow-red-500/40 
                  transition-all duration-300"
              >
                Order Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FoodCard;
