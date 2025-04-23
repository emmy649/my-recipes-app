import { useEffect, useState } from "react";

function Recipes({ goBack, recipes, setRecipes }) {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRecipe, setEditRecipe] = useState(null);
  const [editName, setEditName] = useState("");
  const [editText, setEditText] = useState("");

  const filteredRecipes = recipes.filter((r) =>
    `${r.name} ${r.text}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    localStorage.setItem("recipes", JSON.stringify(updated));
  };

  const openEdit = (recipe) => {
    setEditRecipe(recipe);
    setEditName(recipe.name);
    setEditText(recipe.text);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updated = recipes.map((r) =>
      r.id === editRecipe.id ? { ...r, name: editName, text: editText } : r
    );
    setRecipes(updated);
    localStorage.setItem("recipes", JSON.stringify(updated));
    setEditRecipe(null);
  };

  return (
    <div className="min-h-screen p-6 relative bg-gradient-to-br from-[#303730] via-[#ebf5ed] to-[#303730]">
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 bg-white text--600 w-12 h-12 rounded-full shadow-md text-2xl flex items-center justify-center hover:scale-110 transition"
      >
        ←
      </button>

      <h1 className="text-5xl text-700 mb-6 text-center font-[cursive]" style={{ fontFamily: "'Great Vibes', cursive" }}>
        Моите текстове
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Търси по заглавие или текст..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">Няма намерени текстове...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.map((r) => (
            <div
              key={r.id}
              className="relative group bg-white rounded-xl shadow-md p-4 pt-10 cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelected(r)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(r.id);
                }}
                className="absolute top-2 right-2 z-10 bg-red-50 text-red-600 w-7 h-7 rounded-full flex items-center justify-center text-sm shadow hover:bg-red-100 opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEdit(r);
                }}
                className="absolute top-2 right-10 z-10 bg-green-50 text-600 w-7 h-7 rounded-full flex items-center justify-center text-sm shadow hover:bg-green-100 opacity-0 group-hover:opacity-100 transition"
              >
                ✎
              </button>
              <h2 className="text-xl font-bold italic text-600 mb-2">{r.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-2xl font-semibold italic text-700 mb-4">{selected.name}</h2>
            <p className="whitespace-pre-wrap text-gray-800">{selected.text}</p>
            <div className="text-right mt-4">
              <button onClick={() => setSelected(null)} className="text-600 hover:underline">
                Затвори
              </button>
            </div>
          </div>
        </div>
      )}

      {editRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Редакция</h2>
            <form onSubmit={saveEdit}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                rows={6}
                required
              ></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setEditRecipe(null)} className="text-gray-500">
                  Отказ
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

export default Recipes;