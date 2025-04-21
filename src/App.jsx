import { useState, useEffect } from "react";
import "./index.css";
import Recipes from "./Recipes";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [page, setPage] = useState("home");

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const newRecipe = {
      name,
      ingredients,
      instructions,
      id: Date.now(),
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setName("");
    setIngredients("");
    setInstructions("");
    setShowModal(false);
  };

  if (page === "recipes") {
    return <Recipes goBack={() => setPage("home")} />;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/bg.png')]">
      {/* воал */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl text-green-700 mb-6 font-[cursive]" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Моите рецепти
        </h1>

        {/* Кръгъл бутон за добавяне */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-white text-green-600 w-12 h-12 rounded-full shadow-xl text-3xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          +
        </button>

        {/* Бутон към списъка с рецепти */}
        <button
          onClick={() => setPage("recipes")}
          className="mt-8 px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
        >
          Към рецептите
        </button>
      </div>

      {/* Модал */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Нова рецепта</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                placeholder="Име на рецептата"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Съставки"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              ></textarea>
              <textarea
                placeholder="Начин на приготвяне"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              ></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500">
                  Затвори
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Запази
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
