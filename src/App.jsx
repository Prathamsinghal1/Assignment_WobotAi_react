import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import RecipePage from "./components/RecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className="p-2 font-mono text-3xl text-[purple] flex items-center justify-center font-extrabold">Recipees..</h1>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}
