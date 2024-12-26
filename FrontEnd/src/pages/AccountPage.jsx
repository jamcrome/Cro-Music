import { useOutletContext, useLoaderData, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getComposer, removeFavComposer } from "../ComposerUtils";
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from "react-router-dom";
import ComposerCard from "../components/ComposerCard";
import SpotifyProfileDisplay from "../components/SpotifyProfileDisplay";
import FileUpload from "../components/FileUpload";

const AccountPage = () => {

  const { user } = useOutletContext(useLoaderData());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkIfFavorite = (composerId) => {

    const normalizedComposerId = Number(composerId); // Normalize to number
    // Use find to search for the composer_id in the favorites list
    const found = user.fav_composer_list.find(fav => Number(fav.composer_id) === normalizedComposerId);
    // console.log("Found:", found);  // Log the found composer (or undefined)
    return found ? true : false;  // Return true if found, otherwise false
  };

  const handleSpotifyLogin = () => {
    // let email = user.email
    window.location.href = `http://localhost:8000/api/v1/spotify/login/`
  };

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      const queryParams = new URLSearchParams(location.search);
      const accessToken = queryParams.get('access_token'); // Capture token from URL

      if (accessToken) {
        // Save the access token to localStorage
        localStorage.setItem('spotify_access_token', accessToken);
        // Optionally handle token expiration or refresh logic here
        console.log('Spotify access token saved to localStorage:', accessToken);
        // Redirect the user to their account page (if needed)
        navigate('/account');
      } else {
        // Handle error if token is not found in the URL
        console.error('No access token in the URL');
      }
    };
    fetchSpotifyToken();
  }, []);

  useEffect(() => {
    if (user && user.fav_composer_list) {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return(
    <>
      <div className="bg-slate-950 text-white p-4">
        <div className="flex place-content-between">
          <div className="">
            <h1 className="">Welcome, {user.first_name}!</h1>
          </div>
          <div className="">
            {localStorage.getItem('spotify_access_token') ? (
              <div>
                <SpotifyProfileDisplay/>
              </div>
            ) : (<Button onClick={handleSpotifyLogin}>Spotify Login</Button>)}
          </div>
        </div>
        <div>
        <h3>Favorite Composers:</h3>
        {user.fav_composer_list.length > 0 ? (
          <div >
            <div className="flex flex-wrap justify-center">
              {user.fav_composer_list.map((composer, index) => (
                <ComposerCard
                  key={index}
                  id={composer.composer_id}
                  portrait={composer.portrait_url}
                  name={composer.name}
                  fav={checkIfFavorite(composer.composer_id)}
                />
              ))}
            </div>
          </div>
          ) : (
            <p>No Favorites</p>
          )}
        </div>
        <div className = "app-container">
          <FileUpload />
        </div>
      </div>
    </>
  )
}

export default AccountPage;