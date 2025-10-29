"use client";
import React, { useState } from "react";
import {
  Camera,
  Upload,
  ChefHat,
  Search,
  Clock,
  Users,
  Star,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import Bottomnav from "./Bottomnav";

const RecipeBook = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Classic Spaghetti Carbonara",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
      time: "30 mins",
      servings: 4,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Vegetable Stir Fry",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      time: "20 mins",
      servings: 2,
      rating: 4.5,
    },
  ]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const analyzeWithAI = async () => {
    if (selectedImages.length === 0 && !userInput.trim()) return;

    setIsLoading(true);

    // Simulate AI processing multiple images and text
    setTimeout(() => {
      const ingredientsFromImages =
        selectedImages.length > 0
          ? `I can see ${selectedImages.length} food items including fresh vegetables, proteins, and pantry items. `
          : "";

      const mockResponse = `
🍳 **AI Recipe Analysis Complete!**

**Based on your ${selectedImages.length} images and description:**
${ingredientsFromImages}
${userInput ? `Your notes: "${userInput}"` : ""}

---

🎯 **Perfect Recipe Match: "Kitchen Clearout Fusion Bowl"**

**Why this recipe works:**
- Uses all your available ingredients efficiently
- Balanced nutrition with proteins, carbs, and veggies
- Quick preparation - ready in 25 minutes

**Ingredients (from what I can identify):**
${
  selectedImages.length > 0
    ? "• Fresh vegetables from your fridge\n• Protein sources visible\n• Pantry staples"
    : ""
}
${userInput ? `• Additional items you mentioned` : ""}
• Basic seasonings (oil, salt, pepper)
• Optional herbs for freshness

**Instructions:**
1. **Prep Ingredients** (5 mins)
   - Chop all vegetables uniformly
   - Marinate proteins with basic spices

2. **Cooking Process** (15 mins)
   - Sauté aromatics until fragrant
   - Add proteins and cook until done
   - Incorporate vegetables by cooking time
   - Add sauces/seasonings

3. **Final Touches** (5 mins)
   - Adjust seasoning
   - Garnish with fresh herbs
   - Serve hot!

**Nutrition Estimate:**
- Calories: 380-450 per serving
- Protein: 25-30g
- Carbs: 35-40g  
- Healthy fats: 12-15g

**Pro Tips:**
🔸 Meal prep friendly - doubles easily
🔸 Customize spice levels to taste
🔸 Great for next-day lunches

Enjoy your creative kitchen masterpiece! 👨‍🍳
      `;
      setAiResponse(mockResponse);
      setIsLoading(false);
    }, 3000);
  };

  const clearAll = () => {
    setSelectedImages([]);
    setUserInput("");
    setAiResponse("");
  };

  const sampleInputs = [
    "I have chicken, rice, bell peppers, onions, and some spices",
    "Vegetarian options with eggs, cheese, and seasonal vegetables",
    "Quick meal with pasta, canned tomatoes, and herbs",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                RecipeBook AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Recipe Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take photos of your fridge and pantry, add some notes, and get
            personalized recipes using what you already have!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Multiple Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Food Images ({selectedImages.length})
              </h3>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-orange-400 transition-colors">
                {selectedImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt="Uploaded food"
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-24 hover:border-orange-400 hover:bg-orange-50 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center py-8">
                    <Camera className="h-12 w-12 text-gray-400 mb-4" />
                    <span className="block text-sm font-medium text-gray-900">
                      Click to upload food images
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload multiple images of your ingredients
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              {selectedImages.length > 0 && (
                <p className="text-sm text-gray-600 mt-3 text-center">
                  {selectedImages.length} image(s) ready for analysis
                </p>
              )}
            </div>

            {/* Text Input Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Details & Preferences
              </h3>

              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe what you have, dietary preferences, or cooking time... 
Examples:
• 'I have chicken, rice, and mixed vegetables'
• 'Need vegetarian recipe under 30 minutes'
• 'Using leftover pasta and fresh herbs'"
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {sampleInputs.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setUserInput(sample)}
                    className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    {sample.substring(0, 30)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={analyzeWithAI}
                disabled={
                  isLoading ||
                  (selectedImages.length === 0 && !userInput.trim())
                }
                className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>AI is analyzing your ingredients...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Create Recipe from My Ingredients</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Usage Tips */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                💡 Best Results Tips:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Take clear photos of individual ingredients or groups</li>
                <li>• Include both fridge items and pantry staples</li>
                <li>• Mention dietary preferences or time constraints</li>
                <li>• The more details, the better the recipe!</li>
              </ul>
            </div>
          </div>

          {/* Right Column - AI Results */}
          <div className="space-y-6">
            {/* AI Response */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  AI Recipe Suggestions
                </h3>
                {aiResponse && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Recipe Generated! 🎉
                  </span>
                )}
              </div>

              {aiResponse ? (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {aiResponse}
                  </div>
                  <div className="mt-6 mb-15 flex space-x-4">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Save to My Recipes</span>
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Share Recipe
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="flex justify-center mb-4">
                    <div className="animate-bounce">
                      <ChefHat className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-lg mb-2">Ready to create magic! 🪄</p>
                  <p className="text-sm">
                    Upload images of your ingredients and let AI suggest the
                    perfect recipe
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Your Recent Recipes
              </h3>
              <div className="space-y-4">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {recipe.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{recipe.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-600 p-2">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottomnav/>
    </div>
  );
};

export default RecipeBook;
