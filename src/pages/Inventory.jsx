import { Plus, ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

import AddItems from "../components/AddItems";
import Items from "../components/Items";
import Title from "../components/Title";
import ItemPage from "./ItemPage";

function Inventory() {
  function onAddItemSubmit(name, category, quantity, minimum) {
    const newItem = {
      id: v4(),
      name: name,
      category: category,
      quantity: quantity,
      minimum: minimum,
    };
    setItems([...items, newItem]);
  }

  function onSeeDetailsClick(item) {
    const selectedItem = item;
    setSelectedItem(selectedItem);
    setShowItemDetails(true);
  }

  function onUpdateItem(updatedItem) {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  function onDeleteItemClick(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  const [selectedItem, setSelectedItem] = useState(null);

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showAddItems, setShowAddItems] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-full max-w-4xl relative">
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <ChevronLeftIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </button>
          <Title>Inventário</Title>
        </div>
        <div className="mt-6 bg-slate-800 text-white p-1 rounded-xl shadow">
          <Items
            items={items}
            onSeeDetailsClick={onSeeDetailsClick}
            onDeleteItemClick={onDeleteItemClick}
          ></Items>
        </div>
        <div>
          <button
            onClick={() => {
              setShowAddItems(true);
            }}
            className="fixed bottom-8 right-8 h-16 w-16 flex items-center justify-center rounded-full
          bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition"
          >
            <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
          </button>
        </div>
        <div>
          {showAddItems && (
            <AddItems
              onAddItemSubmit={onAddItemSubmit}
              onClose={() => setShowAddItems(false)}
            />
          )}
        </div>
        <div>
          {showItemDetails && (
            <ItemPage
              item={selectedItem}
              onClose={() => setShowItemDetails(false)}
              onSave={onUpdateItem}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
