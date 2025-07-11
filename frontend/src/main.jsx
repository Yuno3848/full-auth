import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/authContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
