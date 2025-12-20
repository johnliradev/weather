import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import { SearchProvider } from "./context/search-context.tsx";
import { ForecastProvider } from "./context/forecast-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <ForecastProvider>
        <App />
      </ForecastProvider>
    </SearchProvider>
  </StrictMode>
);
