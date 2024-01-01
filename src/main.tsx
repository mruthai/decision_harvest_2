
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from './context/DataProvider';



ReactDOM.createRoot(document.getElementById("root")!).render(
  
      <BrowserRouter>
      <DataProvider>

        <App />
      </DataProvider>
      </BrowserRouter>
  
);
