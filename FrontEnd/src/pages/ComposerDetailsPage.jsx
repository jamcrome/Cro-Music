import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";
import { getComposer } from "../ComposerUtils";
import Button from "react-bootstrap/esm/Button";
import { addFavComposer, removeFavComposer } from "../ComposerUtils";

function ComposerDetails() {

  const { user, setUser } = useOutletContext();

  const [composer, setComposer] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams();
  console.log(id)
  console.log(composer)
  
  const fetchComposer = async () => {
    const composerData = await getComposer(id);
    setComposer(composerData)
  };
  
  const checkIfFavorite = (composerId) => {
    
    const normalizedComposerId = Number(composerId); // Normalize to number
    const found = user.fav_composer_list.find(fav => Number(fav.composer_id) === normalizedComposerId);
    console.log("Found:", found);
    
    if (found === undefined) {
      console.log("not in favorites")
      setIsFavorite(false)
    }
    else {
      console.log("it is in favorites")
      setIsFavorite(true)
    }
    console.log(isFavorite)
    return found ? true : false;  // Return true if found, otherwise false
  };

  const handleAddFavorite = () => {
    updateFavComposerList(id, 'add'); // Pass 'add' to update the favorites list
  };

  const handleRemoveFavorite = () => {
    updateFavComposerList(id, 'remove'); // Pass 'remove' to update the favorites list
  };

  const updateFavComposerList = async (composerId, action) => {
    if (action === 'add') {
      await addFavComposer(composerId); // Add the composer to the backend
      setIsFavorite(true)
    } else if (action === 'remove') {
      await removeFavComposer(composerId); // Remove the composer from the backend
      console.log("here")
      setIsFavorite(false)
    }
  };

  useEffect(() => {
    fetchComposer();
  }, [id])

  useEffect(() => {
    checkIfFavorite(id);
    console.log("favorite run")
  }, [])

  if (!composer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <div className="bg-slate-900 h-screen text-white">
        <div className="flex flex-column p-4">
          <h1>{composer.composer.complete_name}</h1>
          <img src={composer.composer.portrait} className="object-cover h-48 w-48 mt-2 mb-4 rounded-[18px] overflow-hidden"/>
          {isFavorite == true ? (
            <Button onClick={handleRemoveFavorite}>Remove from Favorites</Button>
          ) : (
            <Button onClick={handleAddFavorite}>Add to Favorite</Button>
          )}
        </div>
        <div className="flex flex-column p-4">
          <h3>Popular Works</h3>
          <div className="py-1">
            <li>{composer.works[0].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[1].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[2].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[3].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[4].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[5].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[6].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[7].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[8].title}</li>
          </div>
          <div className="py-1">
            <li>{composer.works[9].title}</li>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComposerDetails;