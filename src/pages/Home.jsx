import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../api";
import RecipeCard from "../components/RecipeCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const useFetchSweets = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=sweet&apiKey=${API_KEY}`
        );
        setData(response.data.results);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default items visible at a time

  const { data, loading, error } = useFetchSweets(); // Destructure values

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4); // Large screens
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3); // Medium screens
      } else {
        setItemsPerPage(2); // Small screens
      }
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < (data?.length || 0)) {
      setCurrentIndex(currentIndex + 1); // Move one item at a time
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move one item at a time
    }
  };

  if (loading) return <div className="mt-7 mx-auto max-w-[85vw]">Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="mt-7 mx-auto max-w-[85vw]">
      <div className="font-semibold text-xl flex items-center justify-center w-full min-h-[40vh] bg-gradient-to-b from-indigo-500 to-pink-500  to-red-500  rounded mb-5 text-white flex-col">
        <p className="text-center">Welcome to our website. </p>
        <p className="text-center">Enjoy your day today.</p>
        <p className="text-sm text-gray-400">Make sweet and stay happy.</p>
      </div>
      <p className="font-semibold mb-3 ml-2">Sweet</p>
      <div className="flex items-center">
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
        <div className="overflow-hidden w-full">
          <div
            className="flex items-center transition-transform duration-500 ease-in-out gap-5"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {data &&
              data.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`w-[${
                    100 / itemsPerPage
                  }%] flex-shrink-0 transition-transform`}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
          </div>
        </div>

        {/* Right Button */}
        <div className="ml-2 border border-gray-300 rounded-md">
          <button
            onClick={handleNext}
            className="px-1 py-4 border-r disabled:opacity-30"
            disabled={currentIndex + itemsPerPage >= (data?.length || 0)}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
