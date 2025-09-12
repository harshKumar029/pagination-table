import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
  import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme
   import 'primereact/resources/primereact.min.css';          // core styles
   import 'primeicons/primeicons.css';                        // icons

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
