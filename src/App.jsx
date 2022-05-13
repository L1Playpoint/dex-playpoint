import React from 'react'
import "./styles/App.css";
import Navbar from './Components/Navbar'
import Swap from './Components/Swap'
import Networks from './Components/Networks';
import { useDataLayer } from './Context/DataLayer';

export default function App() {
  window.ethereum.on('accountsChanged', async () => {
    window.location.reload();
  });

  const [{displayNetworks}] = useDataLayer()

  return (
    <div className="app__container">
      {
        displayNetworks && <Networks />
      }
      <Navbar />
      <Swap/>
    </div>
  )
}
