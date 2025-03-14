
import { createRoot } from 'react-dom/client'
import './index.css'

import ModalProvider from './app/context/ModalProvider.jsx'
import MainRoutes from './app/routes/MainRoutes.jsx'





createRoot(document.getElementById('root')).render(



  <ModalProvider>
    <MainRoutes />
  </ModalProvider>


)
