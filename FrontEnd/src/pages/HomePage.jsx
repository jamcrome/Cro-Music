import React from "react";
import { useUser } from "../UserContext";

const HomePage = () => {

  const { user } = useUser();

  return(
      <>
        <h1>HomePage</h1>
        {user ? ( 
          <h2>Welcome {user.username}</h2> 
          ) : ( null )
        }
      </>
  )
}

export default HomePage;