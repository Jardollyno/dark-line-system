/* eslint-disable react/prop-types */
import Title from "./Title";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";

function ItemPage({ item, categorys, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    minimum: item.minimum,
  });

  useEffect(() => {
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      minimum: item.minimum,
    });
  }, [item]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-slate-400 w-full max-w-md rounded-xl shadow-2xl p-6 relative">
        <div className="flex justify-center relative">
          <Title>Detalhes do Produto</Title>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="w-64 text-xl text-slate-100 font-semibold text-left">
              Nome:
            </p>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="w-64 text-xl text-slate-100 font-semibold text-left">
              Quantidade:
            </p>
            <Input
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="w-64 text-xl text-slate-100 font-semibold text-left">
              Mínimo:
            </p>
            <Input
              value={formData.minimum}
              onChange={(e) =>
                setFormData({ ...formData, minimum: e.target.value })
              }
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="w-64 text-xl text-slate-100 font-semibold text-left">
              Categoria:
            </p>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full text-right mt-2 border border-slate-300 text-slate-400
            px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Selecione uma categoria</option>
              {categorys.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            onClick={() => {
              onSave({ ...item, ...formData });
              onClose();
            }}
          >
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
export default ItemPage;
