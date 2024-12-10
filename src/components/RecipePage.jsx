import React, { useEffect, useState } from 'react';
import { fetchDishes } from '../api';
import RecipePageCard from './RecipePageCard';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(false); // State to manage loading
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  const data = "NOTE: Refresh page if you search any recipe";

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchDishes(searchQuery); // Fetch data with the query
        setRecipes(data); // Store data in state
        setError(null); // Clear any previous errors

        // Store the fetched data in localStorage with search query as the key
        localStorage.setItem("query", JSON.stringify(data));
      } catch (err) {
        setError("Failed to fetch recipes. Please try again."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // If the search query is empty, do not load recipes.
    if (searchQuery !== "") {
      loadRecipes();
    } else {
      // If the search query is empty, check if there is any cached data in localStorage
      const dataFromLocal = localStorage.getItem("query");
      if (dataFromLocal) {
        setRecipes(JSON.parse(dataFromLocal)); // Parse and set from localStorage
      }
    }

    const hideNoteTimeout = setTimeout(() => {
      const noteElement = document.getElementById('note');
      if (noteElement) {
        noteElement.style.display = "none"; // Hide the note
      }
    }, 3000);

    return () => clearTimeout(hideNoteTimeout);
    
  }, [searchQuery]); // Run when the searchQuery changes

  return (
    
    <div className="mt-10 mx-auto max-w-[85vw] mb-7">

      <div id='note' className='p-4 bg-green-100 text-green-700 rounded mb-4'>
      NOTE: Refresh page if you search any recipe</div>
      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipes && Array.isArray(recipes) && recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <RecipePageCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      ) : (
        !loading && <p>No recipes found.</p>
      )}
    </div>
  );
}
