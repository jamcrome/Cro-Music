import axios from "axios"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import ComposerCard from "../components/ComposerCard"


const SearchResultsPage = () => {

  const { strg } = useParams()
  const { user, setUser} = useOutletContext()
  const [searchResults, setSearchResults] = useState([])

  const getSearchResults = async () => {
    const response = await axios.get(`https://api.openopus.org/composer/list/search/${strg}.json`)
    setSearchResults(response.data.composers)
  }

  const checkIfFavorite = (composerId) => {
    
    const normalizedComposerId = Number(composerId); // Normalize to number
    const found = user.fav_composer_list.find(fav => Number(fav.composer_id) === normalizedComposerId);

    return found ? true : false;  // Return true if found, otherwise false
  };

  useEffect(() => {
    getSearchResults();
  }, [strg])

  return (
    <>
      <div className="bg-slate-950 h-full">
        <h1 className="text-white p-4">Search Results:</h1>
        <div className="flex flex-wrap justify-center text-center">
          {searchResults.map((composer, index) => (
            <div className="flex ">
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
      
      
    </>
  )
}

export default SearchResultsPage