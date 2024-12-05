import './App.css'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import axios from 'axios';
import { UserProvider } from './UserContext';

function App() {

  // const testConnection = async() => {
  //   let response = await axios.get("http://127.0.0.1:8000/")
  //   if (!response.data.connected){
  //     console.log("not communicating with server")
  //   }
  //   else{
  //     console.log("communication established with server")
  //   }
  // }

  // useEffect(()=>{
  //   testConnection()
  // }, [])

  // const [user, setUser] = useState(useLoaderData());

  return (
    // <>
      <UserProvider>
        <NavBar/>
        <h1>Cro-Music</h1>
        <Outlet />
      </UserProvider>
    // </>
  )
}

export default App
