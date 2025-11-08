import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import FoodCard from "./AllFoods/Foodcard";
import { Link } from "react-router-dom";
import About from "../About/About";

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_LIVE_PRODUCTION}/foods`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  return (
    <div>
      <Banner />

      {/* Top Foods Section */}
      <section className="max-w-7xl mx-auto mt-20 mb-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-orange-600">Top Foods</h3>
          <h2 className="text-5xl text-black font-bold">Our Most Popular Dishes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.slice(0, 4).map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/all-foods">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold">
              See All Foods
            </button>
          </Link>
        </div>
      </section>

      <About></About>
    </div>
  );
};

export default Home;
