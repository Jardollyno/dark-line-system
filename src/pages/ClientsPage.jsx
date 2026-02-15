import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronLeftIcon } from "lucide-react";
import { v4 } from "uuid";

import Title from "../components/Title";
import Clients from "../components/Clients";
import AddClient from "../components/AddClient";

function ClientsPage() {
  const navigate = useNavigate();
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [clients, setClients] = useState(() => {
    const storedItems = localStorage.getItem("clients");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  function onAddClientSubmit(name, instagram, whatsapp) {
    const newClient = {
      id: v4(),
      name: name.trim(),
      instagram: instagram.trim(),
      whatsapp: whatsapp.trim(),
    };
    if (clients.some((client) => client.name === newClient.name)) {
      alert("Já existe um cliente com esse nome.");
      return;
    }
    setClients([...clients, newClient]);
  }

  function onDeleteClientClick(clientId) {
    setClients(clients.filter((client) => client.id !== clientId));
  }

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-full max-w-4xl relative">
        <button onClick={() => navigate(-1)} className="absolute left-0 top-1">
          <ChevronLeftIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
        </button>
        <Title>Clients Page</Title>
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
                  className="h-16 w-16 flex items-center justify-center rounded-full 
                bg-slate-800 text-white shadow-xl hover:bg-indigo-700 transition"
                  onClick={() => {
                    setShowAddClient(true);
                    setShowAddButtons(false);
                  }}
                >
                  Cliente
                </button>
              </div>
            )}
          </div>
          <div>
            {showAddClient && (
              <AddClient
                onAddClientSubmit={onAddClientSubmit}
                onClose={() => setShowAddClient(false)}
              />
            )}
          </div>
        </div>
        <div>
          <Clients
            clients={clients}
            onDeleteClientClick={onDeleteClientClick}
          ></Clients>
        </div>
      </div>
    </div>
  );
}

export default ClientsPage;
