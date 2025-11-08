import { useEffect, useState } from "react";
import FoodCard from "./Foodcard";
import { Link } from "react-router-dom";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_LIVE_PRODUCTION}/foods`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch foods: ${res.status}`);
        return res.json();
      })
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mt-20 mb-20">
        <h3 className="text-2xl font-bold text-orange-600">All Foods</h3>
        <h2 className="text-6xl text-black font-bold">This is All Food</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="">
            <FoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
