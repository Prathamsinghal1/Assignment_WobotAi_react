import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, API_KEY } from "../api";

function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [cleanSummaryText, setCleanSummaryText] = useState("");
  const [cleanInstructionText, setCleanInstructionText] = useState("");

  // Fetch recipe details
  const fetchRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${id}/information?apiKey=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw new Error("Error fetching recipe details");
    }
  };

  // Strip HTML tags function
  function stripHtmlTags(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  }

  useEffect(() => {
    const loadRecipeDetails = async () => {
      try {
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
        
        // Clean text after fetching recipe data
        setCleanSummaryText(stripHtmlTags(data.summary));
        setCleanInstructionText(stripHtmlTags(data.instructions));
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again.");
      }
    };
    loadRecipeDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  // Check if recipe data exists before rendering
  if (!recipe) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
      {recipe != null && (
        <>
          <div className="mt-10 mx-auto max-w-[85vw] grid grid-cols-2 gap-4 mb-7">
            <img src={recipe.image} alt={recipe.title} className="rounded-md" />
            <div className="ml-5">
              {recipe.vegetarian ? (
                <div className="flex items-center mt-2 mb-4">
                  <span className="border-2 p-1 border-[green] flex items-center justify-center rounded">
                    <span className="rounded-full h-[20px] w-[20px] bg-[green]"></span>
                  </span>
                  <span className="ml-2 text-[green] font-semibold">Veg</span>
                </div>
              ) : (
                <div className="flex items-center mt-2 mb-4">
                  <span className="border-2 p-1 border-[red] flex items-center justify-center rounded">
                    <span className="rounded-full h-[20px] w-[20px] bg-[red]"></span>
                  </span>
                  <span className="ml-2 text-[red] font-semibold">Non-Veg</span>
                </div>
              )}
              <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
              <h2 className="text-xl font-semibold">Summary:</h2>
              <p>{cleanSummaryText}</p>
            </div>
          </div>
          <div className="mt-10 mx-auto max-w-[85vw] gap-4 mb-7">
            <h2 className="text-xl font-semibold my-4">Ingredients:</h2>
            <ul>
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold my-4">Instructions:</h2>
            <p>{cleanInstructionText}</p>
          </div>

          <div className="mt-10 mx-auto max-w-[85vw] gap-4 mb-7">
            <h2 className="text-xl font-semibold my-4">Know More:</h2>
            <p>Health Score: {recipe.healthScore}</p>
            <p>Price Per Serving: ₹{recipe.pricePerServing}</p>
            <p>Aggregate Likes: {recipe.aggregateLikes}</p>
          </div>
        </>
      )}
    </>
  );
}

export default RecipeDetailsPage;
