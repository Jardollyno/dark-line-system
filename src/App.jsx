//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./components/Title.jsx";
import Button from "./components/Button.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();
  //const [count, setCount] = useState(0);
  function onClickInventory() {
    navigate(`/inventory`);
  }

  function onClickBackup() {
    navigate(`/backup`);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Dark Line System</Title>
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={() => {
              onClickInventory();
            }}
          >
            Estoque
          </Button>
          <Button>Agenda</Button>
          <Button>Clientes</Button>
          <Button
            onClick={() => {
              onClickBackup();
            }}
          >
            Backup
          </Button>
          <Button>Histórico</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
