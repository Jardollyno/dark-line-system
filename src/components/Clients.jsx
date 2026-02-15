/* eslint-disable react/prop-types */
import { TrashIcon } from "lucide-react";

function Clients({ clients, onDeleteClientClick }) {
  return (
    <div>
      <div>
        {clients.map((client) => (
          <div
            key={client.id}
            className="m-2 bg-slate-900 text-white p-2 rounded-xl shadow"
          >
            <div className="bg-slate-700 text-white p-2 rounded-xl shadow">
              <div className="p-1 flex items-center gap-2 font-semibold">
                <span>Nome:</span>
                <span>{client.name}</span>
                <button
                  onClick={() => onDeleteClientClick(client.id)}
                  className="absolute right-[1.5rem] pl-1 w-8 h-8 rounded-xl bg-slate-500  
                text-white hover:bg-red-500 transition"
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="p-1 flex items-center gap-2 font-semibold">
                <span>Contato:</span>
                {client.instagram && <span>{client.instagram}</span>}
                {client.instagram && client.whatsapp && <span>-</span>}
                {client.whatsapp && <span>{client.whatsapp}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;
