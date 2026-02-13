/* eslint-disable react/prop-types */
import { TrashIcon } from "lucide-react";

function Items({ items, onDeleteItemClick, onSeeDetailsClick }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="m-2 bg-slate-700 text-white p-2 rounded-xl shadow"
          >
            <div className="p-1 flex items-center gap-2 font-semibold">
              <span onClick={() => onSeeDetailsClick(item)}>{item.name}</span>
              <span className="text-slate-300">-</span>
              <span className="text-slate-300 text-sm">
                {item.quantity} unidades
              </span>

              <button
                onClick={() => onDeleteItemClick(item.id)}
                className="absolute right-5 pl-1 w-8 h-8 rounded-xl bg-slate-500  text-white hover:bg-red-500 transition"
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
