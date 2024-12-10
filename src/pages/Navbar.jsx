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
          <form onSubmit={handleSearch} className="flex items-center relative">
            <CiSearch className="absolute top-2 left-2" />
            <input
              type="text"
              id="searchQuery"
              placeholder="Search for a recipe"
              className="border focus:border-gray-400 outline-none pl-8 text-xs py-2 w-full rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-3 rounded-md py-1 bg-blue-500 text-white text-sm"
            >
              Search
            </button>
          </form>
          <div className="font-semibold font-mono flex gap-10">
            <Link to="/">Home</Link>
            <Link to="/recipe">Recipe Page</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
