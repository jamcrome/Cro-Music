import { useOutletContext, useLoaderData, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getComposer } from "../ComposerUtils";
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from "react-router-dom";
// import { loginWithSpotify } from "../utilities";
import SpotifyProfileDisplay from "../components/SpotifyProfileDisplay";

const AccountPage = () => {

  const { user } = useOutletContext(useLoaderData());
  const [favComposersDetails, setFavComposersDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavComposerData = async (composer_ids) => {
    setIsLoading(true);
    try{ 
      const composers = await Promise.all(
        composer_ids.map(async (composer) => {
          const data = await getComposer(composer.composer_id);
          return data
        })
      )
      setFavComposersDetails(composers)
    } catch (error) {
      console.error("Error fetching composer data", error);
    } finally {
      setIsLoading(false); 
    }
  }

  const handleSpotifyLogin = () => {
    let email = user.email
    window.location.href = `http://localhost:8000/api/v1/spotify/login?user=${email}`
    // const response = loginWithSpotify(user);
    // if (response === 200) {
    // }
  };

  // const getSpotifyProfile = async () => {
  //   const spotify_access_token = localStorage.getItem('spotify_access_token')
  //   const response = await fetch('https://api.spotify.com/v1/me', {
  //     headers: {
  //       Authorization: 'Bearer ' + spotify_access_token
  //     }
  //   });
  //   const data = response.json()
  //   console.log(data)
  //   return data
  // }

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
  }, [location, navigate]);

  useEffect(()=>{
    const loadData = async () => {
      await fetchFavComposerData(user.fav_composer_list);
    }
    loadData()
    console.log(favComposersDetails)
  }, [])

  // let pdfUrl = 'http://localhost:8000/media/bach-gminor-sonata.pdf';

  return(
      <>
        <h1>{user.email}'s Account</h1>
        <h2>Welcome {user.email}</h2>
        {/* <PdfViewer pdfUrl={pdfUrl}/> */}
        <div>
        {favComposersDetails.length > 0 ? (
          <div>
            <h3>Favorite Composers:</h3>
            <ul>
              {favComposersDetails.map((composer, index) => (
                <li key={index}>
                  <p>{composer.composer.complete_name}</p>
                  {/* {composer ? composer.name : "No Name Available"} */}
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <p>loading</p>
          )}
        </div>
        <div>
          {localStorage.getItem('spotify_access_token') ? (
            <div>
              <SpotifyProfileDisplay/>
            </div>
          ) : (<Button onClick={handleSpotifyLogin}>Spotify Login</Button>)}
        </div>
      </>
  )
}

export default AccountPage;