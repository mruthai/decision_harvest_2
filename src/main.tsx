import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode >
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
  </StrictMode>
);
