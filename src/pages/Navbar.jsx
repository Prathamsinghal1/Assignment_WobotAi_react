import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the RecipePage with the search query as a URL parameter
      navigate(`/recipe?search=${query}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-y border-gray-500 w-full p-3 text-lg max-w-[80vw]">
        <nav className="flex justify-between">
          <form
            onSubmit={handleSearch}
            className="flex items-center relative"
          >
            <CiSearch className="absolute top-2 left-2" />
            <input
              type="text"
              id="searchQuery"
              placeholder="Search for a recipe"
              className="border focus:border-gray-400 outline-none pl-8 text-xs py-2 w-full rounded-lg max-sm:w-[50%]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-3 rounded-md py-1 bg-blue-500 text-white text-sm max-sm:hidden"
            >
              Search
            </button>
            <button
              type="submit"
              className="ml-2 px-3 rounded-md py-1 bg-blue-500 text-white text-sm max-sm:block hidden"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 50 50"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </button>
          </form>
          <div className="font-semibold text-sm md:text-lg font-mono flex items-center max-sm:text-xs gap-4 md:gap-10">
            <Link to="/">Home</Link>
            <Link to="/recipe">Recipe Page</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
