import { useEffect, useState } from "react";
import axios from 'axios'
import { useOutletContext, useLoaderData } from "react-router-dom";
import HomeComposerCard from "../components/HomeComposerCard";

const HomePage = ({  }) => {

  const { user } = useOutletContext(useLoaderData());
  console.log(user)

  const [composers, setComposers] = useState([])

  const getPopComposers = async() => {
    let response = await axios.get('https://api.openopus.org/composer/list/pop.json')
    setComposers(response.data.composers)
    console.log(response.data.composers)
  }

  useEffect(() => {
    getPopComposers()
  }, [])


  
  return(
      <>
        <h1>HomePage</h1>
        {user ? (
          <div>
            <h2>Welcome {user.first_name}</h2>
            <h1>Popular Composers</h1>
            <div>
              {composers.map((composer) =>(
                <HomeComposerCard
                  key={composer.id}
                  ind={composer}
                />
              ))}
            </div>
          </div>
          ) : ( <h2>Please Log In</h2> )
        }
      </>
  )
}

export default HomePage;