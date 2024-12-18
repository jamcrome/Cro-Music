import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { UserProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <UserProvider>
    <RouterProvider router={router}/>

  // </UserProvider>
)
