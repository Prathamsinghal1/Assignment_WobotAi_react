import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { fetchDishes } from "./../api";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const recipes = await fetchDishes(searchQuery); // Pass searchQuery to fetchDishes
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    setSearchQuery("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-y border-gray-500 w-full p-3 text-lg  max-w-[80vw] ">
        <nav className="flex justify-between ">
          <Link to="/recipe" className="flex items-center text-2xl relative ">
            <CiSearch className="absolute top-1 left-1    " />
            <input
              type="text"
              id="searchQuery"
              placeholder="Enter Recipe Name"
              className="border focus:border-gray-400 outline-none pl-8 text-xs py-2 w-full rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on input change
            />
            <button
              onClick={handleSearch} // Directly call handleSearch
              className="text-sm ml-2 border rounded-md px-2 py-1 bg-blue-300 hover:bg-blue-500"
            >
              Search
            </button>
          </Link>
          <div className="font-semibold font-mono flex gap-10">
            <Link to="/">Home</Link>
            <Link to="/recipe">Recipe Page</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
