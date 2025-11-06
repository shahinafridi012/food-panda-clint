import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProviders from './providers/AuthProviders.jsx';

createRoot(document.getElementById('root')).render(
<div className=''>
    <StrictMode>
   <AuthProviders>
    <RouterProvider router={router} />
   </AuthProviders>
  </StrictMode>,
  <ToastContainer />
</div>
)
