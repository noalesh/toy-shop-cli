import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // important! first thing starting  vite project - delete this!
  //<StrictMode>
    <App />
 // </StrictMode>,
)
