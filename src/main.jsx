import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Inventory from "./pages/Inventory.jsx";
import BackupPage from "./pages/BackupPage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/backup",
    element: <BackupPage />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
