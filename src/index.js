import React from "react";
import ReactDOM from "react-dom/client";
import 'remixicon/fonts/remixicon.css'
import App from "./App";
import DataLayer from "./Context/DataLayer";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLayer>
      <App />
      <ToastContainer/>
    </DataLayer>
  </React.StrictMode>
);
