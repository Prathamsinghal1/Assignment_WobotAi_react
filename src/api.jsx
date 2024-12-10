import axios from 'axios';
import { useEffect, useState } from 'react';

export const API_BASE_URL = 'https://api.spoonacular.com/recipes';
export const API_KEY = "d1c099a862c945d7b8f179ea51f06ee3";

export const useFetchSweets = () => {
  const [data, setData] = useState(null); // Store fetched data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(true); // Store loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/complexSearch?query=sweet&apiKey=${API_KEY}`
        );
        console.log(response.data.results);
        setData(response.data.results); // Store results
      } catch (err) {
        setError(err.response ? err.response.data : err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return data; // Return data, error, and loading state
};

export const fetchDishes = async (query) => {
  console.log("Fetching data for query:", query);
  const name = "query";

  // Check if data for the query is already in localStorage
  const cachedData = localStorage.getItem(query);
  
  if (cachedData) {
    console.log("Using cached data for query:", query);
    return JSON.parse(cachedData); // Return cached data if available
  }

  try {
    // Construct the URL based on the query
    const url = query
      ? `${API_BASE_URL}/complexSearch?query=${query}&apiKey=${API_KEY}`
      : `${API_BASE_URL}/complexSearch?query=pasta&apiKey=${API_KEY}`;

    // Fetch new data from the API
    const response = await axios.get(url);
    console.log("Fetched new data:", response.data.results);

    // Cache fetched data in localStorage with the query as the key
    localStorage.setItem(name, JSON.stringify(response.data.results));

    return response.data.results; // Return the fetched data
  } catch (error) {
    console.error("Error fetching dishes:", error.response ? error.response.data : error.message);
    return []; // Return an empty array in case of an error
  }
};






export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}/information?apiKey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw new Error("Error fetching recipe details");
  }
};

