import { useEffect, useState } from "react";
import FoodCard from "./Foodcard";


const AllFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('allFood.json')
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  return (
    <div>
      <div className="text-center mt-20 mb-20">
        <h3 className="text-2xl font-bold text-orange-600">All Foods</h3>
        <h2 className="text-6xl text-black font-bold">This is All Food</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {
        foods.map(food => <FoodCard
        key={food._id}
        food={food}
        ></FoodCard>)
       }
      </div>
    </div>
  );
};

export default AllFoods;
