import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="border p-2 rounded-md flex h-[80%]">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="w-[180px] flex flex-col justify-center items-center p-2 hover:scale-y-[1.1] ">
          <img
            src={recipe.image}
            alt=""
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/120"; // Fallback image
              e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
            }}
            className="rounded-md"
          />

          <h3 className="text-sm text-center my-3">{recipe.title}</h3>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
