import { useOutletContext, useLoaderData } from "react-router-dom";
// import axios from "axios";

const HomePage = ({  }) => {

  const { user } = useOutletContext(useLoaderData());
  console.log(user)

  return(
      <>
        <h1>HomePage</h1>
        {user ? (
          <h2>Welcome {user}</h2>
          ) : ( <h2>Please Log In</h2> )
        }
      </>
  )
}

export default HomePage;