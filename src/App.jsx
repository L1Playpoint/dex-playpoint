import React from 'react'
import "./styles/App.css";
import Navbar from './Components/Navbar'
import Swap from './Components/Swap'
export default function App() {
  return (
    <div className="app__container">
      <Navbar />
      <Swap/>
    </div>
  )
}
