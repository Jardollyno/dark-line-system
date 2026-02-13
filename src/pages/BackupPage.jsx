import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import Title from "../components/Title";
import Button from "../components/Button";

function BackupPage() {
  const navigate = useNavigate();
  const rawData = localStorage.getItem("items");
  const parsedData = JSON.parse(rawData || "[]");
  const formattedText = JSON.stringify(parsedData, null, 2);
  const fileInputRef = useRef(null);

  function downloadTxt() {
    if (!formattedText) {
      alert("Nenhum dado para fazer backup.");
      return;
    }
    const blob = new Blob([formattedText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function importTxt(event) {
    const file = event.target.files[0];

    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      try {
        const parsed = JSON.parse(content);
        localStorage.setItem("items", JSON.stringify(parsed));
        alert("Dados importados com sucesso!");
      } catch (error) {
        localStorage.setItem("items", content);
        alert("Arquivo importado como texto simples");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1"
          >
            <ChevronLeftIcon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </button>
          <Title>Página de Backup</Title>
        </div>

        <div className="gap-4 justify-center flex">
          <Button onClick={downloadTxt}>Realizar Backup</Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            Importar Backup
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={importTxt}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default BackupPage;
