import React, { useState, useEffect } from 'react';

function SpotifyProfileDisplay() {
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const getSpotifyProfile = async () => {
    const spotify_access_token = localStorage.getItem('spotify_access_token')
    
    if (!spotify_access_token) {
      setError("No access token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + spotify_access_token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data); // Set the profile data in state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the request is finished
    }
  };
    
    useEffect(() => {
      getSpotifyProfile(); // Call the function to fetch the profile data
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }  

  return (
    <>
      <div >
      {profile ? (
        <div className='flex'>
          <div>
            <h3>Spotify Profile</h3>
            <p><strong>Name:</strong> {profile.display_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
          <div>
            <img src={profile.images[0]?.url} alt="Profile" width="100" />
          </div>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
      </div>
    </>
  )
}

export default SpotifyProfileDisplay