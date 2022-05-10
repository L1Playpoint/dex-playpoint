import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import DataLayerProvider from './contexts/DataLayer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayerProvider>
    <App />
    </DataLayerProvider>
  </React.StrictMode>
)
