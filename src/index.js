import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { MasaProvider } from "@masa-finance/masa-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MasaProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </MasaProvider>
);
