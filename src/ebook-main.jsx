import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import EbookApp from './EbookApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EbookApp />
  </StrictMode>
)
