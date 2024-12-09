import React from 'react';
import './App.css'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import axios from 'axios';
import { getInfo } from './utilities';

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

  const [user, setUser] = useState(useLoaderData());

  // useEffect(()=> {
  //   // someFunction() getInfo maybe from utilities.jsx
  //   // setUser()

  // }, [user])

  return (
    <>
      <NavBar user={user}/>
      <h1>Cro-Music</h1>
      
      <Outlet context={{ user, setUser }}/>
    </>
  )
}

export default App
