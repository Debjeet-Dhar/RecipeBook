"use client";
import { SerchRecipe } from "@/app/(Home)/lib/mealDb";
import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchRecipe() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.length > 1) {
        setLoading(true);
        try {
          const data = await SerchRecipe(query);
          setSearchResults(data.meals ? data.meals.slice(0, 10) : []);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleRecipeClick = (id) => {

    router.push(`/recipe/${id}`);
  };

  return (
    <>
      {/* Header + search bar */}
      <div className="w-full mt-7">
        <div className="flex flex-col px-5">
          <button
            onClick={() => window.history.back()}
            className="w-fit hover:opacity-80 transition"
          >
           <ArrowLeft/>
          </button>

          <div className="text mt-5">
            <p className="text-gray-700 text-xl font-semibold leading-tight">
              Search <span className="text-orange-400">recipe</span> what you
              want
            </p>
          </div>

          <div className="mt-7 flex w-full px-4 space-x-2 border border-amber-600 rounded-2xl items-center bg-white shadow-sm">
            <Search
              strokeWidth={1.5}
              size={24}
              className="text-gray-600 ml-2"
            />
            <input
              className="outline-none text-lg w-full py-3 px-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search recipes..."
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-6 py-9">
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-400"></div>
          </div>
        )}

        {!loading && query.length > 1 && searchResults.length > 0 && (
          <div className="flex flex-col space-y-6">
            {searchResults.map((meal) => (
              <div
                key={meal.idMeal}
                className="flex space-x-4 items-center w-full bg-white shadow-sm rounded-xl p-3 hover:shadow-md transition cursor-pointer"
                onClick={() => handleRecipeClick(recipe.idMeal)}
                onMouseEnter={() => router.prefetch(`/recipe/${recipe.idMeal}`)}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-28 h-24"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {meal.strMeal}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {meal.strCategory || "Unknown Category"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Not found */}
        {!loading && query.length > 1 && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 space-y-3">
            <h1 className="text-xl font-semibold text-gray-700">
              No <span className="text-orange-400">recipes</span> found for "
              {query}"
            </h1>
            <p className="text-sm text-gray-500">Try another keyword</p>
          </div>
        )}
      </div>
    </>
  );
}
