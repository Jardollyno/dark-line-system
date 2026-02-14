/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Title from "./Title.jsx";

function AddItems({ categories, onAddItemSubmit, onClose }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minimum, setMinimum] = useState("");
  const [category, setCategory] = useState("");
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }),
    );
  }, [categories]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-slate-400 w-full max-w-md rounded-xl shadow-2xl p-6 m-4 relative"
      >
        <Title>Adicionar Item</Title>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            Nome:
          </p>
          <Input
            type="text"
            placeholder="Nome do produto..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Input>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            Quantidade:
          </p>
          <Input
            type="number"
            placeholder="Quantidade do produto..."
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          ></Input>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            Mínimo:
          </p>
          <Input
            type="number"
            placeholder="Quantidade mínima..."
            value={minimum}
            onChange={(event) => setMinimum(event.target.value)}
          ></Input>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            Categoria:
          </p>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full text-right mt-2 border border-slate-300 text-slate-400
            px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Selecione uma categoria</option>
            {sortedCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            onClick={() => {
              // verificar campos vazios
              if (!name.trim() || !quantity || !minimum) {
                alert("Por favor, preencha todos os campos.");
                return;
              }
              onAddItemSubmit(
                name,
                category,
                Number(quantity),
                Number(minimum),
              );
              setName("");
              setCategory("");
              setQuantity("");
              setMinimum("");
              onClose();
            }}
          >
            Adicionar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
