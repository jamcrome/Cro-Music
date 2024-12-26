import { useEffect, useState } from "react";
import axios from 'axios'
import { useOutletContext, useLoaderData } from "react-router-dom";
import ComposerCard from "../components/ComposerCard";

const HomePage = ({  }) => {

  const { user, setUser } = useOutletContext(useLoaderData());
  console.log(user)

  const [composers, setComposers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  
  const getPopComposers = async() => {
    let response = await axios.get('https://api.openopus.org/composer/list/pop.json')
    setComposers(response.data.composers)
    console.log(response.data.composers)
  }
  
  const checkIfFavorite = (composerId) => {

    const normalizedComposerId = Number(composerId); // Normalize to number
    const found = user.fav_composer_list.find(fav => Number(fav.composer_id) === normalizedComposerId);

    return found ? true : false;  // Return true if found, otherwise false
  };

  useEffect(() => {
    if (user && user.fav_composer_list) {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    getPopComposers()
  }, [])

  if (user && isLoading) {
    return <h2>Loading...</h2>
  }

  return(
      <>
        <div className="bg-slate-950 h-max">
          {user ? (
            <div className="flex flex-column justify-center text-center">
              <h1 className="text-6xl text-center text-white font-bold underline center py-8">Popular Composers</h1>
              <div className="flex justify-center flex-wrap px-6">
              {composers.map((composer, index) => (
                <div key={index}>
                  <ComposerCard
                    key={index}
                    id={composer.id}
                    portrait={composer.portrait}
                    name={composer.complete_name}
                    fav={checkIfFavorite(composer.id)}
                  />
                </div>
              ))}
              </div>
            </div>
            ) : ( 
            <div className="bg-slate-950 h-screen">
              <h2 className="text-white p-4">Please Log In</h2>
            </div>
            )
          } 
        </div>
      </>
  )
}

export default HomePage;