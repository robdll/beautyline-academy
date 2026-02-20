import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </StrictMode>,
)
