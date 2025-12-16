import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { UserStoreProvider } from "./stores/UserStore.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserStoreProvider backendUrl={backendUrl}>
        <App />
      </UserStoreProvider>
    </AppContextProvider>
  </BrowserRouter>
);
