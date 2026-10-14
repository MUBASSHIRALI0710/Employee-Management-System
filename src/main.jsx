import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </BrowserRouter>
  </StrictMode>
);
