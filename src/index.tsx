import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HttpClient } from "./util/httpClient";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const httpClient = new HttpClient();

root.render(
  <React.StrictMode>
    <App httpClient={httpClient} />
  </React.StrictMode>
);
