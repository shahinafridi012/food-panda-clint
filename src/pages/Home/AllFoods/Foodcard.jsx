const FoodCard = ({ food }) => {
  const { name, image, price, recipe, description, madeBy, category } = food;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full h-64 object-cover" src={image} alt={name} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-1 text-gray-600 dark:text-gray-300"><strong>Category:</strong> {category}</p>
        <p className="mb-1 text-gray-600 dark:text-gray-300"><strong>Made By:</strong> {madeBy}</p>
        <p className="mb-1 text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${price}</p>
        <p className="mb-1 text-gray-600 dark:text-gray-300"><strong>Recipe:</strong> {recipe}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
