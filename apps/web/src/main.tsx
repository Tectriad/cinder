import React from "react";
import ReactDOM from "react-dom/client";
import "@cinder-ui/core/styles.css";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
