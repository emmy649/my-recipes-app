import { useState, useEffect } from "react";
import "./index.css";
import Recipes from "./Recipes";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
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
      text,
      id: Date.now(),
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setName("");
    setText("");
    setShowModal(false);
  };

  if (page === "recipes") {
    return <Recipes goBack={() => setPage("home")} recipes={recipes} setRecipes={setRecipes} />;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/bg.png')]">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl text-black-700 mb-6 font-[cursive]" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Моите текстове
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-white text-black-600 w-12 h-12 rounded-full shadow-xl text-3xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          +
        </button>

        <button
          onClick={() => setPage("recipes")}
          className="mt-8 px-6 py-2 bg--500 text-white rounded shadow hover:bg--600 transition"
        >
          Към текстовете
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Нов текст</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                placeholder="Заглавие"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Текст..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                rows={6}
                required
              ></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500">
                  Затвори
                </button>
                <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded">
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