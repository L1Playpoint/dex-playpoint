import React from "react";
import ReactDOM from "react-dom/client";
import 'remixicon/fonts/remixicon.css'
import App from "./App";
import DataLayer from "./Context/DataLayer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLayer>
      <App />
    </DataLayer>
  </React.StrictMode>
);
