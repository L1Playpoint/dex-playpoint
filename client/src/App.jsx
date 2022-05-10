import React from "react";
import Navbar from "./components/navbar";
import Swap from "./components/Swap";
import "./styles/app.css";

export default function App() {
  return (
    <div className="app__container">
        <Navbar />
        <Swap />
    </div>
  );
}
