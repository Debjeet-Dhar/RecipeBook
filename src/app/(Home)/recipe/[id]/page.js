'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipe(data.meals ? data.meals[0] : null);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract ingredients and measurements
  const getIngredients = () => {
    if (!recipe) return [];
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : 'To taste'
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
          <Link href="/">
            <button className="px-6 py-3 bg-orange-400 text-white cursor-pointer rounded-lg hover:bg-orange-600 transition duration-200 text-lg">
              Back to Recipes
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200">
                ← Back to Recipes
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{recipe.strMeal}</h1>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Hero Section */}
          <div className="relative">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex flex-wrap gap-4 text-white">
                <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="ml-2">{recipe.strCategory}</span>
                </div>
                <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">Cuisine:</span>
                  <span className="ml-2">{recipe.strArea}</span>
                </div>
                {recipe.strTags && (
                  <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium">Tags:</span>
                    <span className="ml-2">{recipe.strTags}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                <div className="space-y-3">
                  {ingredients.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-700">{item.measure}</span>
                      <span className="ml-2 text-gray-600">{item.ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <div className="prose max-w-none">
                {recipe.strInstructions.split('\n').map((step, index) => (
                  step.trim() && (
                    <div key={index} className="mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step.trim()}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Video */}
              {recipe.strYoutube && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorial</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                      className="w-full h-64 rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Source */}
              {recipe.strSource && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Recipe Source</h4>
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    View Original Recipe
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}