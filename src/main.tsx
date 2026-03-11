import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ModalState from './context/ModalContext.tsx'
import ThemeState from './context/ThemeContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <ThemeState>
      <ModalState>
        <App />
      </ModalState>
    </ThemeState>
  </StrictMode>,
)
