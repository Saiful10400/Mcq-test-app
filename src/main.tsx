import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './Routes'
import AppContext from './contextApi/AppContext'
 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
   <RouterProvider router={routes}/>
   </AppContext>
  </StrictMode>,
)
