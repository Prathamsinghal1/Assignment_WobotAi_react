import React, { useEffect, useState } from "react";
import { useFetchSweets } from "../api";
import RecipeCard from "../components/RecipeCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recipe, setRecipe] = useState();
  const itemsPerPage = 4; // Number of items visible at a time
  const totalItems = 10;

  const data = useFetchSweets(); // Fetch data using the custom hook
  const [error, setError] = useState(null);
  console.log(data);


  if (error) {
    return <div>{error}</div>; // Show an error message if an error occurred
  }

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + 1); // Move one item at a time
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move one item at a time
    }
  };

  return (
    <div className="mt-7 mx-auto max-w-[85vw]">
        <div className="font-semibold text-xl flex items-center justify-center w-full min-h-[40vh] bg-gradient-to-b from-indigo-500 to-pink-500  to-red-500  rounded mb-5 text-white flex-col">
            <p>Welcome to our website. Enjoy your day today.</p>
            <p className="text-sm text-gray-400">Make sweet and stay happy.</p>
        </div>
      <p className="font-semibold mb-3 ml-2">Sweet</p>
      <div className="flex items-center overflow-hidden">
        {/* Left Button */}
        <div className="mr-2 border border-gray-300 rounded-md">
        <button
          onClick={handlePrev}
          className="px-1 py-4 border-r disabled:opacity-30"
          disabled={currentIndex === 0}
        >
          <FaAngleLeft />
        </button>
        </div>

        {/* Slider Container */}
        <div className=" overflow-hidden border px-2">
          <div
            className="flex items-center transition-transform duration-500 ease-in-out gap-5"
            style={{
              transform: `translateX(-${(currentIndex * 77) / itemsPerPage}%)`,
            }}
          >
            {data && data.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>

        {/* Right Button */}
        <div className="ml-2 border border-gray-300 rounded-md">
          <button
            onClick={handleNext}
            className="px-1  py-4 border-r disabled:opacity-30 "
            disabled={currentIndex + itemsPerPage >= totalItems}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;