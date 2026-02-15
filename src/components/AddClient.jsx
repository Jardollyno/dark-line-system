/* eslint-disable react/prop-types */
import { useState } from "react";

import Button from "./Button";
import Input from "./Input";
import Title from "./Title";

function AddClient({ onAddClientSubmit, onClose }) {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

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
            placeholder="Nome do cliente..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Input>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            Instagram:
          </p>
          <Input
            type="text"
            placeholder="Instagram do cliente..."
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
          ></Input>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="w-64 text-xl text-slate-100 font-semibold text-left">
            WhatsApp:
          </p>
          <Input
            type="text"
            placeholder="WhatsApp do cliente..."
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
          ></Input>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            onClick={() => {
              // verificar campos vazios
              if (!name.trim()) {
                alert("Por favor, preencha todos os campos.");
                return;
              }
              onAddClientSubmit(name, instagram, whatsapp);
              setName("");
              setInstagram("");
              setWhatsapp("");
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

export default AddClient;
