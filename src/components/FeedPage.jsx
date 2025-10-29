"use client";
import { getRecipe } from "@/app/(Home)/lib/mealDb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FeedPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Save, setSave] = useState(false);
  const loaderRef = useRef(null);
  const router = useRouter();

  // --- fetch random meals ---
  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const mealCount = 10;
      const promises = Array.from(
        { length: mealCount },
        async () => await getRecipe()
      );
      const result = await Promise.all(promises);
      const allMeals = result.map((res) => res.meals[0]);
      setRecipes((prev) => {
        const updated = [...prev, ...allMeals];
        sessionStorage.setItem("feedRecipes", JSON.stringify());
        return updated;
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- initial load (with cache restore) ---
  useEffect(() => {
    const saved = sessionStorage.getItem("feedRecipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
      // restore scroll position after DOM renders
      setTimeout(() => {
        const savedScroll = sessionStorage.getItem("feedScroll");
        if (savedScroll) window.scrollTo(0, parseInt(savedScroll, 10));
      }, 100);
    } else {
      fetchRecipe();
    }
  }, []);

  // --- infinite scroll ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          fetchRecipe();
        }
      },
      { rootMargin: "300px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // --- save scroll position when navigating ---
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("feedScroll", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleRecipeClick = (id) => {
    // Save scroll position before navigating
    sessionStorage.setItem("feedScroll", window.scrollY.toString());
    router.push(`/recipe/${id}`);
  };
  const handelsavebtn = () => {
    //get old
    const saveRecipes = JSON.parse(localStorage.getItem("saveRecipes")) || [];
    //cheak if already save
    const alreadysaved = saveRecipes.some((r) => r.id === recipe.id);
    if (!alreadysaved) {
      saveRecipes.push(recipes);
      localStorage.setItem("saveRecipes", JSON.parse(...save , r));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Feed</h1>
        </div>

        {/* Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.idMeal || index}
              className="break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition-shadow duration-300 cursor-pointer group relative"
              onClick={() => handleRecipeClick(recipe.idMeal)}
              onMouseEnter={() => router.prefetch(`/recipe/${recipe.idMeal}`)}
            >
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={400}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                {...(index < 6 ? { priority: true } : { loading: "lazy" })}
                 onClick={() => handleRecipeClick(recipe.idMeal)}
                onMouseEnter={() => router.prefetch(`/recipe/${recipe.idMeal}`)}
              />

              {/* Save Button */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md"
                  onClick={handelsavebtn}
                >
                  Save
                </button>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                  {recipe.strMeal}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Loader */}
        <div ref={loaderRef} className="flex justify-center py-10">
          {loading && (
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
          )}
        </div>
      </div>
    </div>
  );
}
