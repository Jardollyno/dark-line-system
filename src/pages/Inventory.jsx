import { Plus, ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

import AddCategory from "../components/AddCategory";
import AddItems from "../components/AddItems";
import Title from "../components/Title";
import Categories from "../components/Categories";

function Inventory() {
  function onAddItemSubmit(name, category, quantity, minimum) {
    const newItem = {
      id: v4(),
      name: name.trim(),
      category: category,
      quantity: quantity,
      minimum: minimum,
    };
    setItems([...items, newItem]);
  }

  function onAddCategorySubmit(name) {
    const newCategory = {
      id: v4(),
      name: name.trim(),
    };
    if (categories.some((cat) => cat.name === newCategory.name)) {
      alert("Já existe uma categoria com esse nome.");
      return;
    }
    setCategories([...categories, newCategory]);
  }

  function onDeleteCategoryClick(id) {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
  }

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [showAddItems, setShowAddItems] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-full max-w-4xl relative">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1"
          >
            <ChevronLeftIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </button>
          <Title>Inventário</Title>
        </div>
        <div>
          <Categories
            items={items}
            setItems={setItems}
            categories={categories}
            onDeleteCategoryClick={onDeleteCategoryClick}
          ></Categories>
        </div>
        <div>
          <button
            onClick={() => {
              setShowAddButtons(!showAddButtons);
            }}
            className="fixed bottom-8 right-8 h-20 w-20 flex items-center justify-center rounded-full
          bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition"
          >
            <Plus className="w-10 h-10 text-white" strokeWidth={2.5} />
          </button>
          <div>
            {showAddButtons && (
              <div className="fixed bottom-[7.5rem] right-[2.5rem] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowAddItems(true);
                    setShowAddButtons(false);
                  }}
                  className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition"
                >
                  <span className="text-xs">Item</span>
                </button>
                <button
                  onClick={() => {
                    setShowAddCategory(true);
                    setShowAddButtons(false);
                  }}
                  className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition"
                >
                  <span className="text-xs">Categoria</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          {showAddItems && (
            <AddItems
              categories={categories}
              onAddItemSubmit={onAddItemSubmit}
              onClose={() => setShowAddItems(false)}
            />
          )}
        </div>
        <div>
          {showAddCategory && (
            <AddCategory
              onAddCategorySubmit={onAddCategorySubmit}
              onClose={() => setShowAddCategory(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
