import { ChevronDownIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import ItemPage from "./ItemPage";

const DEFAULT_CATEGORY = {
  id: "uncategorized",
  name: "Sem categoria",
  system: true,
};

/* eslint-disable react/prop-types */
function Categories({ items, setItems, categories, onDeleteCategoryClick }) {
  const [openCategories, setOpenCategories] = useState({});
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const safeCategories = ensureDefaultCategory(categories);

  function filterByCategory(category, items, categories) {
    if (category.system) {
      return items.filter(
        (item) => !categories.some((cat) => cat.name === item.category),
      );
    }

    return items.filter((item) => item.category === category.name);
  }

  function ensureDefaultCategory(categories) {
    const exists = categories.some((cat) => cat.id === "uncategorized");

    if (exists) return categories;

    return [DEFAULT_CATEGORY, ...categories];
  }

  function toggleCategory(categoryId) {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }

  function onSeeDetailsClick(item) {
    setSelectedItem(item);
    setShowItemDetails(true);
  }

  function onUpdateItem(updatedItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  function onDeleteItemClick(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <ul>
        {safeCategories.map((category) => (
          <li
            key={category.id}
            className="m-2 bg-slate-900 text-white p-2 rounded-xl shadow"
          >
            <div className="bg-slate-700 text-white p-2 rounded-xl shadow">
              <div className="p-1 flex items-center gap-2 font-semibold">
                <span>{category.name}</span>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="absolute right-[4rem] pl-1 w-8 h-8 rounded-xl bg-slate-500  
              text-white  hover:bg-indigo-700 transition"
                >
                  <ChevronDownIcon />
                </button>
                <button
                  onClick={() => onDeleteCategoryClick(category.id)}
                  className="absolute right-[1.5rem] pl-1 w-8 h-8 rounded-xl bg-slate-500  
              text-white hover:bg-red-500 transition"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
            <div>
              <ul>
                {openCategories[category.id] &&
                  filterByCategory(category, items, safeCategories).map(
                    (item) => (
                      <li
                        key={item.id}
                        className="m-2 bg-slate-800 text-white p-2 rounded-xl shadow"
                      >
                        <div className="p-1 flex items-center gap-2 font-semibold">
                          <span onClick={() => onSeeDetailsClick(item)}>
                            {item.name}
                          </span>
                          <span className="text-slate-300">-</span>
                          <span className="text-slate-300 text-sm">
                            {item.quantity} unidades
                          </span>

                          <button
                            onClick={() => onDeleteItemClick(item.id)}
                            className="absolute right-[2rem] pl-1 w-8 h-8 rounded-xl bg-slate-500  text-white hover:bg-red-500 transition"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </li>
                    ),
                  )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div>
        {showItemDetails && (
          <ItemPage
            item={selectedItem}
            categorys={categories}
            onClose={() => setShowItemDetails(false)}
            onSave={onUpdateItem}
          />
        )}
      </div>
    </div>
  );
}

export default Categories;
