
import { Link } from "react-router-dom";
import React from 'react'
import { IoArrowForwardSharp } from "react-icons/io5";

export default function RecipePageCard({ recipe }) {
  return (
    <div className="border rounded-md hover:shadow-xl flex mb-5">
      
        <div className=" flex  justify-center items-center p-7 gap-9 ">
          <img
            src={recipe.image}
            alt=""
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/120"; // Fallback image
              e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
            }}
            className="rounded-md hover:scale-y-[1.03] "
          />

          <div className="">
          <h3 className="text-xl font-semibold text-center my-3">{recipe.title}</h3>
          <Link to={`/recipe/${recipe.id}`}>
          <button className="flex items-center gap-2 bg-gradient-to-b from-indigo-400 to-pink-400  px-3 py-1 rounded-md text-white text-sm">
            
         Want to know recipe  
         <IoArrowForwardSharp />
          </button>
      </Link>
          </div>
        </div>
        
    </div>
  )
}

    