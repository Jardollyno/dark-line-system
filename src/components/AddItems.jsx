/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Title from "./Title.jsx";

function AddItems({ onAddItemSubmit, onClose }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minimum, setMinimum] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-400 w-full max-w-md rounded-xl shadow-2xl p-6 relative">
        <Title>Adicionar Item</Title>
        <Input
          type="text"
          placeholder="Nome do produto..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></Input>
        <Input
          type="text"
          placeholder="Categoria do produto..."
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        ></Input>
        <Input
          type="number"
          placeholder="Quantidade do produto..."
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        ></Input>
        <Input
          type="number"
          placeholder="Quantidade mínima do produto..."
          value={minimum}
          onChange={(event) => setMinimum(event.target.value)}
        ></Input>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            onClick={() => {
              // verificar campos vazios
              if (!name.trim() || !category.trim() || !quantity || !minimum) {
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
            }}
          >
            Adicionar Item
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
