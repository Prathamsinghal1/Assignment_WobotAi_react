import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipePageCard from "./RecipePageCard"; // Assuming this component is defined separately
import { API_KEY } from "../api";

// Fetch recipes based on a search query
const fetchRecipes = async (searchQuery) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?${
    searchQuery ? `query=${searchQuery}&` : ""
  }apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    throw error;
  }
};


export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes(searchQuery);
        setRecipes(fetchedRecipes);
      } catch (err) {
        setError("Failed to fetch recipes.");
        console.error(err.message);
      }
    };
    loadRecipes();
  }, [searchQuery]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid gap-6 p-6 mt-4 mx-auto max-w-[85vw]">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipePageCard key={recipe.id} recipe={recipe} />)
      ) : (
        <div>{searchQuery ? `No recipes found for "${searchQuery}".` : "No recipes found."}</div>
      )}
    </div>
  );
}
